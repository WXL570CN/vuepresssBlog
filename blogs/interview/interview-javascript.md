---
date: 2021/07/28 
tags:
- 面试
---

# 「面试」JavaScript

## js 的基本数据类型
- Number 
- String 
- Null 
- Undefined 
- Boolean 
- Symbol

## 原始数据类型和引用数据类型
### 原始数据类型：
- Number 
- String 
- Null 
- Undefined 
- Boolean
### 引用数据类型
对象、数组和函数

## 堆和栈
### 堆
堆是一个优先队列，是按优先级来进行排序的，优先级可以按照大小来规定。完全二叉树是堆的一种实现方式。
### 栈
栈中数据的存取方式为先进后出

## js的内置对象
### 值属性
- Infinity 
- NaN 
- Undefined 
- Null
- ...
### 函数属性
- eval() 
- parseInt() 
- parseFloat()
- ...
### 基本对象
- Object 
- Function 
- Boolean 
- Symbol 
- Error
- ...
### 数字和日期对象
- Number 
- Math 
- Date
### 字符串
String
### 结构化数据
JSON

## 本地对象，内置对象和宿主对象
### 本地对象
 `array obj regexp` 等可以 new 实例化的对象
### 内置对象
 `gload Math` 等不可以实例化的对象
### 宿主对象
浏览器自带的 `document,window` 等

## Null 和 Undefined 区别
### Undefined
一般变量声明了但还没有定义的时候会返回 undefined
### Null
null主要用于赋值给一些可能会返回对象的变量，作为初始化。
:::tip
当我们对两种类型使用 typeof 进行判断的时候，Null 类型化会返回 “object”，这是一个历史遗留的问题。  
当我们使用双等号对两种类型的值进行比较时会返回 true，使用三个等号时会返回 false。
:::

## == 和 ===
### 区别
== 允许在相等比较中进行强制类型转换,而 === 不允许;

### 遵循规则
- 如果 x 和 y 的类型相同:

  - 如果 x 是 undefined,返回 true;
  - 如果 x 是 null,返回 true;
  - 如果 x 是 Number 类型,则:

    - 如果 x 是 NaN,则返回 false;
    - 如果 y 是 NaN,则返回 false;
    - 如果 x 和 y 相同,则返回 true;
    - 如果 x是 -0 和 y 是 +0,则返回 true;
    - 如果 y是 -0 和 x 是 +0,则返回 true;
    - 其他情况返回 false;
  - 如果 x 是 string 类型,并且 x 和 y 的完全相同的值(长度相同，对应位置的字符相同),则返回 true;
  - 如果 x 的 Boolean 类型,并且 x 和 y 都是 true 或者 false,则返回 true,否则返回 false;
  - 如果 x 和 y 引用同一个对象,则返回 true,否则返回 false;
- 如果 x 为 null 且 y 为 undefined，则返回 true;
- 如果 y 为 null 且 x 为 undefined，则返回 true;
- 如果 x 是 number 类型且 y 是 string 类型,则返回 x == ToNumber(y)的比较结果;
- 如果 y 是 number 类型且 x 是 string 类型,则返回 y == ToNumber(x)的比较结果;
- 如果 x 是 boolean 类型,返回 ToNumber(x) == y的比较结果;
- 如果 y 是 boolean 类型,返回 ToNumber(y) == x的比较结果;
- 如果 x 是 string 类型或者 number 类型,并且 y 是 object 类型,返回 x == ToPrimitive(y) 的比较结果;
- 如果 y 是 string 类型或者 number 类型,并且 x 是 object 类型,返回 y == ToPrimitive(x) 的比较结果;
否则返回 false;

### 如何让 a == 2 && a == 3为true？
```js
const a = {
  value: 1,
};

a.valueOf = function () {
  return this.value++;
};

// 因为 a == 2 在 a == 3 之前执行。如果让 a..valueOf() 每次调用都产生副作用,比如第一次返回 2,第二次返回 3,就会出现这样的情况。
if (a == 1 && a == 2 && a == 3) {
  console.log("嗨,没想到吧,意不意外,惊不惊喜"); // 这里正常输出了
}
```

