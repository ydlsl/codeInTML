
const chohoTestCode = require('./testConfig/index')

module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  const test = {
    controller: {
      exclude: ['stu']
    }, 
    service: {

    },
  }
  chohoTestCode(test)
  
  return {
    ...config,
  }
}