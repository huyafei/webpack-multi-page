# webpack-multi-page

```text
基于webpack5多页面自动化构建html、css、js
```

## 使用

### 安装

```shell
npm install
```

### 运行

```shell
npm run dev
```

### 打包

```shell
npm run build
```

### 创建页面

```shell
npm run create *
```

## 说明

```text
npm run create * 创建页面，会在views下新建当前创建的目录名，在该目录名下自动生成 index.html、index.js、index.css这三个文件
```

## 注意

* webpack中只配置了查找一层入口文件index.js和模板index.html
* 不要使用link引入样式表，应在index.js入口中引入css，否则无效
* 不要使用script引入js，应在index.js入口中引入js，否则无效
* 行内（内联）样式、内部样式无效

