/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");

const Myclass = plugin(function ({ addUtilities }) {
  addUtilities({
    ".my-rotate-y-180": {
      transform: "rotateY(180deg)",
    },
    ".preserve-3d": {
      transformStyle: "preserve-3d",
    },
    ".perspective": {
      perspective: "1000px"
    },
    ".backface-hidden": {
      backfaceVisibility: "hidden"
    }
  });
});
module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false,
  content: [],
  theme: {
    extend: {
      animation: {
        "animate-pulse": "pulse 1.5s cubic-bezier(0.2, 0.1, 0.9, 1) infinite",
      },
      keyframes: {
        "animate-pulse": {
          "0%, 100%": {
            opacity: 1,
          },
          "50%": {
            opacity: 0.3,
          },
        },
      },
      gridTemplateColumns: {
        '13': 'repeat(13, minmax(0, 1fr))',
        '14': 'repeat(14, minmax(0, 1fr))',
      }
    },
  },
  plugins: [Myclass],
};
