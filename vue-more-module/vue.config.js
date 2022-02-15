var path = require("path");
function resolve(dir) {
    console.log(path.join(__dirname, dir));
    return path.join(__dirname, dir);
}

const ServerSign = process.argv[6] || 'index'; // 运行 时候的标记 pc 还是h5 // npm run serve-index    ServerSign = index;
const env = process.argv[4] || 'debug'; // 当前环境 eg:prod
let type = process.argv[5] || 'pc'; // 当前打包h5还是pc;
if(type === 'pc') { type = 'index'; };

// 根据入口来设置pages 
function setPage() {
  const pages = new Map([
    ['h5',{
      h5: {
        entry: "src/h5-project/main.ts",
        template: "src/public/h5.html",
        filename: "index.html",
        title: "vue-h5",
        chunks: ["chunk-vendors", "chunk-common", "h5"]
      }
    }],
    ['index', {
      index: {
        entry: "src/pc-project/main.ts",
        template: "src/public/index.html",
        filename: "index.html",
        title: "vue-pc",
        chunks: ["chunk-vendors", "chunk-common", "index"]
      }
    }],
  ])


  let page = {}
  if (process.env.NODE_ENV == 'development') {
    page = pages.get(ServerSign) || pages.get('index');
  } else {
    page = pages.get(type) || pages.get('index');
  }
  return page;
}

function setOutputDir() {
  const arr = new Map([
    ['index_debug', 'Publish/Debug/pc'],
    ['index_test01', 'Publish/PublishTest01/pc'],
    ['index_test02', 'Publish/PublishTest02/pc'],
    ['index_prod', 'Publish/Release/pc'],
    ['h5_debug', 'Publish/Debug/h5'],
    ['h5_test01', 'Publish/PublishTest01/h5'],
    ['h5_test02', 'Publish/PublishTest02/h5'],
    ['h5_prod', 'Publish/Release/h5'],
  ])

  var outputDir = arr.get(type+'_'+env) || 'Publish/Debug';
  return outputDir;
}

module.exports = {
    lintOnSave: false, //eslint验证
    publicPath: "./",
    outputDir:process.env.NODE_ENV == 'development'?'Publish/Debug':setOutputDir() ,
    pages: setPage(), //页面配置
    filenameHashing: true, 
    productionSourceMap: false, // 生产环境是否生成 sourceMap 文件
};