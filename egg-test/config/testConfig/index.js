const path = require('path')
const fs = require('fs')

const FileHandler = require('./filehandler')
const console = require('console')

const fileHandler = new FileHandler()


function resolve(dir) {
  return path.join(__dirname, dir)
}


function adjustConfig(config){
  const mochaConfig = {}
  const moduleDict = fileHandler.getModule('app')
  for(const key in config) {
    if(!moduleDict[key]){
      throw new Error('make sure arguments module has been defined !')
    }
    const module = config[key];
    const moduleConfig = mochaConfig[key] = {}
    moduleConfig.exclude = module.exclude || []
    moduleConfig.path = moduleDict[key]
    moduleConfig.files = fileHandler.getModule(moduleDict[key], true)
  }
  return mochaConfig
}

function createTestFile(config){
  let dirPath = 'tests'
  const testDict = fileHandler.getModule(dirPath)

  for(const key in config) {
    let item = config[key]
    const testConfig = testDict[key] = {};
    const path = `${dirPath}/${key}`
    testConfig.path = path
    testConfig.files = fileHandler.getModule(path, true)
    for(let fileName in item.files){
      const filePath = item.files[fileName]
      let testPath = filePath.replace('app', dirPath)
      testPath = testPath.replace('.js', '.test.js')
      if(testConfig.files[fileName]){
        
        // next
      }else{
        // create file
        fileHandler.createFile(testPath)
      }
    }
  }
}


async function makeTestCode(config = {}){

  config = adjustConfig(config)
  createTestFile(config)


  // const data = await fileHandler.readFile('app/controller/hello.js')
  console.log(config)
}

module.exports = makeTestCode