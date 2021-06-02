const path = require('path')
const fs = require('fs')
const glob = require('glob')

const HtmlWebpackPlugin = require('html-webpack-plugin')

const appDirectory = fs.realpathSync(process.cwd())
const srcPath = path.resolve(appDirectory, 'src')
const distPath = path.resolve(appDirectory, 'dist')

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

// ts/js文件不允许basename重名
const entries = getFiles('src/core/*.{js,ts,jsx,tsx}')
const htmlTemplates = Object.keys(entries).map(
  fileName =>
    new HtmlWebpackPlugin({
      template: path.resolve(appDirectory, 'index.html'),
      filename: `${fileName}.html`,
      chunks: [`${fileName}`],
      inject: 'body',
      title: `${fileName}`,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        minifyCSS: true,
        minifyJS: true,
        minifyURLs: true,
      },
      scriptLoading: 'blocking',
    })
)

console.log(JSON.stringify(htmlTemplates))

module.exports = {
  srcPath,
  distPath,
  entries,
  htmlTemplates,
}
