const FileHandler = require('./filehandler')
const fileHandler = new FileHandler()


function adjustConfig(config){
  const mochaConfig = {}
  const moduleDict = fileHandler.getModule('app')
  for(const key in config) {
    if(!moduleDict[key]){
      throw new Error('make sure arguments module has been defined !')
    }
    const module = config[key];
    const moduleConfig = mochaConfig[key] = {}
    moduleConfig.path = moduleDict[key]
    moduleConfig.files = fileHandler.getModule(moduleDict[key], true)
    let exlist = module.exclude || []
    exlist.map(item=>{
      if(typeof item != 'string'){
        throw new Error('make sure exclude mast been list with string !')
      }
      if(!item.includes('.js')){
        item += '.js'
      }
      delete moduleConfig.files[item]
    })
  }
  return mochaConfig
}

function getRouter(){
  let router = {}
  let routerPath = fileHandler.getModule('app', true)
  routerPath = routerPath['router.js']
  router = fileHandler.getRouterDict(routerPath)
  return router
}

function createTestFile(config, dirPath = 'tests'){
  const testDict = fileHandler.getModule(dirPath)
  const router = getRouter()
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
      const testName = fileName.replace('.js', '.test.js')
      if(!testConfig.files[testName]){
        // create file
        fileHandler.createFile(testPath)
        testConfig.files[testName] = testPath
        console.log('9090 = ', testConfig.files)
      }
      //next
      const { fileCode, testCode } = fileHandler.getTestCode(filePath, testPath, '@test')
      fileHandler.correspondingFile({
        fileCode, 
        testCode,
        key,
        router,
        testPath
      })
    }
  }
}


async function makeTestCode(userConfig = {}){
  let config = {
    controller: {}, 
    service: {},
  }
  console.log('start make code')
  Object.assign(config, userConfig)
  config = adjustConfig(config)
  createTestFile(config, 'test')
  console.log('end make')
}

// export default makeTestCode // webpack npm
module.exports = makeTestCode // local & no webpack