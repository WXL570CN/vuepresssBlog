---
title: Notes---NodeJs_review
date: 2019-11-27 09:14:50
categories:
- [Notes]
tags:
- Node.js
---

## 一、简单的说 Node.js 就是运行在服务端的 JavaScript。运行环境
### 阻塞/非阻塞I/O 
阻塞I/O：进程遇到I/O，则休眠等其执行完，再进行下一步  
非阻塞I/O：进程不等待I/O完成，I/O时函数立即返回


## 二、没有DOM和BOM（没有html结构）

## 三、读写
#### 首先需要引入fs（filesystem，文件系统）这个核心模块，其提供了读取文件相关的API  
`var fs = require('fs')`  
#### 读取文件  
`fs.writeFile('文件路径',回调函数)`
回调函数`function(error,data)`  
#### 写文件  
`fs.readFile('文件路径','文件内容',function(error){})`  
#### 读取文件目录  
`fs.readdir('目录路径',function(err,files){})`  
`files是一个数组`  
#### stats 获取文件信息  
- 常用方法  
  isFile()  
  isDirectory()
- 其他方法可打印stats查看
#### rename 重命名
`fs.rename(oldfilename,newfilename,function)`
#### unlink 删除文件
`fs.unlink(url,function)`
#### readdir 读文件夹
`fs.readdir(url,(err,files) => {})`  
`其中files为文件名组成的数组`
#### mkdir 创建文件夹
`fs.mkdir(url,function)`
#### remove 删除文件夹
`fs.remove(url,function)`
#### watch 监听文件变化
`fs.watch(url,object,(变化类型，文件名) => {})`
- object  
  persistent < boolean> 指示如果文件已正被监视，进程是否应继续运行。默认值: true。  
  recursive < boolean> 指示应该监视所有子目录，还是仅监视当前目录。这适用于监视目录时，并且仅适用于受支持的平台（参阅注意。默认:false。  
  encoding < string> 指定用于传给监听器的文件名的字符编码。默认值: 'utf8'。  
- listener < Function> | < undefined> 默认值: undefined，该函数有两个参数：  
  eventType < string>  eventType 是 'rename' 或 'change'， filename 是触发事件的文件的名称。  
  filename < string> | < Buffer>  
  

## 四、构建web服务器
引入http模块  
`var http = require('http')`  
创建web服务器  
`var server = http.createServer()`   
回调处理(用户发起请求，会触发require请求事件，然后执行第二个参数)  
```
server.on('request',function(request,response){
    console.log(response.url)
})
```
绑定端口号，启动服务器  
`server.listen(端口号,function(){})`

## 五、在每个文件模块中都提供了一个对象export

## 六、采用无分号风格时需注意，当以( [ ` 开头时，须在前面加分号;

## 七、require特性
模块被加载的时候会执行，加载后缓存（即不再重新执行，而是直接调用缓存）  
一旦某个模块被循环加载，就只输出已执行的部分，还未执行的部分不会输出

## 八、global设置全局变量

## 九、path
- normalize：规范化给定的 path，解析 '..' 和 '.' 片段。  
  当找到多个连续的路径段分隔字符时（例如 POSIX 上的 /、Windows 上的 \ 或 /），则它们将被替换为单个平台特定的路径段分隔符（POSIX 上的 /、Windows 上的 \）。 尾部的分隔符会保留。  
  path.normalize(path)  
    path.normalize('C:\\temp\\\\foo\\bar\\..\\');  
    // 返回: 'C:\\temp\\foo\\'  
- join：用平台特定的分隔符作为定界符将所有给定的 path 片段连接在一起，然后规范化生成的路径。  
  path.join([...paths])  
    ```js
    path.join('/foo', 'bar', 'baz/asdf', 'quux', '..');  
    // 返回: '/foo/bar/baz/asdf'
    path.join('foo', {}, 'bar');
    // 抛出 'TypeError: Path must be a string. Received {}'
    ```
- resolve：将路径或路径片段的序列解析为绝对路径。将相对路径解析为绝对路径，如将./解析为当前文件夹在整个磁盘中的目录  
  如果在处理完所有给定的 path 片段之后还未生成绝对路径，则再加上当前工作目录。  
  生成的路径已规范化，并且除非将路径解析为根目录，否则将删除尾部斜杠。  
  零长度的 path 片段会被忽略。  
  如果没有传入 path 片段，则 path.resolve() 将返回当前工作目录的绝对路径。  
  path.resolve([...paths])  
