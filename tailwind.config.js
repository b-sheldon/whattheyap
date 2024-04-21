/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,jsx}'],
  theme: {
    fontFamily: {
      sans: ['Itim', 'sans-serif'],
    },
    extend: {
      colors: {
        'purpledark': '#C0A9FF',
        'purplelight': '#EBE6F9',
        'color1': '#FFDBC3',
        'color2': '#9F91CC',
        'color3': '#5C4B99',
        'color4': '#3D246C',
      },
    },
  },
  plugins: [],
};

// npx tailwindcss -i ./src/input.css -o ./src/output.css --watch
