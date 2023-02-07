---
title: Notes---Webpack_learning
date: 2019-05-27 09:14:50
categories:
- Webpack
tags:
- Webpack
---

> 功能：将ES6等代码编译成浏览器能识别的代码
> 注意：webpack能处理js/json，但不能处理css/img等

## 一、开始
`npm install webpack webpack-cli --save-dev`

## 二、编译环境
开发环境打包
```
webpack ./src/index.js -o ./build --mode=development
```
生产环境（打包后的代码是压缩的）
```
webpack ./src/index.js -o ./build --mode=production
```
配置了webpack.config.js之后，可以直接用 `webpack`进行打包

## 三、webpack.config.js
webpack配置文件  
所有构建工具都是基于`nodejs平台`运行的，模块化默认采用`commonjs`  
基本配置(webpack的五个核心基本概念)：  
### entry
入口文件  
1. string --> `'入口文件路径'`  
单入口  
打包形成一个chunk,输出一个bundle文件。  
此时chunk的名称默认是main  
2. array --> `['入口文件1路径', '入口文件2路径']`  
多入口  
所有入口文件最终只会形成一个chunk,输出出去只有一个bundle文件。  
-->只有在HMR功能中让html热更新生效  
3. object --> `{ key（输出文件名）: string（入口文件路径） }`  
多入口  
有几个入口文件就形成几个chunk,输出几个bundle文件。  
此时chunk的名称是key  
### output：
输出文件
```js
{
  filename: '',
  path: ,
  publicPath: '/',  // 设置公共资源路径前缀
  chunkFilename: 'js/[name]_chunk.js', // 设置非入口chunk的名称
  // library一般配合dll使用
  // library: '[name]'  // 让打包后的内容可以全局使用（即库向外暴露的变量名）
  // libraryTarget: 'window'  // 将打包后并暴露到全局的内容挂载到window
  // libraryTarget: 'global'
  // libraryTarget: 'commonjs'
}
```
3. loaders：
让webpack能够处理非js文件  
当一种文件同时被多个 loader 处理时，需要声明 loader 的执行顺序  
4. plugins：
可以执行范围更广的任务
5. mode：
配置环境

## 四、CSS处理
### 1、抽成单独文件
`npm install mini-css-extract-plugin -D`
> 既然将 css 代码提取成了单独文件，那么 style 引入自然也不需要了，所以要取消 style-loader 的使用
```js
// 一、引入
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

// 二、使用
new MiniCssExtractPlugin({
  // 设置输出文件名
  filename: 'style/built.css'
})

// 三、配置loader
{
  test: /\.less$/,
  use:[
    // 取消style-loader的使用
    // 'style-loader',
    MiniCssExtractPlugin.loader,
    'css-loader',
    // 将less解析为css，需要下载两个包 npm i less-loader css-loader -D
    'less-loader'
  ]
},
```


### 2、兼容性处理
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

### 3、压缩处理
`npm i optimize-css-assets-webpack-plugin -D`
```js
// 引入
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')

// 使用
plugins[
  new OptimizeCssAssetsWebpackPlugin()
]
```

## 五、JS处理
### 1、ESLint 语法检查
`npm i eslint eslint-loader eslint-config-airbnb-base eslint-plugin-import -D`
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

### 2、兼容性处理
```
npm i babel-loader @babel/core @babel/preset-env -D
``` 
其中 `@babel/preset-env` 只能处理基本的js语法，不能处理promise等语法  
解决方案：
1. 方案一：`@babel/polyfill`，处理全部js语法兼容   
`npm i @babel/polyfill -D`

> `@babel/polyfill`不需要做其他配置，在需要做兼容性处理的js文件中引入即可  
> 问题：体积太大  

```js
// 使用：引入即用
import '@babel/polyfill'
```
2. 方案二： `core-js`，按需加载  
`npm install core-js -D`
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

### 3、压缩处理
将环境改为生产环境（production）即可

## 六、HTML
### 1、基本配置
`npm i html-webpack-plugin -D`
```js
plugins: [
  new HtmlWebpackPlugin({
    // 设置 webpack 的生成HTML文件依赖
    template: './src/index.html',
    // 设置压缩属性
    minify: {},
    // 设置元信息
    meta：{}, 
  }),
]
```
### 2、压缩
HtmlWebpackPlugin插件配置添加 minify配置 即可
```js
minify:{
  // 去除空格
  collapseWhitespace: true
  // 移除注释
  removeComments: true
}
```

