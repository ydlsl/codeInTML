const Service = require('egg').Service;

// 请求的封装
class HomeService extends Service {
  // 将工作任务插入队列
  async testForMocha(list = [], custom = null) {
    const { ctx, app } = this;
    app.wfRunListDic = app.wfRunListDic || {};
    if(!list.length){
      return false
    }
    // 状态存入redis，用于前端查询
    const key = JSON.stringify(list);
    app.wfRunListDic[key] = list
    return key
  }
}

module.exports = HomeService;