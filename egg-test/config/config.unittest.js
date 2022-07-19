
const chohoTestCode = require('./testConfig/index')

module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  let testList = {
    controller: {
      exclude: ['stu']
    }, 
    service: {

    },
  }
  chohoTestCode(testList)
  
  return {
    ...config,
  }
}