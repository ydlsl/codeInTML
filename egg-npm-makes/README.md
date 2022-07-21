1、test单元测试部分
    egg-bin内置的test模块就很好，不用安装mocha
    packag直接添加 "test": "egg-bin test"
    在app同级建立test目录
    书写对应的文件，后缀名.test.js
    引入 const { app, assert } = require('egg-mock/bootstrap');
    代码最好都在it之后写
    引入 const ctx = app.mockContext();

2、webpack
    a、babel-loader 8.x对应babel-core 7.x
    b、babel-loader 7.x对应babel-core 6.x