
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1641803524168_32641212';

  config.security = {
    csrf: {
        enable: false,
    }
  }
  return {
    ...config,
  }
}