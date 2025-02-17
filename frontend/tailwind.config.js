/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        customPink: '#f1dbd8',
        loginShade: '#4f233a',
        formShade: '#f9e8f9',
        dashGreen: '#ebddfc'
      },
    },
  },
  plugins: [],
}