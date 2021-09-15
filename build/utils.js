'use strict'
const glob = require("glob");
const path = require("path");
const resolve = (url) => {
  return path.resolve(__dirname, url)
}
const join = (url) => {
  return path.join(__dirname, url)
}
// html模板
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
let utils = {
  resolve,
  join
}
/**
 * 获取动态入口
 * https://v4.webpack.docschina.org/concepts/entry-points/
 * @param PAGES_DIR 页面路劲 默认 ./src/views/
 * @param fileType 文件类型 默认 js 格式
 * @returns {{}}  {[entryChunkName: string]: Array<string>}
 */
// const getEntry = function (PAGES_DIR, fileType) {
//   let entry = {};
//   //读取src/views目录下所有入口
//
//   let files = glob.sync(path.join(__dirname, PAGES_DIR + '**/*.' + fileType))
//   // let files = glob.sync(path.resolve(__dirname, PAGES_DIR + '**/*.' + fileType))
//   console.log(files)
//   // let files = glob.sync(PAGES_DIR + '**/*.' + fileType)
//   files.forEach(function (fileUrl) {
//     let start = fileUrl.indexOf(PAGES_DIR) + PAGES_DIR.length - 1;
//     let end = fileUrl.length - fileType.length + 1;
//     let entryChunkUrlArr = [];
//     let entryChunkName = fileUrl.slice(start, end).split('/')[1];
//     entryChunkUrlArr.push(fileUrl);
//     entry[entryChunkName] = entryChunkUrlArr;
//   })
//   return entry;
// }
// utils.entry = getEntry(PAGES_DIR = "../src/views/", fileType = 'js')


/**
 * 获取 loader
 * @returns {*[]}
 */
const getRules = function () {
  return [
    {
      test: /\.(htm|html)$/,
      loader: 'html-withimg-loader',
      options: {
        limit: 10000,
        name: '[name].[hash:7].[ext]',
        // 输出路径
        outputPath: 'img/',
      }
    },
    //处理css文件 style-loader、css-loader
    {
      test: /\.css$/,
      use: [
        process.env.NODE_ENV === 'development'
          ? 'style-loader'
          : MiniCssExtractPlugin.loader,
        "css-loader", 'postcss-loader']
    },
    //处理js；后面exclude指的是，排除node_modules里面的js文件
    {
      test: /\.js$/,
      use: {
        loader:"babel-loader",
        options: {
          presets: ['@babel/preset-env']
        }
      },
      include: resolve(__dirname, '../src'),
      exclude: /node_modules/,

    },
    //处理图片
    {
      test: /\.(png|svg|jpg|jpeg|gif)$/i,
      type: 'asset/resource',
      generator: {
        filename: 'img/[hash][ext][query]'
      }
    },
    {
      test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/i,
      type: 'asset/resource',
      generator: {
        filename: 'media/[hash][ext][query]'
      }
    },
    // 处理字体
    {
      test: /\.(eot|svg|ttf|woff|woff2)$/i,
      type: 'asset/resource',
      generator: {
        filename: 'font/[hash][ext][query]'
      }
    },

  ];

}
const getFiles = function () {
  const result = [];
  const files = glob.sync(resolve('../src/views/**/*.js'));
  console.log(files)
  files.map(function (file) {
    result.push({
      name: file.match(/\/\w{0,}\/\w{0,}(?=\.js)/)[0].split('/')[1],
      templatePath: file.replace('.js', '.html'),
      jsPath: file,
      stylePath: file.replace('.js', '.css')
    });
  })
  console.log(result)
  return result;
}
const getPlugins = function () {
  let files = getFiles()
  let htmlPlugins = [];
  let entries = {};
  files.map(file => {
    htmlPlugins.push(
      new HtmlWebpackPlugin({
        filename: `${file.name}.html`,
        template: file.templatePath,
        chunks: [file.name],
      })
    );
    entries[file.name] = file.jsPath;
  });

  return {
    htmlPlugins,
    entries
  };
}
let {entries, htmlPlugins} = getPlugins()
utils.entry = entries;
utils.htmlPlugins = htmlPlugins;
utils.rules = getRules();

module.exports = utils;
