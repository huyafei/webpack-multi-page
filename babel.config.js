/*
* @Name: babel.config
* @description: babel.config.js
* @Date: 2023/6/5 15:57
* @Author: yf_hu
* @LastEditors: yf_hu
* @LastEditTime: 2023/6/5 15:57
* */
module.exports = {
  presets: [
    "@babel/preset-env",
    {
      // 配置
      // targets: {
      //   edge: "17",
      //   firefox: "60",
      //   chrome: "67",
      //   safari: "11.1",
      // },
      // useBuiltIns: "usage",
      // corejs: "3.6.4",
    },
  ],
};