## 七、性能优化
### 1、开发环境性能优化
1. 代码构建速度优化
HMR：热模块替换  
样式文件：可以使用`HMR`功能，因为`style-loader`内部实现了  
`HMR`
2. 调试功能优化   
`source-map `
### 2、生产环境性能优化
1. 代码打包构建速度优化  
`oneOf | babel缓存 | 多进程打包 | externals | dll`
2. 代码运行性能优化  
`缓存 | tree shaking | code split | 懒加载/预加载 | pwa`

### 3、HMR 功能
> hot module replacement
> 热模块替换：一个模块发生变化，只会重新打包更新该模块而不会更新整个页面
> 代码构建速度优化
#### 开启HMR
```js
// 开启HMR功能
devServer: {
  hot: true
}
```

#### 样式文件
不需要，因为style-loader已经实现了该功能
#### js文件  
默认不能使用`HMR`，解决方案：在js文件中添加配置  
```js
if(module.hot){
  module.hot.accept('./a.js', function() {
    // 该方法会监听a.js文件，一旦a.js文件发生变化，则执行这后面的逻辑代码
    ...
  })
}
```
> 也就是说，无法对入口文件做HMR功能，只能对入口文件中的依赖做HMR功能
#### html文件  
不需要使用HMR，因为通常来说html是单独使用的  
> 开启了HMR功能时，会导致html文件热更新失效
> 解决方案：将html文件加入到入口文件配置中

### 4、oneOf（代码构建速度优化）
将一系列的rules放在oneOf数组中，使得各类文件在匹配loader时，匹配成功则不再往后匹配，减少匹配loader次数
> oneOf中不能出现两个处理同一类型的loader
> 解决方案：将多余的loader提取到oneOf外面（最好是优先执行的loader）
```js
rules: [
  {}
  ...
  oneOf: [],
]
```
### 5、source-map 功能（调试功能优化）
> 一种提供源代码到构建后代码映射技术 (如果构建后代码出错了,通过映射可以追踪源代码错误)  

简言之：对后期代码错误溯源，精准到哪行代码出了错  

开启：  

在webpack.config.js中添加配置：`devtool: 'source-map'`

devtoll配置：
>（内联和外部的区别  1：外部生成了文件，内联没有；2：内联构建速度更快，但体积大）

```js
source-map
// 外部
// 错误代码准确信息和源代码的错误位置
inline-source-map
// 内联
// 只生成一个内联source-map
// 错误代码准确信息和源代码的错误位置
hidden-source-map
// 外部
// 错误代码错误原因,但是没有错误位置不能追踪源代码错误,只能提示到构建后代码的错误位置
eval-source-map
// 内联
// 每一个文件都生成对应的source-map,都在eval错误代码准确信息和源代码的错误位置
nosources-source-map
// 外部
// 错误代码准确信息,但是没有任何源代码信息
cheap-source-map
// 外部
// 错误代码准确信息和源代码的错误位置只能精确的行
cheap-module-source-map
// 外部
// 错误代码准确信息和源代码的错误位置
```
开发环境需求：速度快，调试更友好  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;速度：eval > inline > cheap > ...  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;调试：source-map > cheap-module-souce-map > cheap-source-map  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;综合 ===> eval-source-map || eval-cheap-module-souce-map  

生产环境需求：源代码隐藏？调试友好？  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;nosources-source-map  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;hidden-source-map  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;综合 ===> source-map || cheap-module-souce-map  




### 6、缓存
#### babel缓存  
开启`babel-loader`的缓存
```js
{
  loader: 'babel-loader',
  options: {
    cacheDirectory: true
  }
}
```
#### 7、文件资源缓存  
hash：每次wepack构建时会生成一个唯一的hash值。  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;问题：因为js和css同时使用一个hash值。如果重新打包,会导致所有缓存失效。(可能我只改动一个文件)  
chunkhash：根据chunk（代码块，随着一个文件同时被引入的其他文件统称为一个chunk）生成的hash值。如果打包来源于同一个chunk，那么hash值就一样  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;问题: js和css的hash值还是一样的，因为css是在js中被引入的，所以同属于一个  
chunkcontenthash：根据文件的内容生成hash值。不同文件hash值一定不一样  
即给输出文件名添加hash值，使得变化的文件hash值发生改变，而未变化的文件hash值也不会发生改变。

