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
    module: {
      rules: [
        {
          test: /\.(ts|tsx)$/,
          exclude: /node_modules/,
          use: {
            loader: require.resolve('babel-loader'),
            options: {
              presets: [
                require.resolve('@babel/preset-env'),
                require.resolve('@babel/preset-react'),
                require.resolve('@babel/preset-typescript')
              ],
              plugins: [
                require.resolve('@babel/plugin-proposal-class-properties')
              ]
            }
          }
        },
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: require.resolve('babel-loader'),
            options: {
              presets: [
                require.resolve('@babel/preset-env'),
                require.resolve('@babel/preset-react')
              ],
              plugins: [
                require.resolve('@babel/plugin-proposal-class-properties')
              ]
            }
          }
        },
        {
          test: /\.css$/,
          exclude: /node_modules/,
          use: ["style-loader", "css-loader"],
        },
      ],
    }
    // Custom webpack config goes here...
  }),
  iframeSandbox: 'allow-scripts',
  typeScriptFiles: ['./components/**/*.{ts,tsx}', '!**/node_modules'],
};







