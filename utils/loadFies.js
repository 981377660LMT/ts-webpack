const fs = require('fs')
const path = require('path')
const glob = require('glob')
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

console.log(getFiles('src/**/*.{js,ts,jsx,tsx}'))
