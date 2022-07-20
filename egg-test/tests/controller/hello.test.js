const { app, assert } = require('egg-mock/bootstrap');
// @test index
  describe('tests/controller/hello.test.js', () => {
    let tests = [
      {args: [1, 2],       expected: 3},
      {args: [1, 2, 3],    expected: 6},
      {args: [1, 2, 3, 4], expected: 10}
    ];
    let list;
    
    it('index', () => {
      return app.httpRequest()
        .get('/helloIndex') // GET 请求
        .expect(200) // 期望返回的 status 200
        .expect('这是Hello!'); // 期望返回的 body，支持 string/
    });
  
    tests.forEach(function(item) {
      it('index', () => {
        return app.httpRequest()
          .get('/helloIndex') // GET 请求
          .expect(200) // 期望返回的 status 200
          .expect('这是Hello!'); // 期望返回的 body，支持 string/
      });
    })
  })