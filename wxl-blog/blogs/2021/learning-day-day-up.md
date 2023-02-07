---
title: 面试长谈
date: 2021-07-28 09:18:55
categories:
- [面试]
tags:
- 面试
- Notes
- SPA
- SSR
---
## 一、HTML5
### 1、脚本的加载
script脚本会阻塞html的解析
但多个script脚本的加载是并行的（同时）：因为实际上现代浏览器会对资源进行预解析，提前把html中要引用到的资源放进请求队列中。

### 2、async 和 defer 的区别
```
<script async></script>
<script defer></script>
```
#### 相同点
加上两者的 script 脚本都不会阻塞html的解析

#### 不同点：
async：脚本加载过程中html同时在解析，脚本加载完成后立刻开始执行会阻塞html解析
defer：html解析过程中遇到脚本，两者同时解析，html解析完成后开始脚本的执行

### 3、DOMContentLoaded和Load的区别
#### DOMContentLoaded
当初始的 HTML 文档被完全加载和解析完成之后，DOMContentLoaded 事件被触发，而无需等待样式表、图像和子框架的完成加载。
#### Load
样式表、图像和子框架的完成加载， load 事件被触发。

### 4、href和src的区别
#### href
用于在当前文档和指定资源间确定联系
#### src
下载资源并替换当前内容

### 5、link和@import的区别
1. link是XHTML提供的标签，不仅仅可以加载CSS。@import是CSS提供的语法规则，只能加载CSS。
2. 加载页面时，link标签引入的 CSS 被同时加载；@import引入的 CSS 将在页面加载完毕后被加载。

### 6、Doctype
Doctype声明位于文档中的最前面，处于html标签之前。告知浏览器的解析器，用什么文档类型规范来解析这个文档

### 7、重定向
mata标签的http-equiv="refresh"属性用来告诉浏览器进行页面的跳转，content属性告知在多少秒后进行跳转，以及跳转的地址。此处为2s后重定向。
```
<meta http-equiv="refresh" content='2;https://messiahhh.github.io/blog'>
```
或者
```
// js
location.href = 'https://messiahhh.github.io/blog'
```
或者根据响应状态码跳转
```
res.statusCode = 301 // or 302
res.setHeader('Location', 'https://messiahhh.github.io/blog')
```

## 二、CSS3
### 1、选择器
1. 标签选择器 `div {}`
2. 属性选择器 `a[title='..'] {}`
2. id选择器
3. class选择器
4. 子代选择器 `ul>li {}`
5. 后代选择器 `body li {}`
6. 群组选择器 `h1,p`
7. 相邻兄弟选择器 `h1 + p {}`
8. 伪类选择器 `:hover`
```js
// first-child 和 first-of-type 的区别
p:first-child: 当父元素下的第一个元素为p元素时
p:first-of-type: 父元素下的第一个p元素
```

### 2、属性的权重
!important > 内联样式 > ID选择器 > class选择器 > 标签选择器 > 通配符（*） > 浏览器默认样式 > 继承样式

### 3、盒模型
#### box-sizing
`box-sizing: content-box `：浏览器默认，盒子宽度为 width（内容宽度） + padding + border
`box-sizing: border-box`：盒子宽度为width， 即 内容宽度 + padding + border

### 4、transition：过渡效果
`transition-property:` 过渡属性(默认值为all)
`transition-duration:` 过渡持续时间(默认值为0s)
`transiton-timing-function:` 过渡函数(默认值为ease函数)
`transition-delay:` 过渡延迟时间(默认值为0s)
注意：IE9-不支持该属性，safari3.1-6、IOS3.2-6.1、android2.1-4.3需要添加-webkit-前缀；而其余高版本浏览器支持标准写法

### 5、animation：动画效果
`animation-name` 动画名
`animation-duration` 持续时间
`animation-timing-function` 动画曲线
`animation-delay` 延迟
`animation-iteration-count` 播放次数
`animation-direction` 是否在下一周期逆向播放

