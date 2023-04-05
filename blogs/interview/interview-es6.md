---
date: 2021/07/28 
tags:
- 面试
---

# 「面试」ES6

## let
- ES6新增语法
- 只在当前代码块有效：{}中
- 不存在变量提升：在使用let命令声明变量之前使用该变量会报错而不是undefined
- 暂时性死区：在代码块内，使用let命令声明变量之前，该变量都是不可用的
- 在相同作用域内，不允许重复申明

## const
- 定义时必须赋值
- 赋值后常量本身不可更改，其实是不可更改其内存地址

## 解构赋值
### 数组
位置一一对应，可以指定默认值
```js
let [a, b, c = 3] = [1, 2];
// a = 1, b = 2, c = 3
```
### 对象
通过键名对应，位置随意，可以定义一个变量接收，同样可以指定默认值
```js
let {name, age} = {name:"lisi", age:20}
let {name: myname, age: myage}
```
对象的解构赋值本质上是赋值给键值对中的值
```js
let {name, age} = {name:"lisi", age:20}
// 实际上是
let {name: name, age: age} = {name:"lisi", age:20}
```

## 扩展运算符
### 深拷贝or浅拷贝？
单层结构视为深拷贝
```js
// 对象
a = {name:123, age:222}
b = {...a}
b.name = '张三'
console.log(a) //  {name:123, age:222}
console.log(b) //  {name: '张三', age:222}
// 数组
a = [1,2,3]
b = [...a]
b[0] = 4
console.log(a) //  [1,2,3]
console.log(b) //  [4,2,3]
```
多层结构视为浅拷贝
```js
a = {person:{name:'张三'}}
b = {...a}
b.person.name = '李四'
console.log(a) //  {person:{name:'李四'}}
console.log(b) //  {person:{name:'李四'}}
// 数组
a = [{name:'张三'}]
b = [...a]
b[0].name = '李四'
console.log(a) //  [{name:'李四'}]
console.log(b) //  [{name:'李四'}]
```
