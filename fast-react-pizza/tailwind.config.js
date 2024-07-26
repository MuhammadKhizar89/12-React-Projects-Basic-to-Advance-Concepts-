/** @type {import('tailwindcss').Config} */
//eslint-disable-next-line
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      sans: ['Roboto Mono', 'monospace'],
    },
    
    extend: {
      // colors:{
      //   'stone-200': '#F5F5F5',
      // }
    },
  },
  plugins: [],
}