### 6、元素分类
#### 行内元素
不独占一行；宽度(width)、高度(height)、内边距和外边距的 top/bottom 都不可改变，也就是说 padding 和 margin 的左右是可以改变的。
`a b br i span input select`
#### 块级元素
独占一行；宽度(width)、高度(height)、内边距(padding)和外边距(margin)都可控制;
`div p h1 h2 h3 h4 form ul`
#### 行内块元素
不独占一行；可以设置宽和高。
`<input> 、<img> 、<button> 、<texterea> 、<label>`

### 7、水平垂直居中
#### 适用于盒子宽高已知
##### 绝对定位 + margin-top/left + top/left
1水平垂直居中1.html
##### 绝对定位 + margin-top/left + calc()
2水平垂直居中2.html
##### 适用于盒子宽高未知
##### 绝对定位 + transform + top/left
3水平垂直居中3.html
##### 绝对定位 + margin: auto
4水平垂直居中4.html
##### flex布局 + margin: auto
5水平垂直居中5.html
##### flex布局
6水平垂直居中6.html
##### table布局
7水平垂直居中7.html

### 8、BFC
Block Formatting Contexts （块级格式化上下文)
它是一个独立的盒子，并且这个独立的盒子内部布局不受外界影响。
#### 何时会触发BFC：
1. 根元素< html>
2. float的值不为none。
3. position的值不为relative和static。
4. overflow的值为auto,scroll或hidden。
5. display的值为table-cell, table-caption, inline-block中的任何一个。
#### 作用
1. 清除浮动（阻止高度塌陷）。
2. 外边距合并：同属一个BFC的相邻元素会发生外边距（margin）重叠。
3. 阻止元素被浮动元素覆盖，可用来实现两列布局。

### 9、清除浮动
#### 浮动影响
在父元素未定义高度时，父元素高度会坍缩
#### 清除浮动方法
##### BFC清除浮动
##### 添加额外标签，应用 clear: both
在浮动的盒子后面添加一个空盒子，并给样式添加该属性
8清除浮动1.html
##### 使用伪元素 :after
上一种方法的优化，在浮动的盒子后面追加一个块元素
9清除浮动2.html

### 10、inline-block的间隙问题
两个被 display: inline-block 的元素放到一起会产生一段空白
因为这时两个元素之间的代码换行会被转换成空白符
#### 解决方法
将两个盒子代码写在同一行
10inline-block的间隙问题.html

### 11、display: none，visibility: hidden, opacity: 0 的区别
#### 结构上
1. display: none 会让目标元素不会被渲染进渲染树， 因此不占空间，而且不能点击。
2. visibility: hidden目标元素会被渲染进渲染树，因此占空间，但是不能点击。
3. opacity: 0目标元素会被渲染进渲染树，因此占空间，而且能点击。
#### 继承上
1. display: none 作用于父元素后，子元素也不会被渲染（即使给子元素加了display: block）
2. visibility: hidden作用于父元素后，子元素继承这个属性，也不可见；不过可以给子元素设置visibility: visible使其可见。
3. opacity: 0作用于父元素后，虽然子元素不会继承这个属性，但是子元素的透明度也会被影响，所以也不可见；而且不能通过给子元素设置opacity: 1使其变成不透明。
#### 性能上
1. display: none会造成回流/重绘，性能影响大
2. visibility: hidden会造成元素内部的重绘，性能影响相对小
3. opacity: 0 由于opacity属性启用了GPU加速，性能最好
#### opacity属性的补充
opacity是不继承属性，父元素设置opacity，子元素并不会继承。但是因为该属性的特殊性（类似background），父元素有了透明度，子元素的样式也会被影响。如果父元素设置opacity: 0.5，子元素设置opacity: 0.5，那么实际上子元素的透明度是0.5 * 0.5 = 0.25。
如果希望子元素不被父元素的透明度影响，我们可以使用background: rgba代替opacity: 0

