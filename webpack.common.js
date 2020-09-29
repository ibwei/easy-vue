const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')

module.exports = {
  entry: {
    app: './src/index.js'
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'Production',
      template: './src/index.html'
    })
  ],
  output: {
    filename: '[name].bundle.js',
    chunkFilename: '[name].[hash].js',
    path: path.resolve(__dirname, 'dist')
  }
}
