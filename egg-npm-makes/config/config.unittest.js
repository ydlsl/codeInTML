
const chohoTestCode = require('../lib/index')

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
    extend: {}
  }
  chohoTestCode(test)
  
  return {
    ...config,
  }
}