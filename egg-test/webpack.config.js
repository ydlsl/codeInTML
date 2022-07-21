const path = require('path')
const TerserPlugin = require('terser-webpack-plugin') // 引入压缩插件

const config = {
    target: 'node',
    mode: 'none', // 因为默认是production 默认会进行压缩
    entry: {
        "choho-test": "./testConfig/index.js",
        "choho-test.min": "./testConfig/index.js"
    },
    output: {
        path: path.join(__dirname, './dist/'), //打包的结果文件生成的目录要是绝对路径
        publicPath:'/dist/',
        filename: "[name].js",
        library: "choho-test", // new的Name
        libraryExport: "default", // 不添加的话引用的时候需要 tools.default
        libraryTarget: "umd", // 采用 UMD (Universal Module Definition) 的方式打包 js
        umdNamedDefine: true // 会对 UMD 的构建过程中的 AMD 模块进行命名。否则就使用匿名的 define。
    },
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({ // 使用压缩插件
                include: /\.min\.js$/,
                terserOptions: {
                    compress: {
                        pure_funcs: ['console.log']
                    }
                }
            })
        ]
    },
    module: {
        rules: [
            {
                test:/\.js$/, // 匹配js文件
                exclude:/(node_modules|dist)/, // 排除一些不需要转换的文件
                use: {
                    loader:'babel-loader',
                    // options: { // 替代.babelrc文件
                    //     presets: ['@babel/preset-env']
                    // }
                }
            },
        ]
    }
}

module.exports = () => {
    if (process.env.NODE_ENV == "production") {
      config.mode = "production";
    } else {
      config.mode = "development";
    }
    return config;
}