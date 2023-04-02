---
title: Notes：JavaScript_review（一）
date: 2021/05/27
tags:
- JavaScript
---

## 原型对象

### 一、概念
```js
function Person(name, age, sex) {
    this.name = name
    this.age = age
    this.sex = sex
}
const xiaoMing = new Person('小明', 19, '男')
```
我们所创建的每一个函数， 解析器都会向函数中添加一个属性prototype

这个属性对应着一个对象，这个对象就是我们所谓的原型对象

如果函数作为普通函数调用prototype没有任何作用

当函数以构造函数的形式调用时，它所创建的对象中都会有一个隐含的属性，

指向该构造函数的原型对象，我们可以通过__ proto__ 来访问该属性

<!--more-->

`xiaoMing.__proto__ === Person.prototype`

原型对象就相当于一一个公共的区域，所有同一个类的实例都可以访问到这个原型对象
我们可以将对象中共有的对象放入原型对象中

`Person.prototype.nationnality = "Chinese"`

当我们访问对象的一个属性或方法时，它会先在对象自身中寻找，如果有则直接使用，
如果没有则会去原型对象中寻找，如果找到则直接使用

```js
const Tom = new Person('Tom', 20, '男')
Tom.Chinese = "American"
console.log(xiaoMing.nationnality, Tom.nationnality)  // "Chinese" "American"
```

### 二、检查对象中是否有某个属性
#### 1、in
只要对象或者原型中存在，则返回true
```js
console.log("nationnality" in xiaoming) // true
console.log("nationnality" in Tom) // true
```

#### 2、hasOwnProperty()
只有对象中存在才会返回true，原型中存在而对象中不存在返回false
```js
console.log(xiaoming.hasOwnProperty('nationnality')) // false
console.log(Tom.hasOwnProperty('nationnality')) // true
```

### 三、原型的原型
原型对象也是对象，所以它也有原型，
当我们使用一个对象的属性或方法时，会现在自身中寻找，
自身中如果有，则直接使用，
如果没有则去原型对象中寻找，如果原型对象中与，则使用，
如果没有则去原型的原型中寻找,直到找到 Object 对象的原型，
object对象的原型没有原型，如果在 Object 中依然没有找到，则返回 null
```js
console.log(xiaoMing.__proto__) // Person { nationnality: 'Chinese' }
console.log(xiaoMing.__proto__.__proto__) // {}
console.log(xiaoMing.__proto__.__proto__.__proto__) // null
```


## 垃圾回收(GC:gabage collect)
当一个对象没有任何的变量或属性对它进行引用，此时我们将永远无法操作该对象，
此时这种对象就是一个垃圾，这种对象过多会占用大量的内存空间，导致程序运行变慢，
所以这种垃圾必须进行清理。
在JS中拥有自动的垃圾回收机制，会自动将这些垃圾对象从内存中销毁，
我们不需要也不能进行垃圾回收的操作
我们需要做的只是要将不再使用的对象设置 null 即可
```js
let obj = new Object() // 该操作在内存中开辟了空间
obj = null // 开辟的空间无法使用了
```

## 数组方法

| 方法 | 概述 |
| --- | --- |
| concat() | 连接两个或更多的数组，并返回结果。 |
| join() | 把数组的所有元素放入一个字符串。元素通过指定的分隔符进行分隔。 |
| pop() | 删除并返回数组的最后一个元素 |
| push() | 向数组的末尾添加一个或更多元素，并返回新的长度。 |
| reverse() | 颠倒数组中元素的顺序。 |
| shift() | 删除并返回数组的第一个元素 |
| slice() | 从某个已有的数组返回选定的元素 |
| sort() | 对数组的元素进行排序 |
| splice() | 删余元素，并向数组添加新元素。 |
| toSource() | 返回该对象的源代码。 |
| toString() | 把数组转换为字符串，并返回结果。 |
| toLocaleString() | 把数组转换为本地数组，并返回结果。 |
| unshift() | 向数组的开头添加一个或更多元素，并返回新的长度。 |
| valueOf() | 返回数组对象的原始值 |

### slice()
> arrayObject.slice(start, end)
> 该方法不会改变原数组，而是返回一个新数组
> start, end 传负值取倒数

### splice()
> arrayObject.splice(start, num, item1, item2, ...)  
> 删除数组的指定下标后的 num 个元素，并添加新元素(可选)  
> 该方法会改变原数组，并返回被删除的数组，原数组为删除剩下的数组  
> 
`const arr = ['one', 'two', 'three', 'four']`

可删除元素
`arr.splice(1, 1)  // 删除 two`

可替换元素
`arr.splice(1, 1, 'twoReplace') // 将 two 替换为 twoReplace` 

可插入元素
`arr.splice(1, 0, 'twoInsert') // 在 two 前面插入 twoInsert`


## call() 和 apply()
这两个方法都是函数对象的方法，需要通过函数对象来调用  
### 作用
当对函数调用 call() 和 apply() 都会调用函数执行  
### 使用
在调用 call() 和 apply() 可以将一个对象指定为第一个参数  
此时这个对象将会成为函数执行时的this
```js
fuction fun() {
    console.log(this)
}
// window对象

const obj = {}
fun.call(obj)
// obj
```
call() 方法可以将实参在对象之后依次传递  
apply() 方法需要将实参封装到一个数组中统一传递
```js
fuction fun(a, b) {
    console.log(a, b)
}

const obj = {}
fun.call(obj, 2, 3)
// 2, 3
fun.apply(obj, [2, 3])
// 2, 3
```
## bind()
创建一个新函数，当这个新函数被调用时，它的 this 值是传递给 bind() 的第一个参数, 它的参数是 bind() 的其他参数和其原本的参数。
```js
function fn(a, b, c) {
  return a + b + c;
}

var _fn = fn.bind(null, 10);
var ans = _fn(20, 30); // 60
```
fn 函数需要三个参数，_fn 函数将 10 作为默认的第一个参数，所以只需要传入两个参数即可，如果你不小心传入了三个参数，放心，也只会取前两个。

## this 
- 以函数形式调用时，this永远都是window  
- 以方法的形式调用时，this是调用方法的对象  
- 以构造函数的形式调用时，this是新创建的那个对象  
- 使用call和app1y调用时，this是指定的那个对象

## 函数的隐含参数
### 函数的上下文对象this

### 封装实参的对象arguments
arguments 是一个类数组对象 ,它也可以通过索引来操作数据，也可以获取长度在调用函数时，我们所传递的实参都会在 arguments 中保存

arguments.length可以用来获取实参的长度

我们即使不定义形参， 也可以通过arguments来使用实参，

arguments[index]

它里边有一个属性叫做 callee，对应的是当前正在指向的函数的对象

## DOM 操作
### 一、概览
#### document.body
#### document.documentElement
#### documnet.getElementByClassName()
根据类获取DOM
兼容性：ie9+（兼容性不足）
#### document.querySelector()
可根据CSS选择器来获取DOM，但只返回符合条件的第一个DOM
兼容性：ie8+
#### document.querySelectorAll()
返回符合条件的所有DOM组成的数组
兼容性：ie8+

### 二、增删改查

| 方法 | 描述 |
| --- | --- |
| appendChild() | 把新的子节点添加到指定节点 |
| removeChild() | 删除子节点 |
| replaceChild() | 替换子节点 |
| insertBefore() | 在指定的子节点前面插入新的子节点 |
| createAttribute() | 创建属性节点 |
| createElement() | 创建元素节点 |
| createTextNode() | 创建文本节点 |
