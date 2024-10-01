/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './assets/**/*.css',
    './components/*.{vue,js}',
    './components/**/*.{vue,js}',
    './pages/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './*.{vue,js,ts}',
    './nuxt.config.{js,ts}',
  ],
  theme: {
    // // source https://coolors.co/f8f2f3-e2dcde-ceb1be-b97375-2d2d34
    // https://www.realtimecolors.com/?colors=323232-F8F8F8-E8CCEB-F2C9B2-B5E0C3&fonts=Inter-Inter
    // new colors
    extend: {
      colors: {
        tt: '#050315',
        bg: '#F8F8F8',
        nn_primary: '#E8CCEB', // primary
        nn_secondary: '#F2C9B2', // secondary
        nn_accent: '#B5E0C3', // accent
      },
      fontFamily: {
        sans: ['Graphik', 'sans-serif'],
        serif: ['Merriweather', 'serif'],
      },
    },
  },
  plugins: [],
}
