/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin')
module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false,
  content: [],
  theme: {
    extend: {
      animation: {
        'animate-pulse': 'pulse 1.5s cubic-bezier(0.2, 0.1, 0.9, 1) infinite'
      },
      keyframes: {
        'animate-pulse': {
          '0%, 100%': {
            opacity: 1
          },
          '50%': {
            opacity: .3
          }
        }
      }
    },
  },
  plugins: [
  ],
}
