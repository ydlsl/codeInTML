
describe('test/app/controller/home.test.js', () => {
  
  it('assert pkg.name no exist', () => {
    const pkg = require('../../package.json');
    assert(pkg.name.startsWith('egg'));
  });

  it('should index /', () => {
    return app.httpRequest()
      .get('/hello') // GET 请求
      .expect(200) // 期望返回的 status 200
      .expect('这是Hello!'); // 期望返回的 body，支持 string/
  });
});