### 12、文本溢出
11文本溢出问题.html
#### 单行文本溢出
```
overflow:hidden; （超出限定的宽度就隐藏内容）
white-space: nowrap; （设置文字在一行显示不能换行）
text-overflow: ellipsis; （规定当文本溢出时显示省略符号来代表被修剪的文本）
```
#### 多行文本溢出
```
overflow: hidden;
-webkit-line-clamp:2; （用来限制在一个块元素显示的文本的行数,2表示最多显示2行。 为了实现该效果，它需要组合其他的WebKit属性）
display: -webkit-box; （和1结合使用，将对象作为弹性伸缩盒子模型显示 ）
-webkit-box-orient:vertical;（ 和1结合使用 ，设置或检索伸缩盒对象的子元素的排列方式 。）
```

### 13、重绘和回流
重绘: 当渲染树中的一些元素需要更新属性，而这些属性只是影响元素的外观、风格，而不会影响布局的操作，比如 background-color，我们将这样的操作称为重绘。
回流：当渲染树中的一部分（或全部）因为元素的规模尺寸、布局、隐藏等改变而需要重新构建的操作，会影响到布局的操作，这样的操作我们称为回流。
#### 如何减少重排、重绘
- CSS
尽可能在DOM树的末端改变class  
将动画效果加在position属性为fixed或absolute的元素上，避免影响其他元素。  
避免使用table布局（一个小改动会使整个table重新布局）  
使用visibility:0（引起重绘）代替display:none（引起重排）  
- JS
避免频繁更改样式，对于多处更改最好一次性完成  
避免频繁操作DOM，创建一个容器元素，在其中完成所有DOM操作，再将其添加到文档  

## 三、JavaScript

### 1、js 的基本数据类型
Number String Null Undefined Boolean Symbol

### 2、原始数据类型和引用数据类型
#### 原始数据类型：Number String Null Undefined Boolean
#### 引用数据类型：对象、数组和函数

### 3、堆和栈
#### 堆：堆是一个优先队列，是按优先级来进行排序的，优先级可以按照大小来规定。完全二叉树是堆的一种实现方式。
#### 栈：栈中数据的存取方式为先进后出

### 4、js的内置对象
#### 值属性
    Infinity NaN Undefined Null等
#### 函数属性
    eval() parseInt() parseFloat()等
#### 基本对象
    Object Function Boolean Symbol Error等
#### 数字和日期对象
    Number Math Date
#### 字符串
    String
#### 结构化数据
    JSON
...

### 5、javascript 的本地对象，内置对象和宿主对象
本地对象为 array obj regexp 等可以 new 实例化  
内置对象为 gload Math 等不可以实例化的  
宿主为浏览器自带的 document,window 等

### 6、Null 和 Undefined 区别
#### Undefined：一般变量声明了但还没有定义的时候会返回 undefined
#### Null：null主要用于赋值给一些可能会返回对象的变量，作为初始化。
#### 当我们对两种类型使用 typeof 进行判断的时候，Null 类型化会返回 “object”，这是一个历史遗留的问题。当我们使用双等号对两种类型的值进行比较时会返回 true，使用三个等号时会返回 false。

### 7、说几条写 JavaScript 的基本规范？
（1）一个函数作用域中所有的变量声明应该尽量提到函数首部，用一个 var 声明，不允许出现两个连续的 var 声明，声明时
    如果变量没有值，应该给该变量赋值对应类型的初始值，便于他人阅读代码时，能够一目了然的知道变量对应的类型值。

（2）代码中出现地址、时间等字符串时需要使用常量代替。

（3）在进行比较的时候吧，尽量使用'===', '!=='代替'==', '!='。

（4）不要在内置对象的原型上添加方法，如 Array, Date。

（5）switch 语句必须带有 default 分支。

（6）for 循环必须使用大括号。

（7）if 语句必须使用大括号。

### 8、继承
Class 可以通过extends关键字实现继承，这比 ES5 的通过修改原型链实现继承，要清晰和方便很多。
```js
class Point {
}

class ColorPoint extends Point {
}
```
ES5 的继承，实质是先创造子类的实例对象this，然后再将父类的方法添加到this上面（Parent.apply(this)）。ES6 的继承机制完全不同，实质是先将父类实例对象的属性和方法，加到this上面（所以必须先调用super方法），然后再用子类的构造函数修改this。
```js
class ColorPoint extends Point {
}

// 等同于
class ColorPoint extends Point {
  constructor(...args) {
    super(...args);
  }
}
```

