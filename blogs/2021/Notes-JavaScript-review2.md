---
title: Notes---JavaScript_review（二）
date: 2021-06-10 09:14:50
categories:
  - Notes
  - JavaScript
tags:
  - JavaScript
---

## 一、闭包

> [摘自知乎文章：「每日一题」JS 中的闭包是什么？](https://zhuanlan.zhihu.com/p/22486908)  
> 函数和函数内部能访问到的变量（也叫环境）的总和，就是一个闭包。  
> 凡是访问函数内部的变量的都叫闭包

### 举例

下面的 local 变量和 bar 函数就形成了一个闭包

```js
function foo() {
  var local = 1;
  function bar() {
    console.log(local);
  }
}
```

### 使用闭包

```js
function foo() {
  var local = 1;
  function bar() {
    console.log(local);
  }
  return bar;
}
var func = foo();
func();
```

### 闭包的作用

> 闭包常常用来「间接访问一个变量」。换句话说，「隐藏一个变量」。

### 关于闭包的谣言

闭包会造成内存泄露？

错。

内存泄露是指你用不到（访问不到）的变量，依然占居着内存空间，不能被再次利用起来。

闭包里面的变量明明就是我们需要的变量（lives），凭什么说是内存泄露？

这个谣言是如何来的？

因为 IE。IE 有 bug，IE 在我们使用完闭包之后，依然回收不了闭包里面引用的变量。

这是 IE 的问题，不是闭包的问题。

## 二、两个不常见运算符

### 空值合并运算符 ??

```
a ?? 'hello'
```

等同于

```
a ? a : 'hello'
```

### 可选链操作符 ?.

解决多层判断问题  
当未知某个对象是否为 null，但我们又想访问该对象内部的某个值时，使用 ?. 运算符免去判断对象是否为 null

```js
let d = a?.b ?? c;
```

等同于

```js
if (a) {
  let d = a.b ?? c;
}
```

## 三、浅拷贝、深拷贝

> 浅拷贝只复制指向某个对象的指针，而不复制对象本身，新旧对象还是共享同一块内存。  
> 深拷贝会另外创造一个一模一样的对象，新对象跟原对象不共享内存，修改新对象不会改到原对象。

### 浅拷贝实现

- Object.assign()
- concat()
- 扩展运算符
- slice

```js
// Object.assign
let source = {
  name: "akara",
  age: 20,
};
let target = Object.assign({}, source);

// 扩展运算符
let source = {
  name: "akara",
  age: 20,
};
let target = { ...source };

// slice
let source = [1, 2, 3];
let target = source.slice();

// concat
let source = [1, 2, 3];
let target = source.concat();
```

### 深拷贝实现

- JSON.parse(JSON.stringify(obj))（只适用于对象中没有方法）
- 函数

```js
function completeDeepClone(source) {
  function deepClone(source, hash = new WeakMap()) {
    let target;
    if (hash.has(source)) {
      return hash.get(source);
    }
    if (typeof source === "object" && source !== null) {
      target = Array.isArray(source) ? [] : {};
      hash.set(source, target);
      for (let [key, value] of Object.entries(source)) {
        target[key] = deepClone(value, hash);
      }
    } else {
      target = source;
    }
    return target;
  }
  let ret = deepClone(source);
  Object.setPrototypeOf(ret, Object.getPrototypeOf(source));
  return ret;
}

// 使用
function Animal(name) {
  this.name = name;
}
Animal.prototype.master = "akara";
completeDeepClone(new Animal());
```

## 四、防抖、节流
> [参考简书文章：函数防抖和节流](https://www.jianshu.com/p/c8b86b09daf0)  


### 防抖
指触发事件后在 n 秒内函数只能执行一次，如果在 n 秒内又触发了事件，则会重新计算函数执行时间

```js
function debounce(func, wait = 1000) {
  let timeout;
  return function() {
    let context = this;
    let args = arguments;
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => {
      func.apply(context, args);
    }, wait);
  };
}
```

### 节流
指连续触发事件，但是在 n 秒中只执行一次函数。节流会稀释函数的执行频率。

```js
function throttle(func, wait = 1000) {
  let timeout;
  return function() {
    let context = this;
    let args = arguments;
    if (!timeout) {
      timeout = setTimeout(() => {
        timeout = null;
        func.apply(context, args);
      }, wait);
    }
  };
}
```
### 操作
鼠标移入数字触发数字加一操作
<Common />  

<Debounce />  

<Throttle />  
