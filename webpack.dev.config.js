// import { resolve } from 'path'
const { resolve } = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCSSExtractPlugin =require('mini-css-extract-plugin');

require('dotenv').config()
const serverPort = process.env.PORT || 8080
const clientPort = process.env.CLIENTPORT || 8087

const config = {
  entry: './client/main.js',
  mode: 'development',
  output: {
    filename: 'js/[name].bundle.js',
    path: resolve(__dirname, 'dist'),
    publicPath: '/'
  },
  devServer: {
    hot: true,
    liveReload: false,
    watchContentBase: true,
    open: true,
    contentBase: resolve(__dirname, 'dist'),
    host: 'localhost',
    port: `${clientPort}`,
    index: 'index.html',
    proxy: [
      {
        context: ['/auth', '/api'],
        target: `http://localhost:${serverPort}`
      }
    ],
    overlay: {
      warnings: false,
      errors: true
    }
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.(js|jsx)$/,
        loader: 'eslint-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(css|scss)$/,
        use: [
          {
            loader: MiniCSSExtractPlugin.loader,
            options: {
              publicPath: '../'
            }
          },
          'css-loader',
          'sass-loader'
        ],
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new MiniCSSExtractPlugin({
      filename: 'css/[name].css'
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: `${__dirname}/client/index.html`,
          to: 'index.html'
        }
      ]
    })
  ]
}

module.exports = config