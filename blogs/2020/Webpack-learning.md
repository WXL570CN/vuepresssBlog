---
title: Notes---Webpack_learning
date: 2020-05-27 09:14:50
categories:
- Webpack
tags:
- Webpack
---

## 开始
`npm install webpack webpack-cli --save-dev`

## 功能
将ES6等代码编译成浏览器能识别的代码
## 注意
webpack能处理js/json，但不能处理css/img等

## 编译环境
开发环境打包
```
webpack ./src/index.js -o ./build --mode=development
```
生产环境（打包后的代码是压缩的）
```
webpack ./src/index.js -o ./build --mode=production
```
配置了webpack.config.js之后，可以直接用 `webpack`进行打包

## webpack.config.js
webpack配置文件  
当一种文件同时被多个 loader 处理时，需要声明 loader 的执行顺序  
所有构建工具都是基于`nodejs平台`运行的，模块化默认采用`commonjs`
即：
```js
// loader: 1. 下载  2. 使用（配置loader）
// plugin: 1. 下载  2. 引用 3. 使用

const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  // 入口
  entry: './src/index.js',
  // 输出
  output:{
    // 输出文件名
    filename: 'main.js',
    // 输出路径
    // __dirname代表当前文件所在的目录绝对路径
    path: resolve(__dirname, 'build')
  },
  // loader的配置
  module:{
    rules: [
      // 不同文件必须配置不同loader处理
      {
        // 匹配哪些文件，正则
        test: /\.css$/,
        // 使用哪些loader进行处理
        use: [
          // 创建style标签，将js中的样式资源插入到head中
          // 'style-loader',
          // 提取css插件需要引入该loader，但同时也需要关闭style-loader
          MiniCssExtractPlugin.loader,
          // 会将css文件变成commonjs模块加载到js中 ，里面内容是样式字符串
          'css-loader'
          // 即执行顺序为 css-loader，再 style-loader
        ]
      },
      {
        test: /\.less$/,
        use:[
          // 'style-loader',
          MiniCssExtractPlugin.loader,
          'css-loader',
          // 将less解析为css，需要下载两个包 npm i less-loader css-loader -D
          'less-loader'
        ]
      },
      {
        // 缺点：处理不了html中引入的图片
        test: /\.(png|jpg|jpeg|gif)$/,
        // 需要下载两个包 npm i url-loader file-loader -D
        loader: 'url-loader',
        options: {
          // 图片小于 8k 时会被base64处理
          // 优点： 减少请求数量
          // 缺点：图片体积会更大
          limit: 8 * 1024,
          // 由于url-loader 默认使用es6模块化解析，而html-loader引入图片是commonjs。
          // 解析时会出错
          // 解决：关闭url-loader的es6解析
          // 当然，没有使用html-loader就不需要这个命令了
          esModule: false,
          // 给图片重命名,使其名字不至于太长
          // [hash:10]：取hash值得前十位
          // [ext]：取图片的原扩展名
          name: '[hash:10].[ext],
          // 设置输出到 build 中的目录
          outputPath: 'img'
        }
      },
      {
        // 处理 html中引入的图片，webpack5.x中不需要引入该 loader 也能处理html中的图片，  
        // 这应该是webpack5.x解决了该问题
        test: /\.html/,
        loader: 'html-loader'
      },
      // 打包其他资源（除html/js/css资源以外的其他资源），如字体文件
      {
        exclude: /\.(html|js|css)$/,
        loader: 'file-loader',
        options:{
          outputPath: 'media'
        }
      }
    ],
  },
  plugins:[
    // 创建一个空的html，并引入打包后的所有资源如css/js
    // new HtmlWebpackPlugin()
    // 想要有结构的Html，则需要配置
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new MiniCssExtractPlugin({
      filename: 'style/built.css'
    })
  ],
  mode: 'development',
  // mode: 'production',
  // 自动编译
  // 只会在内存中编译打包，而不会有本地输出
  // 使用：npm i webpack-dev-server -D
  devServer:{
    contentBase: resolve(__dirname, 'build'),
    // 启动gzip压缩，让代码体积更小，压缩更快
    compress: true,
    port: 3000,
    // 开启HMR功能，但仅限于样式文件，且会导致html文件不能热更新
    hot: true
  }
}
```

