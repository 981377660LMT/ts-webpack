const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const ProgressPlugin = require('progress-webpack-plugin')

const { entries, htmlTemplates, srcPath } = require('./getPath')

module.exports = {
  entry: entries,
  module: {
    rules: [
      {
        test: /\.(js|jsx|tsx|ts)$/,
        include: srcPath,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
            },
          },
          // 'eslint-loader',
        ],
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
      '@': srcPath,
    },
  },
}
