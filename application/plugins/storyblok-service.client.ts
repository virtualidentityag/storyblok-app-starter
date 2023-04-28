import { StoryblokService } from '~/services/storyblok-service'

export default defineNuxtPlugin(() => {
  const storyblok = new StoryblokService()
  return {
    provide: {
      storyblok
    }
  }
})