### 9、promise
#### 什么是promise
是异步编程的一种解决方案。简单说就是一个容器，里面保存着某个未来才会结束的事件（通常是一个异步操作）的结果。从语法上说，Promise 是一个对象，从它可以获取异步操作的消息。
#### 基本用法
```js
let p = new Promise((resolve, reject) => {
  if (/* 成功条件 */) {
    resolve()
  } else {
    reject()
  }
})
// p.then(成功回调, 失败回调)
p.then(() => {
    // 成功操作逻辑
    // 可读取到参数，该参数由resolve函数传入
}, () => {
    // 失败操作逻辑
    // 可读取到参数，该参数由reject函数传入
})
```

#### [实现一个promise](https://zhuanlan.zhihu.com/p/183801144)
```js
// pending（待定）
const PENDING = 'PENDING';
// fulfilled（已执行）
const FULFILLED = 'FULFILLED';
// rejected（已拒绝）
const REJECTED = 'REJECTED';

class Promise {
  constructor(executor) {
    this.status = PENDING;
    this.value = undefined;
    this.reason = undefined;
    // 存放成功的回调
    this.onResolvedCallbacks = [];
    // 存放失败的回调
    this.onRejectedCallbacks= [];

    let resolve = (value) => {
      if(this.status ===  PENDING) {
        this.status = FULFILLED;
        this.value = value;
        // 依次将对应的函数执行
        this.onResolvedCallbacks.forEach(fn=>fn());
      }
    } 

    let reject = (reason) => {
      if(this.status ===  PENDING) {
        this.status = REJECTED;
        this.reason = reason;
        // 依次将对应的函数执行
        this.onRejectedCallbacks.forEach(fn=>fn());
      }
    }

    try {
      executor(resolve,reject)
    } catch (error) {
      reject(error)
    }
  }

  then(onFulfilled, onRejected) {
    if (this.status === FULFILLED) {
      onFulfilled(this.value)
    }

    if (this.status === REJECTED) {
      onRejected(this.reason)
    }

    if (this.status === PENDING) {
      // 如果promise的状态是 pending，需要将 onFulfilled 和 onRejected 函数存放起来，等待状态确定后，再依次将对应的函数执行
      this.onResolvedCallbacks.push(() => {
        onFulfilled(this.value)
      });

      // 如果promise的状态是 pending，需要将 onFulfilled 和 onRejected 函数存放起来，等待状态确定后，再依次将对应的函数执行
      this.onRejectedCallbacks.push(()=> {
        onRejected(this.reason);
      })
    }
  }
}
```

### Generator 函数
ES6 提供的一种异步编程解决方案  
调用 Generator 函数，返回一个遍历器对象，代表 Generator 函数的内部指针。以后，每次调用遍历器对象的next方法，就会返回一个有着value和done两个属性的对象。value属性表示当前的内部状态的值，是yield表达式后面那个表达式的值；done属性是一个布尔值，表示是否遍历结束。
### async 函数
Generator 函数的语法糖  
#### async 函数和 generator区别
async函数就是将 Generator 函数的星号（*）替换成async，将yield替换成await，仅此而已。
```js
const gen = function* () {
  const f1 = yield readFile('/etc/fstab');
  const f2 = yield readFile('/etc/shells');
  console.log(f1.toString());
  console.log(f2.toString());
};
const asyncReadFile = async function () {
  const f1 = await readFile('/etc/fstab');
  const f2 = await readFile('/etc/shells');
  console.log(f1.toString());
  console.log(f2.toString());
};
```

async函数对 Generator 函数的改进，体现在以下四点。  

- （1）内置执行器。  