## mini-css-extract-plugin
将打包后js中的的css代码提取成单独的文件，使用该插件需要将style-loader关掉，即取消引入style
`npm install mini-css-extract-plugin -D`
```js
// 一、引入
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

// 二、使用
new MiniCssExtractPlugin({
  // 设置输出文件名
  filename: 'style/built.css'
})

// 三、配置loader
// 取消style-loader的使用，添加loader
{
  test: /\.less$/,
  use:[
    // 'style-loader',
    MiniCssExtractPlugin.loader,
    'css-loader',
    // 将less解析为css，需要下载两个包 npm i less-loader css-loader -D
    'less-loader'
  ]
},
```

## CSS处理

### 兼容性处理
`npm install postcss-loader postcss-preset-env -D`
```js
// 一、loader使用
// 作用：帮 postcss 找到 package.json 中 browserslist 里面的配置，通过配置加载指定的css兼容性样式
{
  loader: 'postcss-loader',
  options: {
    ident: 'postcss',
    plugins: () => [
      require('postcss-preset-env')()
    ]
  }
}
// 二、browserslist：更多配置可以 GitHub搜 browserslist
"browserslist": {
  "development": [
    // 兼容chrome最近版本
    "last 1 chrome version",
    "last 1 firefox version",
    "last 1 safari version"
  ],
  "production": [
    // 市面上百分之99.8的浏览器兼容
    ">0.2%",
    // 不要已经over的浏览器
    "not dead",
    // 不要op_mini浏览器
    "not op_mini all"
  ]
}

// 三、默认是生产环境，如果要在开发环境中测试，则需要在外层设置node环境变量
process.env.NODE_ENV = 'development'

```

### 压缩处理


## js处理
### ESLint 语法检查
`npm i eslint-loader eslint eslint-config-airbnb-base eslint-plugin-import -D`
```js
// 一、使用
rules:[
  {
    test: '/\.js$/',
    // 排除第三方库的语法检查
    exclude: /node_modules/,
    loader: 'eslint-loader',
    options: {
      // 自动修复
      fix: true
    }
  }
]
// 二、配置
// package.json
// 用到的是 airbnb 的配置（基本配置，只有对js语法的检查）
"eslintConfig": {
  "extends": "airbnb-base"
}
```

### 兼容性处理
```
npm i babel-loader @babel/core @babel/preset-env -D
``` 
其中 `@babel/preset-env` 只能处理基本的js语法，不能处理promise等语法  
解决方案：
1. 方案一：`@babel/polyfill`，处理全部js语法兼容 
> `@babel/polyfill`不需要做其他配置，在需要做兼容性处理的js文件中引入即可  
> 问题：体积太大
```js
npm i @babel/polyfill -D
```
```js
import '@babel/polyfill'
```
2. 方案二： `core-js`，按需加载
```js
npm install core-js -D
```
```js
{
  test: /\.js$/,
  exclude: /node_modules/,
  loader: 'babel-loader',
  options: {
    presets: [
      [
        '@babel/preset-env',
        {
          // 按需加载
          useBuiltIns: 'usage',
          corejs: {
            version: 3
          },
          targets: {
            chrome: '60',
            firefox: '60',
            ie: '9',
            safari: '10'
          }
        }
      ]
    ]
  }
}

```

### 压缩处理
将环境改为生产环境（production）即可

## HTML压缩
HtmlWebpackPlugin插件配置添加 minify配置 即可
```js
minify:{
  // 去除空格
  collapseWhitespace: true
  // 移除注释
  removeComments: true
}
```

## js处理

## 性能优化
### 开发环境性能优化
1. 代码构建速度优化
2. 调试功能优化

### 生产环境性能优化
1. 代码打包构建速度优化
2. 代码运行性能优化

### HMR 功能
> 热模块替换：一个模块发生变化，只会重新打包更新该模块而不会更新整个页面
  
可以在`DevServer`配置中添加：`hot: true`开启HMR功能
js文件：默认不能使用HMR功能  
如何开启？  
在js文件中添加：
```js
if(module.hot){
  module.hot.accept('./js文件名.js', function() {
    从该js文件引入的方法名()
  })
}
```
HTML文件：不用做HMR功能，因为使用时HTML文件只有一个  
但如果开启了HMR功能，会导致HTML热更新失效  
解决办法：将HTML文件添加到entry中

### source-map 功能
> 一种提供源代码到构建后代码映射技术 (如果构建后代码出错了,通过映射可以追踪源代码错误)
开启
在webpack.config.js中添加配置：`devtool: 'source-map'`


