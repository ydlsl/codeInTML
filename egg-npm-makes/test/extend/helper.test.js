const { app, assert } = require('egg-mock/bootstrap');
// @test getMd5Code
  describe('test/extend/helper.test.js', () => {
    let tests = [
      {args: [1, 2],       expected: 3},
      {args: [1, 2, 3],    expected: 6},
      {args: [1, 2, 3, 4], expected: 10}
    ];
    let params = {};
    
    it('getMd5Code', async () => {
      const ctx = app.mockContext(); // 实例得放在it内
      // ctx.request.query = {'asd': 12} //有用
      const res = await ctx.helper.getMd5Code(params);
      assert(!res)
    });
  
    tests.forEach(function(item) {
      it('getMd5Code = ' + item.args, async () => {
        const ctx = app.mockContext();
        // ctx.request.body = {'asd': 12, 'ert': 456} //有用
        params = item.args
        const res = await ctx.helper.getMd5Code(params);
        assert(res)
        //assert(res.date)
      });
    })
  })
// @test loggerInfo
  describe('test/extend/helper.test.js', () => {
    let tests = [
      {args: [1, 2],       expected: 3},
      {args: [1, 2, 3],    expected: 6},
      {args: [1, 2, 3, 4], expected: 10}
    ];
    let params = {};
    
    it('loggerInfo', async () => {
      const ctx = app.mockContext(); // 实例得放在it内
      // ctx.request.query = {'asd': 12} //有用
      const res = await ctx.helper.loggerInfo(params);
      assert(!res)
    });
  
    tests.forEach(function(item) {
      it('loggerInfo = ' + item.args, async () => {
        const ctx = app.mockContext();
        // ctx.request.body = {'asd': 12, 'ert': 456} //有用
        params = item.args
        const res = await ctx.helper.loggerInfo(params);
        assert(res)
        //assert(res.date)
      });
    })
  })