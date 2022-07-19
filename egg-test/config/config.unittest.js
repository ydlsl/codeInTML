var path = require('path')
var fs = require('fs')
var versionPath = './version.json'
var versioInfo = require(versionPath)

module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  console.log('5656565656: ', versioInfo.versionTime)
  
  
  return {
    ...config,
  }
}