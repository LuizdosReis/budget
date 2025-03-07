const colors = require('tailwindcss/colors');

module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      colors: {
        primary: colors.blue,
        secondary: colors.green,
        danger: colors.red,
      },
    },
  },
  plugins: [],
};
