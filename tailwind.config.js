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
      },
    },
  },
  plugins: [],
};

// npx tailwindcss -i ./src/input.css -o ./src/output.css --watch