Generator 函数的执行必须靠执行器，所以才有了co模块，而async函数自带执行器。也就是说，async函数的执行，与普通函数一模一样，只要一行。  
```js
asyncReadFile();
```
上面的代码调用了asyncReadFile函数，然后它就会自动执行，输出最后结果。这完全不像 Generator 函数，需要调用next方法，或者用co模块，才能真正执行，得到最后结果。
- （2）更好的语义。    
async和await，比起星号和yield，语义更清楚了。async表示函数里有异步操作，await表示紧跟在后面的表达式需要等待结果。  
- （3）更广的适用性。  

co模块约定，yield命令后面只能是 Thunk 函数或 Promise 对象，而async函数的await命令后面，可以是 Promise 对象和原始类型的值（数值、字符串和布尔值，但这时会自动转成立即 resolved 的 Promise 对象）。  

- （4）返回值是 Promise。  
async函数的返回值是 Promise 对象，这比 Generator 函数的返回值是 Iterator 对象方便多了。你可以用then方法指定下一步的操作。  
进一步说，async函数完全可以看作多个异步操作，包装成的一个 Promise 对象，而await命令就是内部then命令的语法糖。

### 10、事件委托
利用事件冒泡的原理，自己的所触发的事件，让他的父元素代替执行

### 11、如何阻止事件冒泡和默认事件
阻止事件冒泡：  
`e.stopPropagation();` //标准浏览器  
`event.canceBubble=true;` //ie9 之前
阻止默认事件：  
`return false`  
`e.preventDefault();`

### 12、”==”和“===”的不同
前者会自动转换类型
后者不会

### 13、请简要描述 web 前端性能需要考虑哪方面，你的优化思路
减少 http 请求  
小图弄成大图  
合理的设置缓存  
资源合并、压缩  
将外部的 js 文件置底

### 14、哪些操作会造成内存泄漏？
内存泄漏指任何对象在您不再拥有或需要它之后仍然存在。
1. setTimeout 的第一个参数使用字符串而非函数的话，会引发内存泄漏。
2. 闭包
3. 控制台日志
4. 循环（在两个对象彼此引用且彼此保留时，就会产生一个循环）

### 15、请你谈谈 Cookie 的弊端？
缺点：  
1. `Cookie`数量和长度的限制。每个 domain 最多只能有 20 条 cookie，每个 cookie 长度不能超过 4KB，否则会被截掉。
2. 安全性问题。如果 cookie 被人拦截了，那人就可以取得所有的 session 信息。即使加密也与事无补，因为拦截者并不需要知道 cookie 的意义，只要原样转发 cookie 就可以达到目的了。
3. 有些状态不可能保存在客户端。例如，为了防止重复提交表单，我们需要在服务器端保存一个计数器。如果我们把这个计数器保存在客户端，那么它起不到任何作用。

### 16、iframe 的优缺点？  
优点：  
1. 解决加载缓慢的第三方内容如图标和广告等的加载问题  
2. Security sandbox  
3. 并行加载脚本  
缺点：  
1. iframe 会阻塞主页面的 Onload 事件  
2. 即时内容为空，加载也需要时间  
3. 没有语意  

### 17、闭包特性及缺点
闭包就是能够读取其他函数内部变量的函数。
闭包的缺点：滥用闭包函数会造成内存泄露，因为闭包中引用到的包裹函数中定义的变量都永远不会被释放，所以我们应该在必要的时候，及时释放这个闭包函数

### 18、三种弹窗的单词以及三种弹窗的功能
alert  
confirm：带确认取消按钮  
prompt：提供了一个用户可输入文本的输入框，同时带确认取消按钮

### 19、BOM 对象有哪些，列举 window 对象？
1. window 对象 ，是 JS 的最顶层对象，其他的 BOM 对象都是 window 对象的属性；  
2. document 对象，文档对象；  
3. location 对象，浏览器当前 URL 信息；  
4. navigator 对象，浏览器本身信息；  
5. screen 对象，客户端屏幕信息；  
6. history 对象，浏览器访问历史信息；