### 8、tree shaking
取出无用代码（理解：字面意思，树摇，摇晃一棵树，去除枯萎的叶子（无用代码））   
> 前提：必须使用ES6模块化；开启production环境  
在package.json中配置
```json
// 所有代码都没有副作用，即都可以进行tree shaking
"sideEffects": false,
// 问题：可能会因为webpack版本问题，会把一些未引入但又必须的文件去除
"sideEffects": ["*.css", "*.less"],
```

### 9、code split
代码分割  
一：entry设置为多路口  
> 问题：配置繁琐
```js
entry: {
  main: './src/index.js',
  test: './src/test.js',
},
output: {
  filename: 'js/[name].[contenthash:10].js',
}
```
二：`webpack.config.js`配置optimization
> 可以将node_modules中的代码单独打包成一个chunk输出
> 自动分析多个入口chunk中，有没有公用的文件（偏大的文件），如果有的话则将其打包成单独的一个chunk
```js
optimization: {
  splitChunks: {
    chunks: 'all'
  }
}
```

三：通过js代码方式，让某个文件单独打包成一个chunk
```js
// ES10语法
// 下面的注释为设置打包后文件名
import (/* webpackChunkName: 'test' */'a.js')
  .then((result)=>{
    console.log('文件加载成功')
    console.log(result)
  })
  .catch(()=>{
    console.log('文件加载失败')
  })
```

### 10、懒加载和预加载
#### 懒加载
```js
// 执行到这才加载 a.js 文件，加载完成会缓存
import (/* webpackChunkName: 'test' */'a.js')
  .then((result)=>{
    console.log('文件加载成功')
    console.log(result)
  })
  .catch(()=>{
    console.log('文件加载失败')
  })
```
#### 预加载
在魔法注释里加上`webpackPrefetch: true`  
空闲加载：不会堵塞其他资源加载
```js
import (/* webpackChunkName: 'test', webpackPrefetch: true */'a.js')
  .then((result)=>{
    console.log('文件加载成功')
    console.log(result)
  })
  .catch(()=>{
    console.log('文件加载失败')
  })
```

### 11、PWA
渐进式网络开发应用程序（离线可访问）

### 12、多进程打包
`npm i thread-loader -D`
和babel一起使用  
```js
loader: [
  {
    test: /\.js$/,
    use: [
      // 开启多进程打包，进程启动大概600ms
      {
        loader: 'thread-loader',
        options: {
          workers: 2 // 进程2个
        }
      },
      {
        loader: 'babel-loader',
        ...
      }
    ]
  }
]
```

### 13、externals
杜绝第三方库被打包进js文件
`webpack.config.js`
```js
externals: {
  // 库名: 包名
  jquery: 'jQuery'
}
```

### 14、dll
对某些库单独进行打包  
新建文件`webpack.dll.js`
```js
const resolve= require ('path')
const webpack require('webpack')
// 当你运行 webpack 时,默认查找 webpack.config.js 配置文作
// 需求：需要运行 webpack.d1l.js文件 
// 解决：webpack--config webpack.d1l.js
// 运行该命令会再目录下生成dll文件夹，里面会有jquery.js、manifest.json
module.exports = {
  entry: {
    // 最终打包生成的[name]--> jquery
    // ['jquery"]-->要打包的库是jquery
    jquery: ['jquery'],
  },
  output: {
    filename: '[name].js', 
    path: resolve( dirname, 'dll'),
    library: '[name]_[hash]', //打包的库里面向外暴露出去的内容叫什么名字
  },
  plugins: [
    new webpack.DllPlugin({
      name: '[name]_[hash]',
      path: resolve(__dirname, 'dll/manifest.json')
    })
  ]
}
```
在`webpack.config.js`中配置  
`npm i add-assets-html-webpack-plugin -D`
```js
const webpack = require('webpack')
const AddAssetsHtmlWebpackPlugin = require('add-assets-html-webpack-plugin')


plugins: [
  // 告诉webpack哪些库不需要打包，同时使用的名称也需要变
  new webpack.DllReferencePlugin({
    manifest: resolve(__dirname, 'dll/manifest.json')
  })
  new AddAssetsHtmlWebpackPlugin({
    filepath: resolve(__dirname, 'dll/jquery.js')
  })
]
```



