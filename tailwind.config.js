module.exports = {
  mode: 'jit',
  content: ['./app/**/*.{js,ts,jsx,tsx}', './src/**/*.{js,ts,jsx,tsx}'], // remove unused styles in production
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    extend: {
      backgroundColor:{
        'home-bg': '#3760a7',
        'about-bg': '#858585',
        'projects-bg': '#870000',
      },
      fontFamily:{
        'pixelify':['Pixelify Sans', 'sans-serif'],
      },
      backgroundImage:{
        'contact-bg': "linear-gradient(#aaaaee 0%, #aaaaee 40%, #ff8566 50%, #ffe4b3 80%)",
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
