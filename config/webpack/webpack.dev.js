const { merge } = require('webpack-merge')
const webpack = require('webpack')

const webpackCommonConfig = require('./webpack.common')
const { distPath } = require('./getPath')

module.exports = merge(webpackCommonConfig, {
  mode: 'development',
  watch: true,
  watchOptions: {
    //默认为空，不监听的文件或者文件夹，支持正册匹配
    ignored: ['/node_modules/', 'dist'],
  },
  output: {
    path: distPath,
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
        test: /\.(jpg|jpeg|png|gif|eot|woff2|woff|ttf|svg)$/,
        loader: 'file-loader',
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      // window.ENV = 'production'
      ENV: JSON.stringify('development'),
    }),
  ],
  devtool: 'inline-source-map',
  devServer: {
    contentBase: distPath,
    open: true,
    port: 8080,
    progress: true, // 显示打包的进度条
    // hot: true, //开启Hot Module Replacement的功能},
    compress: true, // 启动 gzip 压缩
  },
})
