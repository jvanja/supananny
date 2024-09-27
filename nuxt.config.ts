// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  runtimeConfig: {
    // The private keys which are only available server-side and can be overwritten by .env
    apiSecret: '123',
    // Keys within public are also exposed client-side
    public: {
      apiBase: '/api',
      googleApiKey: process.env.GOOGLE_API_KEY,
    },
  },
  css: ['@/assets/css/main.css'],
  postcss: {
    plugins: {
      'postcss-import': {},
      'tailwindcss/nesting': {},
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  modules: [
    '@nuxtjs/supabase',
    [
      '@pinia/nuxt',
      {
        autoImports: ['defineStore', ['defineStore', 'definePiniaStore']],
      },
    ],
    '@nuxt/image',
    '@nuxt/eslint',
    '@nuxt/ui',
  ],
  supabase: {
    redirect: false,
  },
  imports: {
    dirs: ['stores'],
  },
})
