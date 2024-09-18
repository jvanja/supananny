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
    './nuxt.config.{js,ts}'
  ],
  theme: {
    // this will delete all the default tailwind colors to limit the intelisense
    // or you can add the to the existing once using theme.extend.colors below
    // colors: {
    // // source https://coolors.co/f8f2f3-e2dcde-ceb1be-b97375-2d2d34
    // // rename these
    // Snow: '#f8f2f3', // primary 60% usage
    // Platinum: '#e2dcde',
    // Thistle: '#ceb1be',
    // 'Old rose': '#b97375', // brand color 30%
    // 'Raisin black': '#2d2d34' // CTA 10%
    // },
    extend: {
      colors: {
        'primary-500': '#4f46e6',
        'primary-400': '#4338ca',
        // source https://coolors.co/f8f2f3-e2dcde-ceb1be-b97375-2d2d34
        // rename these
        Snow: '#f8f2f3', // primary 60% usage
        Platinum: '#e2dcde',
        Thistle: '#ceb1be',
        'Old rose': '#b97375', // brand color 30%
        'Raisin black': '#2d2d34' // CTA 10%
      },
      fontFamily: {
        sans: ['Graphik', 'sans-serif'],
        serif: ['Merriweather', 'serif']
      }
    }
  },
  plugins: []
}
