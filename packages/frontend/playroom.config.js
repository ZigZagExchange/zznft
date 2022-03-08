const path = require("path");
// const {VanillaExtractPlugin} = require("@vanilla-extract/webpack-plugin");
// const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  components: './components/index.ts',
  outputPath: './dist/playroom',

  // Optional:
  title: 'My Awesome Library',
  // themes: './src/themes',
  // snippets: './playroom/snippets.js',
  frameComponent: './playroom/frame.jsx',
  // scope: './playroom/useScope.js',
  widths: [320, 768, 1024],
  port: 9000,
  openBrowser: true,
  paramType: 'search', // default is 'hash'
  // exampleCode: `
  //   <Button>
  //     Hello World!
  //   </Button>
  // `,
  baseUrl: '/playroom/',
  webpackConfig: () => ({
    // Custom webpack config goes here...
  }),
  iframeSandbox: 'allow-scripts',
  typeScriptFiles: ['./components/**/*.{ts,tsx}', '!**/node_modules'],
};







