import { H3Event } from 'h3'
import { IAuthRequestBody, IServerConfig } from '~/types'
import { getAuthTokens } from '~/utils/server/get-auth-tokens'

export default defineEventHandler(async (event: H3Event) => {
  try {
    const { refreshToken } = await readBody(event)
    const { id, secret, redirectUri } = useRuntimeConfig() as IServerConfig
    const requestBody: IAuthRequestBody = {
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
      client_id: id,
      client_secret: secret,
      redirect_uri: redirectUri
    }

    return await getAuthTokens(requestBody)
  } catch (error: any) {
    event.node.res.statusCode = 500
    return { message: error.message || 'Internal Server Error' }
  }
})
