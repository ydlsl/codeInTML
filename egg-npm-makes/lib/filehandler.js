const Path = require('path')
const fs = require('fs')

const controllerMaker = require('./controller')
const serviceMaker = require('./service')
const extendMaker = require('./extend')
const baseCode = require('./base')

function getPath(dir) {
  let rootPath = __dirname
  let basePath = '/node_modules'
  if(process.env.PWD?.includes('egg-npm-makes')){
    basePath = '/lib'
  }
  const endIndex = __dirname.lastIndexOf(basePath) 
  if(endIndex != -1){
    rootPath = __dirname.slice(0, endIndex)
  }
  const dirIndex = dir.lastIndexOf(rootPath)
  // console.log('__dirname = ', __dirname, 'rootPath = ', rootPath, ' endIndex = ', endIndex)
  if(dirIndex != -1){
    return dir
  }
  return Path.join(rootPath, dir)
}

class FileHandler {

  constructor() {
		this.controllerMaker = controllerMaker
    this.serviceMaker = serviceMaker
    this.extendMaker = extendMaker
	}

  getCodeMaker(module){
    const makers = {
      controller: 'controllerMaker',
      service:    'serviceMaker',
      extend:     'extendMaker',
    }
    let maker = makers[module]
    if(typeof this[maker] != 'function'){
      console.log('there is no code maker for module: ', module)
      maker = makers['service']
    }
    return maker
  }

  readFile(path){
    path = getPath(path)
    let data = null
    try {
      data = fs.readFileSync(path, 'utf8')
    } catch (error) {
      console.log('readFile: ', error.message)
    }
    return data
  }
  
  writeFile(path, data){
    path = getPath(path)
    let res = null
    try {
      if(fs.existsSync(path)){
        fs.appendFileSync(path, '\n' + data)
      }else{
        fs.writeFileSync(path, data)
      }
      res = true
    } catch (error) {
      console.log('writeFile: ', error.message)
    }
    return res
  }

  createFile(path){
    try {
      let data = baseCode()
      this.writeFile(path, data)
    } catch (error) {
      console.log('createFile Err: ', error.message)
    }
  }

  createDir(path){
    path = getPath(path)
    try {
      fs.mkdirSync(path);
    } catch (error) {
      console.log('mkdirSync Err: ', error.message)
    }
  }

  getModule(basePath = 'app', isFile = false){
    let moduleDict = {}
    let fileDict = {}
    const getModuleFromPath = ()=>{
      const modulePath = getPath(basePath)
      if(!fs.existsSync(modulePath)){
        this.createDir(basePath)
      }
      let files = fs.readdirSync(modulePath)
      files.forEach(item=>{
        let filepath1 = `${modulePath}/${item}`
        let stat = fs.statSync(filepath1)
        if(stat.isFile()){
          // file
          fileDict[item] = `${basePath}/${item}`
        }else{
          // dir
          moduleDict[item] = `${basePath}/${item}`
        }
      })
    }
    try {
      getModuleFromPath()
    } catch (error) {
      console.log('err in getModule: ', error.message)
    }
    return isFile? fileDict: moduleDict
  }

  getRouterDict(path){
    let code = this.getRouterCode(path, 'router.')
    return code || {}
  }

  getTestCode(filePath, testPath, symbol = '@test'){
    let fileCode = this.getFileCode(filePath, symbol)
    let testCode = this.getFileCode(testPath, symbol)
    return {
      fileCode,
      testCode
    }
  }
  /**
   * @param {*} fileCode  { index: 1 }
   * @param {*} testCode  { index: 1, test: 1 }
   * @param {*} router    {index: {module: 'controller',method: 'get',router: "'/hello'",file: 'hello',fn: 'index'
   */
  correspondingFile({fileCode, testCode, key, testPath, router}){
    for(let fn in fileCode){
      if(testCode[fn]){
        continue
      }
      //add fn into test
      const codeMaker = this.getCodeMaker(key)
      let pathInfo = {}
      if(codeMaker != 'controllerMaker'){
        pathInfo = this.getPathCode(testPath)
      }
      const param = {
        ...router[fn], 
        path: testPath,
        ...pathInfo,
        fn
      }
      let code = this[codeMaker](param)
      this.writeFile(testPath, code)
    }
  }

  getRouterCode(path, symbol){
    let dict = {}
    let data = this.readFile(path)
    let codeList = data.split(symbol)
    for(let i = 1; i< codeList.length; i++){

      const fnCode = codeList[i].split('\n')[0]
      const profile = fnCode?.split(',') // ["post('/x/yyyy'", "xxx", "xxx", "controller.xx.yy)"]
      const methodAndRouter = profile[0]?.split('(')
      const moduleAndFn = profile[profile.length - 1]?.split('.')

      const info = {}
      let module = null
      info.method = methodAndRouter[0]
      info.router = methodAndRouter[1]
      info.file = moduleAndFn[1]
      info.fn = moduleAndFn[moduleAndFn.length - 1]?.split(')')[0]?.trim()
      module = moduleAndFn[0]?.trim()

      dict[info.fn] = {
        module,
        ...info
      }
    }
    return dict
  }

  getPathCode(path){
    const info = {}
    let codeList = path.split('/')
    let index = codeList.length
    index--
    info.file = codeList[index]?.split('.')[0]
    index--
    info.module = codeList[index]
    return info
  }

  getFileCode(path, symbol){
    let dict = {}
    let data = this.readFile(path)
    let codeList = data?.split(symbol) || []
    for(let i = 1; i< codeList.length; i++){
      let fnCode = codeList[i].split('\n')
      let fnName = fnCode[0].trim()
      dict[fnName] ||= 0
      dict[fnName]++
    }
    return dict
  }
}

module.exports = FileHandler