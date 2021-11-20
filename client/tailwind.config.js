module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      'sans': ['Intel Var', 'system-ui', '-apple-system', 'Segoe UI', 'Helvetica', 'Arial', 'sans-serif'],
    },
    maxWidth: {
      '2/3': '66.67%',
      '1/3': '33.33%',
    },
    extend: {
      backgroundImage: {
        'wind-turbines': "url('https://res.cloudinary.com/pmcglinchey/image/upload/v1620280344/wp2100354-wind-energy-wallpapers_vsummw.jpg')",
      }
    },
  },
  variants: {
    extend: {
      rotate: ['group-hover'],
      animation: ['hover']
    },
  },
  plugins: [],
}
