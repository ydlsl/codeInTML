function TestBase({router, path, fn, method = 'post'}){

  const Code = `// @test ${fn}
  describe('${path}', () => {
    let tests = [
      {args: [1, 2],       expected: 3},
      {args: [1, 2, 3],    expected: 6},
      {args: [1, 2, 3, 4], expected: 10}
    ];
    let list;
    
    it('${fn}', () => {
      return app.httpRequest()
        .${method}(${router}) // GET 请求
        .expect(200) // 期望返回的 status 200
        .expect('这是Hello!'); // 期望返回的 body，支持 string/
    });
  
    tests.forEach(function(item) {
      it('${fn}', () => {
        return app.httpRequest()
          .${method}(${router}) // GET 请求
          .expect(200) // 期望返回的 status 200
          .expect('这是Hello!'); // 期望返回的 body，支持 string/
      });
    })
  })`
  return Code
}

// // @test ${fn}
// describe('${path}', () => {
//   let tests = [
//     {args: [1, 2],       expected: 3},
//     {args: [1, 2, 3],    expected: 6},
//     {args: [1, 2, 3, 4], expected: 10}
//   ];
//   let list;
  
//   it('${fn}', () => {
//     return app.httpRequest()
//       .${method}(${router}) // GET 请求
//       .expect(200) // 期望返回的 status 200
//       .expect('这是Hello!'); // 期望返回的 body，支持 string/
//   });

//   tests.forEach(function(item) {
//     it('${fn}', () => {
//       return app.httpRequest()
//         .${method}(${router}) // GET 请求
//         .expect(200) // 期望返回的 status 200
//         .expect('这是Hello!'); // 期望返回的 body，支持 string/
//     });
//   })
// })


module.exports = TestBase