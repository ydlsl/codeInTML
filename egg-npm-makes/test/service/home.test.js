const { app, assert } = require('egg-mock/bootstrap');
// @test testForMocha
  describe('test/service/home.test.js', () => {
    let tests = [
      {args: [1, 2],       expected: 3},
      {args: [1, 2, 3],    expected: 6},
      {args: [1, 2, 3, 4], expected: 10}
    ];
    let params = {};
    
    it('testForMocha', async () => {
      const ctx = app.mockContext(); // 实例得放在it内
      // ctx.request.query = {'asd': 12} //有用
      const res = await ctx.service.home.testForMocha(params);
      console.log('service.testForMocha ', 'res = ', res)
      //assert(res == '00')
      assert(!res)
    });
  
    tests.forEach(function(item) {
      it('testForMocha = ' + item.args, async () => {
        const ctx = app.mockContext();
        // ctx.request.body = {'asd': 12, 'ert': 456} //有用
        params = item.args
        const res = await ctx.service.home.testForMocha(params);
        console.log('service.testForMocha p = ',item.args, 'res = ', res)
        //assert(res == item.expected)
        assert(res)
        //assert(res.date)
      });
    })
  })