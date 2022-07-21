const { app, assert } = require('egg-mock/bootstrap');
// @test index
  describe('tests/controller/hello.test.js', () => {
    let tests = [
      {args: {'qwe': 0},   expected: 3},
      {args: {'qwe': 1},   expected: 6},
      {args: {'qwe': 3},   expected: 10}
    ];
    
    it('index', () => {
      return app.httpRequest()
        .post('/helloIndex') // GET 请求
        .expect(200) // 期望返回的 status 200
        .expect('这是Hello!'); // 期望返回的 body，支持 string/
    });
  
    tests.forEach(function(item) {
      it('index' + item.args, () => {
        return app.httpRequest()
          .post('/helloIndex') // GET post
          .send(item.args)
          .expect(200) // 期望 200
          .then(response => {
            // response.Data
            const res = response.Data;
            assert(res.Code == '0'); // 业务码应该为'0'
            // assert(res.Data.xxx);
            // assert(res.Data.xxx == item.expected);
          });
      });
    })
  })
// @test index12
  describe('tests/controller/hello.test.js', () => {
    let tests = [
      {args: {'qwe': 0},   expected: 3},
      {args: {'qwe': 1},   expected: 6},
      {args: {'qwe': 3},   expected: 10}
    ];
    
    it('index12', () => {
      return app.httpRequest()
        .get('/test') // GET 请求
        .expect(200) // 期望返回的 status 200
        .expect('这是Hello!'); // 期望返回的 body，支持 string/
    });
  
    tests.forEach(function(item) {
      it('index12' + item.args, () => {
        return app.httpRequest()
          .get('/test') // GET post
          .query(item.args)
          .expect(200) // 期望 200
          .then(response => {
            // response.Data
            const res = response.Data;
            assert(res.Code == '0'); // 业务码应该为'0'
            // assert(res.Data.xxx);
            // assert(res.Data.xxx == item.expected);
          });
      });
    })
  })