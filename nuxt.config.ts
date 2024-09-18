// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  runtimeConfig: {
    // The private keys which are only available server-side and can be
    // overwritten by .env
    apiSecret: '123',
    // Keys within public are also exposed client-side
    public: {
      apiBase: '/api',
      googleApiKey: process.env.GOOGLE_API_KEY
    }
  },
  css: ['@/assets/css/main.css'],
  postcss: {
    plugins: {
      'postcss-import': {},
      'tailwindcss/nesting': {},
      tailwindcss: {},
      autoprefixer: {}
    }
  },
  modules: ['unplugin-icons/nuxt', '@nuxtjs/tailwindcss', '@nuxtjs/supabase', [
    '@pinia/nuxt',
    {
      autoImports: [
        'defineStore', // import { defineStore } from 'pinia'
        // automatically imports `defineStore` as `definePiniaStore`
        ['defineStore', 'definePiniaStore'], // import { defineStore as definePiniaStore } from 'pinia'
      ],
    },
  ],
  '@nuxt/image'],
  // buildModules: [
  //   ['unplugin-icons/nuxt', {
  //   }],
  // ],
  supabase: {
    redirect: false
    // Options
  },
  // image: {
  //   domains: []
  // },
  imports: {
    dirs: ['stores'],
  }
})
