function TestBase({router, path, fn, method = 'get'}){
  let postSend = '.send(item.args)'
  if(!router){
    router = "'/test'"
    console.log('there is no router for :', fn)
  }
  if(method == 'get'){
    postSend = '.query(item.args)'
  }
  const Code = `// @test ${fn}
  describe('${path}', () => {
    let tests = [
      {args: {'qwe': 0},   expected: 3},
      {args: {'qwe': 1},   expected: 6},
      {args: {'qwe': 3},   expected: 10}
    ];
    
    it('${fn}', () => {
      return app.httpRequest()
        .${method}(${router}) // GET 请求
        .expect(200) // 期望返回的 status 200
        .expect('这是Hello!'); // 期望返回的 body，支持 string/
    });
  
    tests.forEach(function(item) {
      it('${fn}' + item.args, () => {
        return app.httpRequest()
          .${method}(${router}) // GET post
          ${postSend}
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
  })`
  return Code
}

// // @test ${fn}
// describe('${path}', () => {
//   let tests = [
//     {args: {'qwe': 0},   expected: 3},
//     {args: {'qwe': 1},   expected: 6},
//     {args: {'qwe': 3},   expected: 10}
//   ];
  
//   it('${fn}', () => {
//     return app.httpRequest()
//       .${method}(${router}) // GET 请求
//       .expect(200) // 期望返回的 status 200
//       .expect('这是Hello!'); // 期望返回的 body，支持 string/
//   });

//   tests.forEach(function(item) {
//     it('${fn}' + item.args, () => {
//       return app.httpRequest()
//         .${method}(${router}) // GET post
//         ${postSend}
//         .expect(200) // 期望 200
//         .then(response => {
//           // response.Data
//           const res = response.Data;
//           assert(res.Code == '0'); // 业务码应该为'0'
//           // assert(res.Data.xxx);
//           // assert(res.Data.xxx == item.expected);
//         });
//     });
//   })
// })


module.exports = TestBase