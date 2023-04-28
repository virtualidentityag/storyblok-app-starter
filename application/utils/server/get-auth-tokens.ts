import { urlEncode } from './url-encode'
import { IAuthRequestBody, IToken } from '~/types'

export const getAuthTokens = async (requestBody: IAuthRequestBody, url = 'https://app.storyblok.com/oauth/token'): Promise<IToken> => {
  const response = await fetch(
    url,
    {
      method: 'POST',
      headers: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      body: urlEncode(requestBody)
    }
  )

  if (!response.ok) {
    throw new Error('Failed to get token from grant code or refresh token')
  }

  return await response.json()
}
