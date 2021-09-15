## webpack-multi-page
```text
基于webpack5多页面自动化构建html、css、js
```
## 使用
### 安装
```shell
yarn install
```
### 运行
```shell
yarn run dev
```
### 打包
```shell
yarn run build
```
### 创建页面
```shell
yarn run create *
```
## 说明
```text
使用yarn run create * 创建页面，会在views下新建当前创建的目录名，在该目录名下自动生成index.html、index.js、index.css这三个文件
```
## 注意
* 页面层级不可嵌套
* background样式不能写在内联和style标签内，否则无效
* 不要使用link引入样式表，应在index.js入口中引入css，否则无效

