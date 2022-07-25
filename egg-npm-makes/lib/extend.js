function TestBase({path, module, file, fn}){
  // console.log('path = ', path, ' module = ', module, ' file = ', file, ' fn = ', fn)
  const Code = `// @test ${fn}
  describe('${path}', () => {
    let tests = [
      {args: [1, 2],       expected: 3},
      {args: [1, 2, 3],    expected: 6},
      {args: [1, 2, 3, 4], expected: 10}
    ];
    let params = {};
    
    it('${fn}', async () => {
      const ctx = app.mockContext(); // 实例得放在it内
      // ctx.request.query = {'asd': 12} //有用
      const res = await ctx.${file}.${fn}(params);
      console.log('${fn} ', 'res = ', res);
      //assert(res == '')
      assert(!res)
    });
  
    tests.forEach(function(item) {
      it('${fn} = ' + item.args, async () => {
        const ctx = app.mockContext();
        // ctx.request.body = {'asd': 12, 'ert': 456} //有用
        params = item.args
        const res = await ctx.${file}.${fn}(params);
        console.log('${fn} p = ',item.args, 'res = ', res);
        //assert(res == item.expected)
        assert(res)
        //assert(res.date)
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
//   let params = {};
  
//   it('${fn}', async () => {
//     const ctx = app.mockContext(); // 实例得放在it内
//     // ctx.request.query = {'asd': 12} //有用
//     const res = await ctx.${file}.${fn}(params);
//     console.log('${fn} ', 'res = ', res);
//     //assert(res == '')
//     assert(!res)
//   });

//   tests.forEach(function(item) {
//     it('${fn} = ' + item.args, async () => {
//       const ctx = app.mockContext();
//       // ctx.request.body = {'asd': 12, 'ert': 456} //有用
//       params = item.args
//       const res = await ctx.${file}.${fn}(params);
//       console.log('${fn} p = ',item.args, 'res = ', res);
//       //assert(res == item.expected)
//       assert(res)
//       //assert(res.date)
//     });
//   })
// })


module.exports = TestBase