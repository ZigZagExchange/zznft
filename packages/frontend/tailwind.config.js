const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        zz: {
          50: "#22F7E1",
          100: "#06C8EB",
          150: "#09A7F6"
        }
      }
    },
  },
  plugins: [],
}
