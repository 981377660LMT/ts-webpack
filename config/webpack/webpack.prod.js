const TerserPlugin = require('terser-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const { merge } = require('webpack-merge')
const webpack = require('webpack')

const webpackCommonConfig = require('./webpack.common')
const { distPath } = require('./getPath')

module.exports = merge(webpackCommonConfig, {
  mode: 'production',
  output: {
    path: distPath,
    publicPath: '/dist/',
    filename: 'js/[name].[contenthash:8].js',
    // chunkFilename: '[name].[contentHash:8].js',
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
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
        test: /\.(jpg|jpeg|png|gif)$/,
        use: {
          loader: 'url-loader',
          options: {
            name: '[name]_[hash].[ext]',
            outputPath: '/images/',
            limit: 20480,
          },
        },
      },
      {
        test: /\.(eot|woff2|woff|ttf|svg)$/,
        loader: 'file-loader',
      },
    ],
  },
  plugins: [
    // 抽离 css 文件
    new MiniCssExtractPlugin({
      filename: 'css/main.[contenthash:8].css',
    }),
    new webpack.DefinePlugin({
      ENV: JSON.stringify('production'),
    }),
  ],
  externals: {
    three: 'THREE',
  },
  optimization: {
    // 压缩 css
    minimizer: [new TerserPlugin(), new CssMinimizerPlugin()],
    // 分割代码块
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        // 第三方模块
        vendor: {
          name: 'vendor',
          priority: 1,
          test: /node_modules/,
          minSize: 3 * 1024,
          minChunks: 1,
        },
        // 公共引用的模块
        common: {
          name: 'common',
          priority: 0,
          minSize: 3 * 1024,
          minChunks: 2,
        },
      },
    },
  },
  devtool: 'inline-source-map',
})
