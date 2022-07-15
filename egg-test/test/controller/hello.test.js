const { app, assert } = require('egg-mock/bootstrap');

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

// describe('test/app/controller/user.test.js', () => {
//   it('should POST /users', () => {
//     return app.httpRequest()
//       .post('/users') // POST 请求
//       .send({ username: 'Mike', password: '123456' }) // post body
//       .expect(200)
//       .then(response => {
//         // response.text 是返回的 body 字符串，转成 json 后再通过 assert 校验
//         const res = JSON.parse(response.text);
//         assert.equal(res.code, '0000'); // 业务错误码应该为'0000'，字符串对比
//         assert(res.data.userId); // userId应该存在，注意 0、false、空字符串 都会被判定为失败，与 assert.ok() 等效
//       });
//   });
// });