### 20、this指向问题
- 以函数形式调用时，this永远都是window  
- 以方法的形式调用时，this是调用方法的对象  
- 以构造函数的形式调用时，this是新创建的那个对象  
- 使用call和app1y调用时，this是指定的那个对象
#### 严格模式下this指向问题
- 在全局作用域中，this指向window对象
- 全局作用域中函数中的this为undefined
- 对象中函数的this指向调用函数的对象实例
- 构造函数中的this指向构造函数创建的对象实例
- 在事件处理函数中，this指向触发事件的目标对象
```js
"use strict";
 
function blue_it(e){
  if(this === e.target) {
    this.style.backgroundColor = "#00f";
  }
}
var elements = document.getElementsByTagName('*');
for(var i = 0 ; i < elements.length; i++){
  elements[i].onclick = blue_it;
}
```
- 内联事件中的this
```html
<button onclick="alert((function(){'use strict'; return this})());"></button>
<!-- undefined -->
<button onclick="'use strict'; alert(this.tagName.toLowerCase());">
<!-- button -->
```
### 21、微任务和宏任务




## 四、ES6
### 1、let
    ES6新增语法
    只在当前代码块有效：{}中
    不存在变量提升：在使用let命令声明变量之前使用该变量会报错而不是undefined
    暂时性死区：在代码块内，使用let命令声明变量之前，该变量都是不可用的
    在相同作用域内，不允许重复申明

### 2、const
    定义时必须赋值
	赋值后常量本身不可更改，其实是不可更改其内存地址

### 3、解构赋值
用于数组，位置一一对应，可以指定默认值
	let [a, b, c = 3] = [1, 2];
	>> a = 1, b = 2, c = 3
用于对象，通过键名对应，位置随意，可以定义一个变量接收，同样可以指定默认值
	let {name, age} = {name:"lisi", age:20}
	let {name: myname, age: myage}
对象的解构赋值本质上是赋值给键值对中的值
    let {name, age} = {name:"lisi", age:20}
    实际上是
    let {name: name, age: age} = {name:"lisi", age:20}

    

