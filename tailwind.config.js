/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      screens:{
        'sm': '540px',
        'md': {max:'768px'},
        'lg': {min:'768px'},
      }
    },
  },
  plugins: [],
}

