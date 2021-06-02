const fs = require('fs')
const path = require('path')
const glob = require('glob')

const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const ProgressPlugin = require('progress-webpack-plugin')

const { entries, htmlTemplates } = require('./utils/loadFies')

module.exports = {
  mode: 'development',
  // entry: getFiles(path.resolve(__dirname, 'src/**/*.{js,ts,jsx,tsx}')),
  entry: entries,
  watch: true,
  watchOptions: {
    //默认为空，不监听的文件或者文件夹，支持正册匹配
    ignored: ['/node_modules/', 'dist'],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/dist/',
    filename: 'js/[name].js',
    chunkFilename: '[name].js',
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
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
        options: {
          // disable type checker - we will use it in fork plugin
          transpileOnly: true,
        },
      },
      {
        test: /\.(jpg|jpeg|png|gif)$/,
        use: {
          loader: 'url-loader',
          options: {
            name: '[name]_[hash].[ext]',
            // 图片打包到dist下的images
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
    new ProgressPlugin(),
    new ForkTsCheckerWebpackPlugin(),
    ...htmlTemplates,
    new CleanWebpackPlugin(),
  ],
  resolve: {
    extensions: ['.ts', '.js', '.tsx', '.jsx'],
    mainFiles: ['index', 'main'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    open: true,
    port: 8080,
    progress: true, // 显示打包的进度条
    hot: true, //开启Hot Module Replacement的功能},
    compress: true, // 启动 gzip 压缩
  },
  // externals: {
  //   THREE: 'THREE',
  // },
}
