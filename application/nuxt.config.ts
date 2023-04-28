// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  typescript: {
    strict: true,
    typeCheck: true
  },
  runtimeConfig: {
    id: process.env.CONFIDENTIAL_CLIENT_ID,
    secret: process.env.CONFIDENTIAL_CLIENT_SECRET,
    redirectUri: process.env.CONFIDENTIAL_CLIENT_REDIRECT_URI
  },
  modules: [
    '@nuxtjs/stylelint-module'
  ],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@/assets/style/shared/_theme.scss" as *;'
        }
      }
    },
    optimizeDeps: {
      exclude: ['fsevents']
    }
  },
  css: [
    '@/assets/style/global/global.css'
  ],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {}
    }
  },
  stylelint: {
    extensions: ['vue', 'css', 'scss'],
    lintOnStart: false,
    lintDirtyModulesOnly: true
  }
})
