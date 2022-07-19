const Path = require('path')
const fs = require('fs')

function getPath(dir) {
  const endIndex = __dirname.lastIndexOf('/config/')
  const rootPath = __dirname.slice(0, endIndex)
  return Path.join(rootPath, dir)
}

class FileHandler {

  constructor() {
		
	}

  readFile(path){
    return new Promise((resolve, reject)=>{
      fs.readFile(getPath(path), 'utf8', function(err, dataStr) {
        if(err){
          reject('read fail: ' + err.message);
          return 
        }
        resolve(dataStr)
      })
    })
  }
  
  writeFile(path, data){
    return new Promise((resolve, reject)=>{
      fs.writeFile(getPath(path), data, function(err) {
        if(err){
          reject('write fail: ' + err.message);
          return 
        }
        resolve()
      })
    })
  }

  createFile(path){
    try {
      var writeStream = fs.createWriteStream(path);
      this.readFile('config/testConfig/base.js').then(data=>{
        writeStream.write(data);
        writeStream.end();
      })
    } catch (error) {
      console.log('createFile Err: ', error.message)
    }
  }

  createDir(path){
    try {
      fs.mkdirSync(getPath(path));
    } catch (error) {
      console.log('mkdirSync Err: ', error.message)
    }
  }

  getModule(basePath = 'app', isFile = false){
    let moduleDict = {}
    let fileDict = {}
    function getModuleFromPath(){
      const modulePath = getPath(basePath)
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
      // create
      this.createDir(basePath)
      getModuleFromPath()
    }
    if(isFile){
      return fileDict
    }
    return moduleDict
  }
}

module.exports = FileHandler