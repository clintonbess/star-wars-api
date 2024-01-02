const path = require('path')
const NodemonPlugin = require('nodemon-webpack-plugin')

const serverConfig = {
  entry: './src/server.js',
  mode: 'development',
  target: 'node',
  node: {
    __dirname: true,
    __filename: false,
  },
  stats: 'errors-only',
  output: {
    path: path.join(__dirname, 'dist'),
  },
  plugins: [new NodemonPlugin()],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
}

module.exports = serverConfig
