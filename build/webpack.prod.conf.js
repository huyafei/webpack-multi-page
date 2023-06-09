/**
 * @name: webpack.config
 * @author: yfhu
 * @date: 2021/9/7 11:13
 * @description：webpack.config 默认配置文件 需要自己建立
 * @update: 2021/9/7 11:13
 */
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const {merge} = require('webpack-merge');
const webpackBase = require('./webpack.base.conf.js');
// js压缩
// const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
// css压缩
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

// https://webpack.docschina.org/configuration/configuration-types/
module.exports = function (env, argv) {
  const config = merge(webpackBase, {
    mode:"production",
    devtool: 'source-map',
    output:{
      clean: true,// 自动将上次打包目录资源清空 /dist 文件夹 5.20以下版本清除dist文件内容一般使用插件 clean-webpack-plugin， 5.20版本以后output新增特性clean，用于清除dist文件
    },
    // 模块
    module: {
      // loader 类型转换，将其它类型转换为有效类型，webpack只能识别JavaScript 和 JSON 文件
      rules: [],
    },
    // 插件，loader处理不了的用插件，例如打包优化，资源管理，注入环境变量
    plugins: [
      // 每次构建前清理dist文件夹
      new CleanWebpackPlugin(),
    ],
    optimization: {
      minimizer: [
        // new UglifyJSPlugin(), // webpack 5.20以下版本使用
        new CssMinimizerPlugin(),
      ],
    },
  })
  return config;
}