## 五、Vue
[牛客网最新前端面试题汇总之Vue篇](https://www.nowcoder.com/discuss/622394?type=all&order=time&pos=&page=1&ncTraceId=&channel=-1&source_id=search_all_nctrack)

### 1、双向数据绑定的原理
实现mvvm主要包含两个方面，数据变化更新视图，视图变化更新数据。
#### 视图变化更新数据
view更新data，可以通过事件监听即可，比如input标签监听 'input' 事件就可以实现了。
#### 数据变化更新视图
通过Object.defineProperty( )对属性设置一个set函数，当数据改变了就会来触发这个函数，所以我们只要将一些需要更新的方法放在这里面就可以实现data更新view了。
#### 实现过程
我们已经知道实现数据的双向绑定，首先要对数据进行劫持监听，所以我们需要设置一个监听器Observer，用来监听所有属性。如果属性发上变化了，就需要告诉订阅者Watcher看是否需要更新。因为订阅者是有很多个，所以我们需要有一个消息订阅器Dep来专门收集这些订阅者，然后在监听器Observer和订阅者Watcher之间进行统一管理的。接着，我们还需要有一个指令解析器Compile，对每个节点元素进行扫描和解析，将相关指令对应初始化成一个订阅者Watcher，并替换模板数据或者绑定相应的函数，此时当订阅者Watcher接收到相应属性的变化，就会执行对应的更新函数，从而更新视图。  
因此接下去我们执行以下3个步骤，实现数据的双向绑定：
1. 实现一个监听器Observer，用来劫持并监听所有属性，如果有变动的，就通知订阅者。
2. 实现一个订阅者Watcher，可以收到属性的变化通知并执行相应的函数，从而更新视图。
3. 实现一个解析器Compile，可以扫描和解析每个节点的相关指令，并根据初始化模板数据以及初始化相应的订阅器。
![图片](https://pic2.zhimg.com/v2-057b896f2006500cb44b1569bc1e6ee5_b.jpg)

### 2、常见的事件修饰符及其作用
- `.stop` ：等同于 JavaScript 中的 event.stopPropagation() ，防止事件冒泡；  
- `.prevent` ：等同于 JavaScript 中的 event.preventDefault() ，防止执行预设的行为（如果事件可取消，则取消该事件，而不停止事件的进一步传播）；  
- `.capture` ：与事件冒泡的方向相反，事件捕获由外到内；  
- `.self` ：只会触发自己范围内的事件，不包含子元素；  
- `.once` ：只会触发一次

### 3、兄弟组件之间的传值
#### 方式一：eventBus
- **Vue实例 event.js**
```js
// 创建一个vue实例，让各个兄弟共用同一个事件机制
import Vue from 'vue'
export default new Vue
```
- **组件A BrotherA.vue**
```html
<input @click='toB' />
```
```js
// 引入 event.js
import eventVue from 'event.js'
```
```js
methods: {
  toB() {
    eventBus.$emit('toB', 'this is from A!')
  }
}
```
- **组件B BrotherB.vue**
```js
// 引入 event.js
import eventVue from 'event.js'
```
```
created() {
  eventBus.$on('toB',(fromA)=>{
    console.log(fromA)
  })
}
```

#### 方式二：[Vuex](https://codesandbox.io/s/pensive-currying-b6szw?fontsize=14&hidenavigation=1&module=%2Fsrc%2Fcomponents%2FHelloWorld.vue&theme=dark)
- **store对象**
```js
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

var store = new Vuex.Store({
    state:{
        toB: ''
    }，
    mutations: {
      // 向 store.commit 传入额外的参数，即 mutation 的 载荷（payload）
      // 在大多数情况下，载荷应该是一个对象，这样可以包含多个字段并且记录的 mutation 会更易读：
      hello(state, fromA) {
        state.toB = fromA.value
      }
    }
});

export default store;
```
- **组件A BrotherA.vue**
```js
<input type="button"@click="toB">
```
```js
import store from "../store";
```
```js
data() {
  return {
    fromA: {
      value: 'hello, this if form A!'
    }
}
store:store,
methods: {
  toB() {
    store.commit('hello', this.fromA)
  }
}
```
- **组件B BrotherB.vue**
```html
<h1>{{ fromA }}</h1>
```
```js
import store from "../store";
```
```
store,
computed: {
  fromA() {
    return this.$store.state.toB
  }
}
```

#### 依赖注入（project / inject）

#### ref / refs

#### $parents和$children

#### vuex

#### $attrs和$listeners和$emit
- $attrs：继承所有的父组件属性（除了prop传递的属性、class 和 style ），一般用在子组件的子元素上
- $listeners：该属性是一个对象，里面包含了作用在这个组件上的所有监听器，可以配合 v-on="$listeners" 将所有的事件监听器指向这个组件的某个特定的子元素。（相当于子组件继承父组件的事件）
- $emit：调用父组件绑定的方法

## 六、HTTP
### 1、HTTP协议的特点
无连接：连接一次就会断开，不会保持连接
无状态：但从HTTP协议不能够区分两次连接者的身份
简单快速：每个资源（统一资源符）都是固定的
灵活：通过一个HTTP协议就可以完成不同数据类型的传输
### 2、HTTP报文的组成部分
- 请求报文
  - 请求行：包含HTTP方法、页面地址、HTTP协议、版本
  - 请求头：一些key-value值来告诉服务端我要那些内容，要用什么类型
  - 空行：告诉服务端下一行为请求体
  - 请求体
- 响应报文
  - 响应行
  - 响应头
  - 空行
  - 请求体

### 3、HTTP方法
- GET：获取资源
- POST：传输资源
- PUT：更新资源
- DELETE：删除资源
- HEAD：获得报文首部

### 4、GET和POST的区别
- GET在浏览器回退时是无害的，而POST会再次提交请求
- GET产生的URL地址可以被收藏，而POST不可以
- GET请求会被浏览器主动缓存，而POST不会，除非手动设置
- GET请求只能进行ur|编码，而POST支持多种编码方式
- GET请求参数会被完整保留在浏览器历史记录里，而POST中的参数不会被保留
- GET请求在URL中传送的参数是有长度限制的，而POST没有限制
- 对参数的数据类型，GET只接受ASCII字符，而POST没有限制
- GET比POST更不安全，因为参数直接暴露在URL上，所以不能用来传递敏感信息
- GET参数通过URL传递，POST放在Request body中

### 5、HTTP状态码
- 1xx:指示信息-表示请求已接收，继续处理
- 2xx:成功-表示请求已被成功接收
  - 200 OK:客户端请求成功
  - 206 Partial Content:客户发送了一个带有Range头的GET请求，服务器完成了它
- 3xx:重定向-要完成请求必须进行更进一步的操作
  - 301 Moved Permanently:所请求的页面已经转移至新的url
  - 302 Found:所请求的页面已经临时转移至新的url
  - 304 Not Modified:客户端有缓冲的文档并发出了一个条件性的请求，服务器告诉客户，原来缓冲的文档还可以继续使用
- 4xx:客户端错误-请求有语法错误或请求无法实现
  - 400 Bad Request:客户端请求有语法错误，不能被服务器所理解
  - 401 Unauthorized: 请求未经授权，这个状态代码必须和WWW-Authenticate报头域一起使用
  - 403 Forbidden:对被请求页面的访问被禁止
  - 404 Not Found:请求资源不存在
- 5xx:服务器错误-服务器未能实现合法的请求
  - 500 Internal Server Error:服务器发生不可预期的错误原来缓冲的文档还可以继续使用
  - 503 Server Unavailable:请求未完成，服务器临时过载或当机，一段时间后可能恢复正常
### 6、HTTP持久连接
HTTP协议采用“请求-应答"模式，当使用普通模式，即非Keep-Alive模式时，每个请求/应答客户和服务器都要新建一个连接，完成之后立即断开连接(HTTP协议为无连接的协议)  
当使用Keep-Alive模式(又称持久连接、连接重用)时，Keep-Alive 功能使客户端到服务器端的连接持续有效，当出现对服务器的后继请求时，Keep-Alive 功能避免了建立或者重新建立连接
> 1.1才支持， 1.0不支持

### 7、管线化
在使用持久连接的情况下，某个连接上消息的传递类似于`请求1->响应1->请求2->响应2->请求3->响应3`  

而管线化情况下，某个连接_上的消息变成了类似这样`请求1 ->请求2->请求3->响应1 ->响应2 ->响应3`

#### 管线化特点
- 管线化机制通过持久连接完成，仅HTTP/1.1支持此技术
- 只有GET和HEAD请求可以进行管线化，而POST则有所限制
- 初次创建连接时不应启动管线机制，因为对方(服务器)不一定支持HTTP/1.1版本的协议
- 管线化不会影响响应到来的顺序，如上面的例子所示，响应返回的顺序并未改变
- HTTP/1.1要求服务器端支持管线化，但并不要求服务器端也对响应进行管线化处理，只是要求对于管线化的请求不失败即可
- 由于.上面提到的服务器端问题，开启管线化很可能并不会带来大幅度的性能提升，而且很多服务器端和代理程序对管线化的支持并不好，因此现代浏览器如Chrome和Firefox默认并未开启管线化支持





 
 

### 2、
## 七、其他
### 1、谈谈对 SPA 和 SSR 的理解
[面试题十八：谈谈对SPA和SSR的理解？](https://course.51qux.com/2293.html)

### 2、promise执行顺序
```js
const pro = new Promise((resolve, reject) => {
  const innerpro = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(1);
    }, 0);
    console.log(2);
    resolve(3);
  });
  innerpro.then(res => console.log(res));
  resolve(4);
  console.log("pro");
})
pro.then(res => console.log(res));
console.log("end");
// 2
// pro
// end
// 3
// 4
```

```js
var a = 100;
function fn() {
  var b = 30;
  function bar() {
      console.log(a + b);  // 130
      console.log(this.b);  // undefined
  }
  return bar;
}
var x = fn(),
b = 400;
x();
```