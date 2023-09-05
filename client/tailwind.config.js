/** @type {import('tailwindcss').Config} */

import defaultTheme from 'tailwindcss/defaultTheme'

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['Keenya Coffee Rg', ...defaultTheme.fontFamily.serif],
        popins: ['Poppins', ...defaultTheme.fontFamily.serif],
        Roboto: ['Roboto', ...defaultTheme.fontFamily.sans],
     },
    },
  },
  plugins: [],
};