- basename：返回 path 的最后一部分,尾部的目录分隔符将被忽略  
  path.basename(path[, ext])  
    ```js
    path.basename('/foo/bar/baz/asdf/quux.html', '.html');
    // 返回: 'quux'
    ```
- extname：返回 path 的扩展名，从最后一次出现 .（句点）字符到 path 最后一部分的字符串结束
    
- path.extname(path)  
```js
path.extname('index.html');
// 返回: '.html'
path.extname('index.coffee.md');
// 返回: '.md'
path.extname('index.');
// 返回: '.'
path.extname('index');
// 返回: ''
path.extname('.index');
// 返回: ''
path.extname('.index.md');
// 返回: '.md'
```
- dirname：返回 path 的目录名,尾部的目录分隔符将被忽略  
  path.dirname(path)  
    ```js
    path.dirname('/foo/bar/baz/asdf/quux');
    // 返回: '/foo/bar/baz/asdf'
    ```
- parse：返回一个对象，其属性表示 path 的重要元素。 尾部的目录分隔符将被忽略  返回的对象有一下属性
  dir < string>  
  root < string>  
  base < string>  
  name < string>  
  ext < string>  
  ```
  │          dir        │    base    │
  ├──────┬              ├──────┬─────┤
  │ root │              │ name │ ext │
  " C:\      path\dir   \ file  .txt "
  ```
- format：从对象返回路径字符串，与 path.parse() 相反。  
  对象中的属性可以是：  
    dir < string>
    root < string>
    base < string>
    name < string>
    ext < string>
  当为 pathObject 提供属性时，注意以下组合，其中一些属性优先于另一些属性：  
  如果提供了 pathObject.dir，则忽略 pathObject.root。  
  如果 pathObject.base 存在，则忽略 pathObject.ext 和 pathObject.name。  
  path.format(pathObject)  
  ```js
  path.format({
      dir: 'C:\\path\\dir',
      base: 'file.txt'
  });
  // 返回: 'C:\\path\\dir\\file.txt'
  ```
- __dirname：总是返回文件夹的绝对路径（在磁盘中的路径）  
- process.cwd()：总是返回执行node命令时的文件路径  
- ./ 之类的相对路径在require中总是相对于当前文件所在的文件夹，在其他地方则和process.cwd()一样取决于node命令执行的地方

## 十、导入模块
const {normalize} = require('path')  
相当于 const normalize = require('path').normalize


## 十一、buffer
用于处理二进制数据流  
实例类似数组，大小固定  
是一个全局变量  

## 十二、supervisor js文件
自动重启插件


## 十三、项目初始化
.gitignore文件  
  设置上传Git仓库需要忽略的文件  
    *任意  
    **任意级目录  
    ！不忽略  
.npmignore文件  
  模块上传到npm时需要忽略的目录  
.editorConfig文件  
  定义代码风格  
  ```js
  root = true // 告知当前是根目录，不用再往上找了  
  indent_space = space  
  indent_size = 4  
  [*]所有文件都匹配  
  end_of_line = lf    // unix回车风格（lf）或者Windows回车风格  
  insert_final_newline = true     // 文件最后一行要有回车  
  [*.{js,py}]     // {}或的意思  
  charset = utf-8     // 使用编码格式  
  ```
    
## 十四、模板引擎
handlebars

## 十五、Content-Encoding和Accept-Encoding
浏览器告知服务器支持的压缩格式
服务器返回使用的压缩格式
压缩利于优化性能

## 十六、缓存
浏览器向服务器发送请求之前,会在本地缓存中查看是否有缓存,如果有缓存并且缓存未失效,则调用缓存  
否则向服务器发送请求  
服务器协商缓存并返回请求,并规定缓存失效时间,在该时间内,返回的请求都不会改变  
浏览器拿到请求之后会将其缓存到本地,在下次发送同样请求时,会先用本地缓存  
但也不是直接用,需要先通过Header 中的 Cache-Contrl 检查缓存是否失效  


## 十七、当项目要上传，而项目中有空目录时，可以在该目录中放一个.gitkeeper文件

## 十八、爬虫
解决懒加载一次加载太少问题  
  不停滚动浏览器  
  让浏览器窗口变大（不能设置无限大，否则会触发发爬虫规则）  

## 十九、包管理
yarn == cnpm 较之npm更快

### 发布包
切到国外  
nrm use npm   
入口文件，做整合用  
注册账号  
    npm addUser  
    新用户需要校验邮箱（真实邮箱）  
npm publish  

引入第三方模块不需要 ./ 的形式，只需要引入包名就行
