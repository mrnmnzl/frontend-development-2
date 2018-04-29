const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const path = require('path')

const extractSass = new MiniCssExtractPlugin({
  filename: "[name].[contenthash].css",
  disable: process.env.NODE_ENV === "development"
})

module.exports = {
  devtool: 'source-map',
  devServer: {
    contentBase: './dist',
    historyApiFallback: true
  },
  entry: ['whatwg-fetch', './src/main.js'],
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader'
          }
        ]
      },
      {
        test: /\.hbs$/,
        loader: 'handlebars-loader',
        query: {
          inlineRequires: '/images/',
          helperDirs: [path.join(__dirname, 'src', 'views', 'helpers')],
          partialDirs: [path.join(__dirname, 'src', 'views', 'partials')],
        }
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              sourceMap: true
            }
          }, {
            loader: 'postcss-loader',
            options: {
              sourceMap: true
            }
          }, {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      }]
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    extractSass,
    new HtmlWebpackPlugin({
      title: 'Formula 1',
      template: 'src/index.html'
    })
  ]
}
