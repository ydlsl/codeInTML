const { app, assert } = require('egg-mock/bootstrap');

describe('test/service/home.test.js', () => {
  it('list = undefined', async () => {
    const ctx = app.mockContext();
    let list
    const res = await ctx.service.home.testForMocha(list);
    assert(!res)
  });

  it('list = [1,2]', async () => {
    const ctx = app.mockContext();
    let list = [1,2]
    const res = await ctx.service.home.testForMocha(list);
    assert(res)
  });
});