> 参考：[你确定你知道 == 和 === 的区别吗?](https://juejin.cn/post/7168761409629601800#comment)

## 几条写 JavaScript 的基本规范？
- 一个函数作用域中所有的变量声明应该尽量提到函数首部，用一个 var 声明，不允许出现两个连续的 var 声明，声明时，如果变量没有值，应该给该变量赋值对应类型的初始值，便于他人阅读代码时，能够一目了然的知道变量对应的类型值。
- 代码中出现地址、时间等字符串时需要使用常量代替。面试
- 在进行比较的时候吧，尽量使用'===', '!=='代替'==', '!='。
- 不要在内置对象的原型上添加方法，如 Array, Date。
- switch 语句必须带有 default 分支。
- for 循环必须使用大括号。
- if 语句必须使用大括号。

## 继承
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

## promise
### 什么是promise
是异步编程的一种解决方案。简单说就是一个容器，里面保存着某个未来才会结束的事件（通常是一个异步操作）的结果。从语法上说，Promise 是一个对象，从它可以获取异步操作的消息。
### 基本用法
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

### [实现一个promise](https://zhuanlan.zhihu.com/p/183801144)
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

## Generator 函数
ES6 提供的一种异步编程解决方案  
调用 Generator 函数，返回一个遍历器对象，代表 Generator 函数的内部指针。以后，每次调用遍历器对象的next方法，就会返回一个有着value和done两个属性的对象。value属性表示当前的内部状态的值，是yield表达式后面那个表达式的值；done属性是一个布尔值，表示是否遍历结束。

## async 函数
Generator 函数的语法糖  

## async 函数和 generator区别
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

## 事件委托
利用事件冒泡的原理，自己的所触发的事件，让他的父元素代替执行

## 如何阻止事件冒泡和默认事件
阻止事件冒泡：  
`e.stopPropagation();` //标准浏览器  
`event.canceBubble=true;` //ie9 之前
阻止默认事件：  
`return false`  
`e.preventDefault();`

## ”==”和“===”的不同
前者会自动转换类型
后者不会

## 请简要描述 web 前端性能需要考虑哪方面，你的优化思路
减少 http 请求  
小图弄成大图  
合理的设置缓存  
资源合并、压缩  
将外部的 js 文件置底

## 哪些操作会造成内存泄漏？
内存泄漏指任何对象在您不再拥有或需要它之后仍然存在。
- setTimeout 的第一个参数使用字符串而非函数的话，会引发内存泄漏。
- 闭包
- 控制台日志
- 循环（在两个对象彼此引用且彼此保留时，就会产生一个循环）

## 请你谈谈 Cookie 的弊端？
- `Cookie`数量和长度的限制。每个 domain 最多只能有 20 条 cookie，每个 cookie 长度不能超过 4KB，否则会被截掉。
- 安全性问题。如果 cookie 被人拦截了，那人就可以取得所有的 session 信息。即使加密也与事无补，因为拦截者并不需要知道 cookie 的意义，只要原样转发 cookie 就可以达到目的了。
- 有些状态不可能保存在客户端。例如，为了防止重复提交表单，我们需要在服务器端保存一个计数器。如果我们把这个计数器保存在客户端，那么它起不到任何作用。

## 闭包
闭包就是能够读取其他函数内部变量的函数。
### 缺点
滥用闭包函数会造成内存泄露，因为闭包中引用到的包裹函数中定义的变量都永远不会被释放，所以我们应该在必要的时候，及时释放这个闭包函数

## 弹窗
- alert  
- confirm：带确认取消按钮  
- prompt：提供了一个用户可输入文本的输入框，同时带确认取消按钮

## BOM 对象有哪些，列举 window 对象？
- window 对象 ，是 JS 的最顶层对象，其他的 BOM 对象都是 window 对象的属性；  
- document 对象，文档对象；  
- location 对象，浏览器当前 URL 信息；  
- navigator 对象，浏览器本身信息；  
- screen 对象，客户端屏幕信息；  
- history 对象，浏览器访问历史信息；

## this指向问题
- 以函数形式调用时，this永远都是window  
- 以方法的形式调用时，this是调用方法的对象  
- 以构造函数的形式调用时，this是新创建的那个对象  
- 使用call和app1y调用时，this是指定的那个对象
### 严格模式下this指向问题
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
<!-- undefined -->
<button onclick="alert((function(){'use strict'; return this})());"></button>
<!-- button -->
<button onclick="'use strict'; alert(this.tagName.toLowerCase());">
```

## 微任务和宏任务

## 一道面试题
```js
// 今日头条面试题
async function async1() {
    console.log('async1 start')
    await async2()
    console.log('async1 end')
}
async function async2() {
    console.log('async2')
}
console.log('script start')
setTimeout(function () {
    console.log('settimeout')
})
async1()
new Promise(function (resolve) {
    console.log('promise1')
    resolve()
}).then(function () {
    console.log('promise2')
})
console.log('script end')
```
题目的本质，就是考察setTimeout、promise、async await的实现及执行顺序，以及JS的事件循环的相关问题。

### setTimeout
> settimeout的回调函数放到宏任务队列里，等到执行栈清空以后执行；
```js
console.log('script start')	//1. 打印 script start
setTimeout(function(){
    console.log('settimeout')	// 4. 打印 settimeout
})	// 2. 调用 setTimeout 函数，并定义其完成后执行的回调函数
console.log('script end')	//3. 打印 script start
// 输出顺序：script start->script end->settimeout
```

### Promise
> Promise本身是同步的立即执行函数， 当在executor中执行resolve或者reject的时候, 此时是异步操作， 会先执行then/catch等，当主栈完成后，才会去调用resolve/reject中存放的方法执行  
> promise.then里的回调函数会放到相应宏任务的微任务队列里，等宏任务里面的同步代码执行完再执行
```js
console.log('script start')
let promise1 = new Promise(function (resolve) {
    console.log('promise1')
    resolve()
    console.log('promise1 end')
}).then(function () {
    console.log('promise2')
})
setTimeout(function(){
    console.log('settimeout')
})
console.log('script end')
// 输出顺序: script start->promise1->promise1 end->script end->promise2->settimeout
```

### async/await
> async函数表示函数里面可能会有异步方法，await后面跟一个表达式，async方法执行时，遇到await会立即执行表达式，然后把表达式后面的代码放到微任务队列里，让出执行栈让同步代码先执行。
```js
async function async1(){
   console.log('async1 start');
    await async2();
    console.log('async1 end')
}
async function async2(){
    console.log('async2')
}

console.log('script start');
async1();
console.log('script end')

// 输出顺序：script start->async1 start->async2->script end->async1 end
```

### 总结
setTimeout 里的执行函数 和 Promise.then 中定义的执行函数都会被放到相应宏任务的微任务队列里，等宏任务里面的同步代码执行完再执行
### 结果
```
script start
async1 start
async2
promise1
script end
async1 end
promise2
settimeout
```

## promise执行顺序
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

## instanceof
判断对象是否是某一数据类型（如Array）的实例
```js
console.log(2 instanceof Number);
// false
console.log(true instanceof Boolean);
// false
console.log('str' instanceof String);                
// false
console.log([] instanceof Array);                    
// true
console.log(function(){} instanceof Function);       
// true
console.log({} instanceof Object);                   
// true
```


> 参考：[由浅入深，66条JavaScript面试知识点](https://juejin.cn/post/6844904200917221389)

## valueOf 和 toString
valueOf和toString是Object.prototype的方法。
### 概念
- valueOf: 返回对象的原始值表示
- toString: 返回对象的字符串表示

### toString
对象|返回值
|-|-|
Array|以逗号分割的字符串，如[1,2]的toString返回值为"1,2"
Boolean|"True"
Date|可读的时间字符串，如"Tue Oct 15 2019 12:20:56 GMT+0800 (中国标准时间)"
Function|声明函数的JS源代码字符串
Number|"数字值"
Object|"[object Object]"
String|"字符串"

### valueOf
对象|	valueOf返回值
|-|-|
Array|	数组本身
Boolean|	布尔值
Date|	返回毫秒形式的时间戳
Function|	函数本身
Number|	数字值
Object|	对象本身
String|	字符串值