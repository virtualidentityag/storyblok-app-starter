type Credentials = {
  accessToken: string
  refreshToken: string
  spaceId: string
}

type StoryblokUser = {
  user: {
    id: number;
    friendly_name: string;
  }
  space: {
    id: number;
    name: string
  };
  roles: Record<'name', 'admin' | 'editor'>[];
};

export class StoryblokService {
  private credentials: Credentials

  constructor () {
    const search = new URL(window.location.href).searchParams
    const [accessToken, refreshToken, spaceId] = [
      search.get('access_token'),
      search.get('refresh_token'),
      search.get('space_id')
    ]
      .map(param => decodeURIComponent(param || ''))

    if (!accessToken || !refreshToken || !spaceId) {
      throw new Error(`
        Application could not retrieve Storyblok credentials.
        Do not access the app directly.
        Visit https://domain.com/connect/storyblok to authenticate and be redirected with credentials.
      `)
    }

    this.credentials = { accessToken, refreshToken, spaceId }
  }

  public async getUserInfo (): Promise<StoryblokUser> {
    try {
      const user = await this.fetchWithRefresh('https://api.storyblok.com/oauth/user_info')
      return user as StoryblokUser
    } catch (error: any) {
      throw new Error(error.message || 'Could not retrieve user info')
    }
  }

  private async fetchWithRefresh <T> (url: string, options: RequestInit = {}): Promise<T> {
    const buildOptions = (): RequestInit => ({
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${this.credentials.accessToken}`
      }
    })

    try {
      const response = await fetch(url, buildOptions()).then(res => res.json())

      if (response.status === 401) {
        await this.refreshToken()
        return this.fetchWithRefresh(url, buildOptions())
      }
      return response as T
    } catch (error: any) {
      throw new Error(error.message || 'Failed to refresh token')
    }
  }

  private async refreshToken (): Promise<void> {
    const response = await fetch('/auth/refresh', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ refreshToken: this.credentials.refreshToken })
    })

    if (!response.ok) {
      // eslint-disable-next-line no-console
      console.log('Failed to refresh session, redirecting to login')
      // Do not remove this redirect. It prevents the application from entering an infinite loop.
      window.location.href = '/connect/storyblok'
      return
    }

    const { access_token: refreshedAccessToken } = await response.json()

    this.credentials = { ...this.credentials, accessToken: refreshedAccessToken }
  }
}
