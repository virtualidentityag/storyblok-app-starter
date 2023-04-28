import grant, { GrantConfig } from 'grant'
import { H3Event } from 'h3'
import { IServerConfig } from '~/types'
import { factoryGrantConfig } from '~/utils/server/factory-grant-config'

export interface IServerMiddlewareOptions {
  id: string
  secret: string
  redirectUri: string
}

export default defineEventHandler(async (event: H3Event) => {
  const { id, secret, redirectUri } = useRuntimeConfig() as IServerConfig

  if (!id || !secret || !redirectUri) {
    throw new Error('CLIENT_ID, CLIENT_SECRET, CLIENT_REDIRECT_URI are required in .env')
  }

  const isAuthPath = event.node.req.url?.includes('/connect/storyblok')

  if (isAuthPath) {
    const grantConfig = factoryGrantConfig({ id, secret, redirectUri }) as GrantConfig
    const sessionId = grantConfig.storyblok?.custom_params.state
    await grant.node(grantConfig)(event.node.req, event.node.res, sessionId)
  }
})
