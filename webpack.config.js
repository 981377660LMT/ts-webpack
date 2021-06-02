const fs = require('fs')
const path = require('path')
const glob = require('glob')

const webpack = require('webpack')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const ProgressPlugin = require('progress-webpack-plugin')

const appDirectory = fs.realpathSync(process.cwd())

// 获取文件公共方法
const getFiles = filesPath => {
  const files = glob.sync(filesPath)
  const obj = {}

  files.forEach(file => {
    const extname = path.extname(file) // 扩展名 eg: .html
    const basename = path.basename(file, extname) // 文件名 eg: index
    obj[basename] = path.resolve(appDirectory, file)
  })

  return obj
}

module.exports = {
  mode: 'development',
  entry: getFiles(path.resolve(__dirname, 'src/**/*.{js,ts,jsx,tsx}')),
  // entry: {
  //   index: 'E:\\test\\ts-webpack\\src\\index.ts',
  // },
  watch: true,
  watchOptions: {
    //默认为空，不监听的文件或者文件夹，支持正册匹配
    ignored: ['/node_modules/', 'dist'],
  },
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/dist/',
    filename: '[name].js',
    chunkFilename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
        options: {
          // disable type checker - we will use it in fork plugin
          transpileOnly: true,
        },
      },
    ],
  },
  plugins: [
    new ProgressPlugin(),
    new ForkTsCheckerWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'index.html'),
      inject: false,
    }),
    new CleanWebpackPlugin(),
    // new webpack.HotModuleReplacementPlugin(),
  ],
  resolve: {
    extensions: ['.ts', '.js', '.tsx', '.jsx'],
  },
  devtool: 'inline-source-map',
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          format: {
            comments: false,
          },
        },
        extractComments: false,
      }),
    ],
  },
  devServer: {
    contentBase: path.join(__dirname, '/dist/'),
    inline: true,
    host: 'localhost',
    port: 8080,
  },

  // externals: {
  //   THREE: 'THREE',
  // },
}
