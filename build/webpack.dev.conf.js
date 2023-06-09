const {merge} = require('webpack-merge');
const webpack = require("webpack");

const webpackBase = require('./webpack.base.conf.js');

// https://webpack.docschina.org/configuration/configuration-types/
module.exports = function (env, argv) {
  return merge(webpackBase, {
    mode: "development",
    //https://webpack.docschina.org/configuration/devtool/#devtool
    devtool: 'inline-source-map',
    //https://webpack.docschina.org/configuration/dev-server/
    devServer: {
      // host: "0.0.0.0",
      // open: true, //自动打开浏览器
      port: 9007,
      hot: true,// 热更新 默认true
      liveReload: true, //重新加载或刷新页面
      //客户端配置
      client: {
        //在浏览器中以百分比显示编译进度。
        progress: true,
        //在浏览器显示编译错误信息
        overlay: true,
      },
      compress: true,//giz压缩
      //代理
      // proxy: {
      //   '/api': {
      //     target: 'http://localhost:3000',
      //     pathRewrite: {
      //       '^/api': ''
      //     },
      //   },
      // },
      //允许配置从目录提供静态文件的选项（默认是 'public' 文件夹）。将其设置为 false 以禁用：
      static: false,
    },
    plugins: [
      // 热更新
      new webpack.HotModuleReplacementPlugin(),
    ]
  });
}
