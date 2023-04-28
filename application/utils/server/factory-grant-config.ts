import { randomUUID, createHash } from 'crypto'
import { GrantConfig } from 'grant'
import { IServerMiddlewareOptions } from '~/server/middleware/auth'

const sha256 = (data: string): string => {
  const hash = createHash('sha256')
  hash.update(data)
  return hash.digest('hex')
}

interface StoryblokGrantConfig extends GrantConfig {
  storyblok: {
    key: string
    secret: string
    redirect_uri: string
    callback: string
    authorize_url: string
    access_url: string
    oauth: number
    scope: string
    custom_params: {
      code_chalenge: string
      code_chalenge_method: string
      state: string
    }
  }
}

export const factoryGrantConfig = (options: IServerMiddlewareOptions): StoryblokGrantConfig => {
  const codeIdentifier = randomUUID()

  return {
    defaults: {
      origin: 'http://localhost:3000',
      transport: 'session'
    },
    storyblok: {
      key: options.id,
      secret: options.secret,
      redirect_uri: options.redirectUri,
      callback: '/callback',
      authorize_url: 'https://app.storyblok.com/oauth/authorize',
      access_url: 'https://app.storyblok.com/oauth/token',
      oauth: 2,
      scope: 'read_content write_content',
      custom_params: {
        code_chalenge: sha256(codeIdentifier),
        code_chalenge_method: 'S256',
        state: codeIdentifier
      }
    },
    // Session must also be passed, even though the types clash with it
    session: {
      name: 'storyblokauth',
      secret: 'grant',
      cookie: { sameSite: 'lax', secure: false },
      resave: false,
      saveUninitialized: true
    }
  } as any
}
