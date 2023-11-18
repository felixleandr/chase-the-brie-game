/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'regal-blue': '#143E54',
      },
      gridTemplateColumns: {
        gridmap: "repeat(52, 0fr)",
      },
    },
    fontFamily: {
      'Rubik' : ['"Rubik Mono One"', 'monospace'],
      'Poppins': ['Poppins', 'sans-serif']
    }
  },
  plugins: [],
}

