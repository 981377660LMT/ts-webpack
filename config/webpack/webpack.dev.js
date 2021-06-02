const { merge } = require('webpack-merge')
const webpack = require('webpack')
const webpackCommonConfig = require('./webpack.common')
const { distPath } = require('./getPath')

module.exports = merge(webpackCommonConfig, {
  mode: 'development',
  watch: true,
  watchOptions: {
    ignored: ['/node_modules'],
  },
  output: {
    path: distPath,
    publicPath: '/dist/',
    filename: 'js/[name].js',
    chunkFilename: 'js/[name].js',
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
            },
          },
          'sass-loader',
          'postcss-loader',
        ],
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
            },
          },
          'postcss-loader',
        ],
      },
      {
        test: /\.(jpg|jpeg|png|gif|eot|woff2|woff|ttf|svg)$/,
        loader: 'file-loader',
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      ENV: JSON.stringify('development'),
    }),
  ],
  devtool: 'inline-source-map',
})
