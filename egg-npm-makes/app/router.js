module.exports = app => {

  const { router, controller } = app;
 
  router.get('/hello', controller.hello.index);
  router.get('/show1', controller.stu.show1);
  //post请求
  router.post('/show2', controller.stu.show2);
  router.post('/helloIndex', controller.hello.index);
};
