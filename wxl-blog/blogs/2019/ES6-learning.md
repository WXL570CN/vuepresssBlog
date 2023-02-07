---
title: Notes---ES6_learning
date: 2019-04-16 09:14:50
categories:
- ES6
- JavaScript
tags:
- ES6
---

## 一、let 与 const
### 1、不存在变量提升
```js
// var 的情况
console.log(foo); // 输出 undefined
var foo = 2;

// let 的情况
console.log(bar); // 报错 ReferenceError
let bar = 2;
```

### 2、暂时性死区
块级作用域内通过 let 声明的变量不受外界同名变量的影响  

typeof不再安全
```js
// 对一个未声明变量或者声明变量前使用 typeof 运算符
typeof x; // ReferenceError
let x;

typeof y // "undefined"
```

### 3、块级作用域
> ES6 的块级作用域必须有大括号，如果没有大括号，JavaScript 引擎就认为不存在块级作用域。
```js
// let只能出现在当前作用域的顶层，所以报错

// 第一种写法，报错
if (true) let x = 1;

// 第二种写法，不报错
if (true) {
  let x = 1;
}
```

```js
// 严格模式下，函数只能声明在当前作用域的顶层

// 不报错
'use strict';
if (true) {
  function f() {}
}

// 报错
'use strict';
if (true)
  function f() {}
```

### 4、const
const实际上保证的，并不是变量的值不得改动，而是变量指向的那个内存地址所保存的数据不得改动

## 二、解构赋值
### 1、数组
```js
// let a = 1
// let b = 2
// let c = 3
let [a, b, c] = [1, 2, 3];
```

### 2、对象
```js
var {x = 3} = {};
x // 3

var {x: z, y = 5} = {x: 1};
z // 1
y // 5
```

### 3、字符串
```js
const [a, b, c, d, e] = 'hello';
a // "h"
b // "e"
c // "l"
d // "l"
e // "o"

let { length: len } = 'hello';
len // 5
```

### 4、数值和布尔值
```js
let {toString: s} = 123;
s === Number.prototype.toString // true

let {toString: s} = true;
s === Boolean.prototype.toString // true
```

> 解构赋值的规则是，只要等号右边的值不是对象或数组，就先将其转为对象。由于undefined和null无法转为对象，所以对它们进行解构赋值，都会报错。

## 三、字符串新增方法
### includes(), startsWith(), endsWith() 
- includes(str, index)：返回布尔值，表示是否找到了参数字符串。  
- startsWith(str, index)：返回布尔值，表示参数字符串是否在原字符串的头部。  
- endsWith(str, index)：返回布尔值，表示参数字符串是否在原字符串的尾部。  
> `includes()、startsWith()`的 index 代表从第 index - 1 个`开始`，`endsWith()`的 index 代表第 index - 1 个`结束 ` 

### repeat()
返回一个新字符串，表示将原字符串重复n次。
```js
'x'.repeat(3) // "xxx"
```

### padStart()，padEnd()
字符补全，不够长度则用提供的字符串补全
```js
'x'.padStart(5, 'ab') // 'ababx'
'x'.padEnd(5, 'ab') // 'xabab'
```

### trimStart()，trimEnd()
消除字符串中的空格，返回的都是新字符串，不会修改原始字符串。
```js
const s = '  abc  ';

s.trim() // "abc"
s.trimStart() // "abc  "
s.trimEnd() // "  abc"
```

### matchAll()
返回一个正则表达式在当前字符串的所有匹配

### replaceAll()
替换所有匹配，返回的是新字符串，不会修改原始字符串。
```js
'aabbcc'.replaceAll('b', '_')
// 'aa__cc'
```
replace()只能替换第一个匹配，利用正则`/g`可以匹配全部
```js
'aabbcc'.replace('b', '_')
// 'aa_bcc'
'aabbcc'.replace(/b/g, '_')
// 'aa__cc'
```


### 函数扩展
#### 默认值
#### 作用域
设置了默认值的函数作用域有所不同
```js
var x = 1;

function f(x, y = x) {
  console.log(y);
}

f(2) // 2
```

```js
let x = 1;

function f(y = x) {
  let x = 2;
  console.log(y);
}

f() // 1
```

#### 箭头函数
> 箭头函数没有自己的this对象（详见下文）。
> 不可以使用arguments对象，该对象在函数体内不存在。如果要用，可以用 rest 参数代替。
> 不可以使用yield命令，因此箭头函数不能用作 Generator 函数。

### Symbol
> 表示独一无二的值。凡是属性名属于 Symbol 类型，就都是独一无二的，可以保证不会与其他属性名产生冲突。
