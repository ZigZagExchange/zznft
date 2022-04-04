const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./environment/**/*.{jsx,tsx}",
    "./playroom/**/*.{jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        zz: {
          50: "#22F7E1",
          100: "#06C8EB",
          150: "#09A7F6"
        },
        metamask: {
          50: "#F6851B",
          100: "#B96319",
          150: "#773E16"
        },
        coinbase: {
          50: "#2860F3",
          100: "#1D46B2",
          150: "#112C71"
        },
        walletConnect: {
          50: "#2A84FC",
          100: "#1A61BE",
          150: "#093C80"
        }
      }
    },
  },
  variants: {
    extend: {
      backgroundColor: ['responsive', 'disabled']
    }
  },
  plugins: [],
}
