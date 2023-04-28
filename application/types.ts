import { RuntimeConfig } from 'nuxt/schema'

export interface IServerConfig extends RuntimeConfig {
  id: string
  secret: string
  redirectUri: string
}

export type IAuthRequestBody = {
  grant_type: 'authorization_code',
  code: string | null,
  client_id: string,
  client_secret: string,
  redirect_uri: string,
} | {
  grant_type: 'refresh_token',
  refresh_token: string,
  client_id: string,
  client_secret: string,
  redirect_uri: string,
}

export interface IToken {
  access_token: string
  // Refresh token is only returned on the first time the user logs in
  refresh_token?: string
  token_type: 'bearer',
  // Expire time in seconds
  expires_in: number
}
