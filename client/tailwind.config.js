const colors = require('tailwindcss/colors');

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gray: colors.zinc,
        red: colors.rose,
        green: colors.emerald,
        blue: colors.sky,
        amber: colors.amber
      },
      minHeight: {
        '96': '40rem'
      },
      width: {
        '120': '120%'
      },
      minWidth: {
        '40': '10rem',
        '60': '15rem'
      },
      scale: {
        '100-1/2': '1.005',
        '101': '1.01',
        '102': '1.02',
      },
      animation: {
        'spin-slow': 'spin 2s linear infinite'
      },
      transitionProperty: {
        'fill': 'fill'
      }
    },
    maxWidth: {
      '2/3': '66.67%',
      '1/3': '33.33%',
      '1/5': '20%',
      '3/10': '30%',
      '7/10': '70%',
      '4/10': '40%',
      '1/2': '50%',
      '6/10': '60%',
      'login': '24rem'
    }
  },
  variants: {
    extend: {
      rotate: ['group-hover'],
      animation: ['hover'],
      fill: ['hover']
    },
  },
  plugins: [],
}
