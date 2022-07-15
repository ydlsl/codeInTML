const { app, assert } = require('egg-mock/bootstrap');

describe('test/app/controller/home.test.js', () => {
  it('assert show1', () => {
    return app.httpRequest()
      .get('/show1') // GET 请求
      .expect(200) // 期望返回的 status 200
      .expect('这是get得到的信息'); // 期望返回的 body，支持 string/
  });
});

describe('test/app/controller/home.test.js', () => {
  it('assert show2', () => {
    return app.httpRequest()
      .post('/show2') // GET 请求
      .expect(200) // 期望返回的 status 200
      .expect('这是post得到的信息'); // 期望返回的 body，支持 string/
  });
});