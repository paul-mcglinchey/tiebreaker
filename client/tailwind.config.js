module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        purple: {
          brand: '#7025ffff'
        }
      }
    },
    fontFamily: {
      'sans': ['Intel Var', 'system-ui', '-apple-system', 'Segoe UI', 'Helvetica', 'Arial', 'sans-serif'],
    },
    maxWidth: {
      '2/3': '66.67%',
      '1/3': '33.33%',
      '1/5': '20%',
      '3/10': '30%',
      '7/10': '70%',
      'login': '24rem'
    }
  },
  variants: {
    extend: {
      rotate: ['group-hover'],
      animation: ['hover']
    },
  },
  plugins: [],
}
