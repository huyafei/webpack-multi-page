const fs = require("fs");
const path = require('path');
const program = require('commander');
console.log(process.argv)
//获取名称
let name=program.parse(process.argv).args[0]
const baseDir = path.join(__dirname, "../src/views/");

if (!name) {
  console.log("请输入页面名称");
  return;
}
let hasPage = fs.existsSync(baseDir + name);
if (hasPage == true) {
  console.log("该页面已经存在");
  return;
}
try {
  fs.mkdirSync(baseDir + name);
  console.log(name+'目录创建成功');
} catch (error) {
  console.log('创建目录失败',error);
}

try {
  fs.writeFileSync(baseDir + name+"/index.html", `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>

</body>
</html>`);
  console.log('index.html创建成功');
} catch (error) {
  console.log('创建index.html失败');
}
try {
  fs.writeFileSync(baseDir + name+"/index.js", "import './index.css';");
  console.log('index.js创建成功');
} catch (error) {
  console.log('创建index.js失败');
}

try {
  fs.writeFileSync(baseDir + name+"/index.css", "");
  console.log('index.css创建成功');
} catch (error) {
  console.log('创建index.css失败');
}


