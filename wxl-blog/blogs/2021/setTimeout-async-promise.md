---
title: setTimeout、Async/Await、Promise
date: 2021-06-03 16:25:55
categories:
- JavaScript
- Notes
tags:
- setTimeout
- Async/Await
- Promise
---

# 先上一道面试题
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

# setTimeout
> settimeout的回调函数放到宏任务队列里，等到执行栈清空以后执行；
```js
console.log('script start')	//1. 打印 script start
setTimeout(function(){
    console.log('settimeout')	// 4. 打印 settimeout
})	// 2. 调用 setTimeout 函数，并定义其完成后执行的回调函数
console.log('script end')	//3. 打印 script start
// 输出顺序：script start->script end->settimeout
```

# Promise
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

# async/await
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

# 总结
setTimeout 里的执行函数 和 Promise.then 中定义的执行函数都会被放到相应宏任务的微任务队列里，等宏任务里面的同步代码执行完再执行
# 结果
搞明白之后，这道面试题就不难了  
答案：
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