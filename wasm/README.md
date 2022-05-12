# canvas2d


## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).



emcc --bind -O3 bspline/bspline.cpp -o ../wasm_build/bspline.js -s SINGLE_FILE=1 


emcc --bind -O3 deformation/deform.cpp deformation/laplacian_deformation.cpp -o ../wasm_build/deform.js -I deformation -s SINGLE_FILE=1



emcc -std=c++2a --bind -O3 -o ../wasm_build/vto.js  -s WASM=1  vto/wasm/dentalc.cpp   vto/vto/b_spline.cpp vto/vto/control_points_registration.cpp vto/vto/image_deformation.cpp vto/vto/vto.cpp   vto/build_wasm/lib/libopencv_calib3d.a  vto/build_wasm/lib/libopencv_core.a vto/build_wasm/lib/libopencv_dnn.a vto/build_wasm/lib/libopencv_features2d.a vto/build_wasm/lib/libopencv_flann.a vto/build_wasm/lib/libopencv_imgproc.a  vto/build_wasm/lib/libopencv_objdetect.a vto/build_wasm/lib/libopencv_photo.a vto/build_wasm/lib/libopencv_video.a -I vto/vto -I vto/build_wasm/all_includes -I vto/build_wasm/fmt/include -s ERROR_ON_UNDEFINED_SYMBOLS=0


emcc --bind -O3 test/test.cpp test/CVto.cpp -o ../wasm_build/test.js -s SINGLE_FILE=1 -s ALLOW_MEMORY_GROWTH=1




emcc -std=c++2a --bind -O3 -o ../wasm_build/vto.js  -s WASM=1  vto/test.cpp vto/CVto.cpp   vto/build_wasm/lib/libopencv_calib3d.a  vto/build_wasm/lib/libopencv_core.a vto/build_wasm/lib/libopencv_dnn.a vto/build_wasm/lib/libopencv_features2d.a vto/build_wasm/lib/libopencv_flann.a vto/build_wasm/lib/libopencv_imgproc.a  vto/build_wasm/lib/libopencv_objdetect.a vto/build_wasm/lib/libopencv_photo.a vto/build_wasm/lib/libopencv_video.a -I vto/vto -I vto/build_wasm/all_includes -s SINGLE_FILE=1 -s ALLOW_MEMORY_GROWTH=1 -s ERROR_ON_UNDEFINED_SYMBOLS=0

https://www.cntofu.com/book/150/zh/ch1-quick-guide/ch1-03-glue-code.md

1、首先得安装一下emcc的环境，具体的环境如下: 
  http://webassembly.org.cn/getting-started/developers-guide
  https://segmentfault.com/a/1190000014208777

  安装过程中会遇到很多不可思议的东西，emsdk activate latest

2、启动，可以全局安装启动，也可以再次进入启动
  全局环境变量方式启动先看：emcc -v 

  再次启动进入原先放置emcc的文件，进入emsdk文件夹，看到emsdk_env.sh
  在该文件夹下打开终端执行source ./emsdk_env.sh 
  windows就在cmd的终端进入该目录，然后直接emsdk_env
  在该终端下进行编译


3、编译，一般编译出两个文件
  emcc --bind -O3 test.cpp -o test.js -s SINGLE_FILE=1
  -s SINGLE_FILE=1 编译出单文件，不出.wasm文件
  注意大写的O哦

4、使用，js文件使用
  导出相关东西，在编译后的js文件最后export default Module;
  在新的文件中引入const test = import('test.js');
  let testModule = await test
  testModule.default.onRuntimeInitialized = () => {
    resolve();
  };

5、调用，用prmise直接testModule.default.fn()
  fn为wasm的函数


