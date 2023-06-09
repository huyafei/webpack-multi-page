const glob = require("glob");
//过滤没有用到的css代码或js代码
const PurgeCSSPlugin = require('purgecss-webpack-plugin');
//进度条
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
// css样式抽离
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
//静态资源输出
const CopyWebpackPlugin = require("copy-webpack-plugin");

const utils = require('./utils');

module.exports = {
  entry: utils.entry,
  output: {
    path: utils.resolve('../dist'),
    filename: 'js/[name]_[chunkhash].bundle.js',
    //资源发布地址，注意：这个配置直接影响页面404,
    publicPath: '/',
    // publicPath: 'https://cdn.example.com/assets/',
    // assetModuleFilename: "imgs/[name].[hash:8].[ext]",
    // clean: true,// 自动将上次打包目录资源清空 /dist 文件夹
  },
  // 优化
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
      {
        // 处理 html 中 img 图片
        test: /\.(htm|html)$/,
        loader: 'html-withimg-loader',
        options: {
          limit: 10000,
          //[hash:7] 取hash前7位
          //[ext] 取文件原扩展名
          name: '[name].[hash:7].[ext]',
          // 输出路径
          outputPath: 'img/',
        }
      },
      //处理css文件 style-loader、css-loader
      {
        test: /\.css$/,
        use: [
          process.env.NODE_ENV === 'development' ? 'style-loader' : MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  [
                    'postcss-preset-env',
                    {
                      // 其他选项
                    },
                  ],
                ],
              },
            },
          },
        ]
      },
      {
        test: /\.less$/,
        use: [
          process.env.NODE_ENV === 'development' ? 'style-loader' : MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [
                  "postcss-preset-env", // 能解决大多数样式兼容性问题
                ],
              },
            },
          },
          "less-loader"],
      },
      //处理js；后面exclude指的是，排除node_modules里面的js文件
      {
        test: /\.m?js$/,
        // include: utils.resolve(__dirname, '../src'),
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          }
        },
      },
      //处理图片
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024 // 小于10kb的图片会被base64处理
          }
        },
        generator: {
          // 将图片文件输出到 imgs 目录中
          // 将图片文件命名 [hash:8][ext][query]
          // [hash:8]: hash值取8位
          // [ext]: 使用之前的文件扩展名
          // [query]: 添加之前的query参数
          filename: 'imgs/[hash][ext][query]'
        },
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

    ]
  },
  plugins: [
    ...utils.htmlPlugins,
    //样式抽离
    new MiniCssExtractPlugin({
      filename: "css/[name].[hash].css",
    }),
    // 复制
    new CopyWebpackPlugin(
        {
          patterns: [
            {
              // 定义要拷贝的源目录
              from: utils.join("../static"),
              // 定义要拷贝到的目标目录
              to: utils.join("../dist/static")
            },
          ]
        }
    ),
    // 过滤没有用到的css代码或js代码
    new PurgeCSSPlugin({
      paths: glob.sync(utils.join("../src/views/*/*"))
    }),
    // 进度条
    new ProgressBarPlugin(),


  ]
}