## 八、最终 `webpack.config.js` 配置：
```js
// loader: 1. 下载  2. 使用（配置loader）
// plugin: 1. 下载  2. 引用 3. 使用

const { resolve } = require('path')
// 设置index.html
const HtmlWebpackPlugin = require('html-webpack-plugin')
// 抽取css代码为单独文件
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
      template: './src/index.html',
      // 设置压缩属性
      minify: {
        // 去除空格
        collapseWhitespace: true
        // 移除注释
        removeComments: true
      },
      // 设置元信息
      meta：{}, 
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

## modules
```js
{
  rules: [
    {
      test: '',  // 匹配规则
      use: '',  // 使用loader
    },
    {
      test: '',
      exclude: '',  // 排除文件
      include: '',
      enforce: 'pre',  // 优先执行，不需要优先执行则不添加 延后执行：post
      loader: '',
      options: {}
    }
  ]
}
```

## resolve
解析模块的规则
```js
resolve: {
  // 配置别名
  alia: {
    $css: resolve(__dirname, 'src/css'),
    $js: resolve(__dirname, 'src/js'),
    $api: resolve(__dirname, 'src/api'),
    ...
  }, 
  // 配置省略文件的后缀名
  extensions: ['.js', '.json'],
  // 告诉 webpack 解析模块应该去什么目录，不用一层一层找
  modules: [resolve(__dirname, '../../node_modules'), 'node_modules']
}
```

## devServer
用于开发环境
```js
devServer: {
  // 运行代码的目录
  contentBase: resove(__dirname, 'build'),
  // 监听文件变化，变化则重载
  watchContentBase: true,
  watchOptions: {
    // 忽略监听文件
    ignored: 'node_modules'
  },
  // 启动gzip压缩
  compress: 'gzip',
  // 端口号
  port: '',
  // 域名
  host: '',
  // 自动打开浏览器
  open: true,
  // 开启HMR功能
  hot: true,
  // 取消启动服务器日志
  clientLogLevel: 'none'
  // 除了基本启动信息外，其他都不显示
  quiet: true,
  // 出错不要全屏提示
  overlay: false,
  // 服务器代理，解决开发环境跨域问题
  proxy: {
    '/api': {
      target: 'htpp://localhost:3000',
      // 发送请求时,请求路重写:将/api/xxx--> /xxx (去掉/api)
      pathRewrite: {
        '^/api': ''
      }
    }
  }
}
```

## optimization
```js
optimization: {
  splitChunks: {
    chunks: all',
    // 以下为默认值，一般不修改
    // minsize: 30 * 1024,  // 分割的chunk最小为30kb
    // maxsiza: 0,  // 最大没有限制
    // minChunks: 1,  // 要提取的chunk最少被引用1次
    // maxAsyncRequests: 5,  // 按需加载时并行加载的文件的最大数量
    // maxInitialRequests: 3,  // 入口js文件最大并行请求数量
    // automaticNameDelimiter: '~',  // 名称连接符
    // name: true,  // 可以使用命名规则
    // cacheGroups: {  //分割chunk的组
    //   // node_modules文件会被打包到vendors组的chunk中。--> vendors~xxx.js
    //   // 满足上面的公共规则,如:大小超过30kb,至少被引用一次。
    //   vendors: {
    //     test: /[\\/]node_modules[\V/]/,
    //     // 优先级
    //     priority: -10
    //   },
    //   default: {
    //     minChunks: 2,
    //     priority: -20,
    //     // 对于同一模块，复用模块而不会再次打包
    //     reuseExistingChunk: true
    //   }
    // }
  },
  // 将当前模块的记录其他模块的hash单独打包为一个文件runtime
  // 作用：修改a文件导致b文件的contenthash变化
  runtimeChunk:{
    name: entrypoint => `runtime-${entrypoint.name}`
  },
  minimizer: {
    // 配置生产环境的压缩方案：js、css
    // npm i terser-webpack-plugin -D
    new TerserWebpackPlugin({
      // 开启缓存
      cache: true,
      // 开启多进程打包
      parallel: true,
      // 启动source-map
      sourceMap: true
    })
  }
}
```



