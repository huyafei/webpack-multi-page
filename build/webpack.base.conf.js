const utils = require('./utils');
const glob = require("glob");
//过滤没有用到的css代码或js代码
const PurgeCSSPlugin = require('purgecss-webpack-plugin');
//进度条
const ProgressBarPlugin = require('progress-bar-webpack-plugin');

//静态资源输出
const CopyWebpackPlugin = require("copy-webpack-plugin");
// css样式抽离
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
console.log('---2---',__dirname)

module.exports = {
  entry: utils.entry,
  output: {
    path: utils.resolve( '../dist'),
    filename: 'js/[name]_[chunkhash].bundle.js',
    //资源发布地址，注意：这个配置直接影响页面404,
    publicPath: '/',
    // publicPath: 'https://cdn.example.com/assets/',
    assetModuleFilename: "img/[name].[hash:8].[ext]",
    clean: true,//清理 /dist 文件夹
  },
  optimization: {
    usedExports: true,
  },
  //配置模块解析
  resolve: {
    alias: {
      '@': utils.resolve('../src'),
      '~': utils.resolve('../static'),
      'utils': utils.resolve('../src/utils'),
    }
  },
  // 模块
  module: {
    // loader 类型转换，将其它类型转换为有效类型，webpack只能识别JavaScript 和 JSON 文件
    rules: [
      ...utils.rules,
    ],
  },
  plugins: [
    ...utils.htmlPlugins,
    //样式抽离
    new MiniCssExtractPlugin({
      filename: "css/[name].[hash].css",
    }),
    new ProgressBarPlugin(),
    new PurgeCSSPlugin({
      paths: glob.sync(utils.join("../src/views/*/*"))
    }),
    new CopyWebpackPlugin(
      {
        patterns: [
          {
            // 定义要拷贝的源目录
            from: utils.resolve("../static"),
            // 定义要拷贝到的目标目录
            to:  utils.resolve("../dist/static")
          },
        ]
      }
    ),
  ]
}
