/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    screens:{
      'sm': '320px',
      'md': '768px',
      'lg':'1024px',
    },
    extend: {
      fontFamily: {
        josefin: "'Josefin Sans', sans-serif",
      }
    },
  },
  plugins: [],
}
