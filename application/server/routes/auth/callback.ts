import { H3Event } from 'h3'
import { IAuthRequestBody, IServerConfig } from '~/types'
import { getAuthTokens } from '~/utils/server/get-auth-tokens'

export default defineEventHandler(async (event: H3Event) => {
  try {
    const search = new URL(`https://${event.node.req.headers.host}/${event.node.req.url}`).searchParams
    const [code, spaceId] = [search.get('code'), search.get('space_id')]
    const { id, secret, redirectUri } = useRuntimeConfig() as IServerConfig

    const requestBody: IAuthRequestBody = {
      grant_type: 'authorization_code',
      code,
      client_id: id,
      client_secret: secret,
      redirect_uri: redirectUri
    }

    const { access_token: accessToken, refresh_token: refreshToken } = await getAuthTokens(requestBody)
    const [token, refresh, space] = [accessToken, refreshToken, spaceId].map(param => encodeURIComponent(param || ''))

    event.node.res.writeHead(302, { Location: `/?access_token=${token}&refresh_token=${refresh}&space_id=${space}` })
    event.node.res.end()
  } catch (error: any) {
    event.node.res.statusCode = 500
    return { message: error.message || 'Internal Server Error' }
  }
})
