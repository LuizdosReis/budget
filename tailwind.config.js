const colors = require('tailwindcss/colors');

module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      fontSize: {
        xxs: ['0.625rem', { lineHeight: '0.875rem' }],
      },
      colors: {
        primary: colors.indigo,
        secondary: colors.slate,
        surface: '#F5F6FA',
        brand: {
          dark: '#1A1D2E',
          muted: '#6B7090',
          border: '#E4E6EF',
        },
        success: colors.emerald,
        danger: colors.rose,
        warning: colors.amber,
        info: colors.sky,
      },
    },
  },
  plugins: [],
};
