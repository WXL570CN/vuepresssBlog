---
date: 2021/07/31
tags:
- jQuery
---

# 「初学笔记」JQuery
## 如何用jQuery批量替换一段HTML中文本的数字
### 要求
1. 使用**jQuery和正则**将**HTML中（含不同程度嵌套标签）**的文本内含有的数字**批量替换**为其他字符，如*号
2. 不能替换标签中的数字
3. 不能替换内联样式里的数字
4. HTML代码为接口获取，所以不存在给含数字的标签添加相同类进行替换的可能

### 实现效果示例
```html
<div class="test-content">
  ...
  <div>
    ...
    <span style="font-size=20px;">文本文本文本：1232</span>
    ...
  </div>
  <h1 style="font-size=18px;">文本文本文本：1232</h1>
  ...
</div>
```
修改文本数字后
```html
<div class="test-content">
  ...
  <div>
    ...
    <span style="font-size=18px;">文本文本文本：****</span>
    ...
  </div>
  <h1 style="font-size=18px;">文本文本文本：****</h1>
  ...
</div>
```

### 解决方案
```js
$('.test-content').contents().each(function (index, content) {
  let text = $(content).text();
  text = text.replace(/\d/g,'<span class="data-hidden">*</span>')
  $(content).html(text);
});
```

## 版本问题
jQuery3.0版本只兼容IE9+，在国内并不受欢迎，一般用jQuery1.x版本

## jquery中的顶级对象：jquery，可简写成$

## 页面加载事件
### ready事件（入口函数）：在页面标签加载完毕后触发，不等待图片文件加载
```js
$(document).ready(function(){
    //第一种写法
});

$(function(){
    //第二种写法
});
```

### load事件：页面加载事件（在页面所有元素加载完毕后触发）
```js
$(window).load(function(){

});
```
### jquery中的页面加载事件不会被覆盖，即可以同时写多个事件

## jQuery的入口函数要比JavaScript的入口函数执行更快
jQuery的入口函数在页面加载完成之后执行，但并不等待图片的加载  
JavaScript的入口函数在页面以及图片的加载完成之后才执行

## DOM对象和jQuery对象
### DOM对象：用JS方式获取到的对象 
`var cloth = document.getElementById("cloth");`  
### jQuery对象：用jQuery方式获取到的对象  
`var li = $("li");`

## jQuery对象不能调用DOM对象的方法
jQuery对象实际上是js对象的集合，是一个伪数组。  
jQuery对象中虽然有js对象，但它不能调用DOM对象的方法，只能将其取出才能调用  
相当于洗衣机和衣服的关系：  
jQuery对象是洗衣机，DOM对象是衣服，洗衣机中含有多件衣服  
但衣服没有洗衣机的洗的功能，洗衣机也没有衣服的穿的功能，所以互相不能调用  
如果要使用洗衣机中衣服的功能，只能将其取出来  
取得方法如下  

## 获取jQuery对象中的DOM对象方法
```js
var li = $("li");
$li[a];		// a 为数组下标
//$li.get(a)
```

## jQuery对象和DOM对象的转换
### jQuery对象转换成DOM对象
```js
var li = $("li");
$li[0]
或$li.get(0)
```

### DOM对象转换成jQuery对象：将DOM对象放入$中就变成了jQuery对象
```
var cloth = document.getElementById("cloth");
$(cloth).text("衣服");
```

## 选择器
- 类选择器   $(.className)
- ID选择器   $(#id)
- 标签选择器 $(标签名)
- 交集选择器 $(s1s2)
- 并集选择器 $(s1,s2)
- 子代选择器 $(s1>s2)
- 后代选择器 $(s1 s2)

## 为选择的对象添加样式
`$().css("属性名","属性值")`

## 鼠标触发事件
mouseover
mouseout
mouseenter：鼠标进入事件
mouseleave：鼠标离开事件
两种方法的区别
- mouseover（mouseout）每当鼠标经过设置元素或其子元素都会触发
- mouseenter（mouseleave）鼠标经过只触发一次

## 过滤选择器（带冒号）
- :first			第一个
- :last			最后一个
- :even			下标为偶数
- :odd			下标为奇数
- :eq(index)		根据下标选
- :gt(index)		大于该下标
- :lt(index)		小于该下标

## 修改单个样式
```js
$("li")
  .css("name1","value1")
  .css("name2","value2")
  .css("name3","value3")
  ...
```

## 修改多个样式（在里面传一个对象）
```js
$("li").css({
    name1 : "value1",
    name2 : "value2",
    ...
})
```

## 获取样式(当有多个li标签时，不会返回全部的li标签，而是只返回获取到的第一个值)
`$("li").css("name")`

## 添加类
`addClass("className")`

## 移除类
`removeClass("className")`

## 判断类
`hasClass("classname")`

## 切换类(判断是否有该类，有就删除，没有就添加)
`toggleClass("classname")`

## 属性操作attr
修改，获取和css用法一样  
当获取selected,disabled,checked这三个属性时，有可能会报错，这时需要用prop方法  
也就是说，对于布尔值类型的属性，需要用prop方法  
                                                                
## 阻止a标签的默认跳转
在a标签的click事件触发函数中最后添加return false;

## 为什么jquery不报错
因为返回的还是jquery对象，jQuery可以还是可以调用jQuery方法

## 动画效果
### 显示隐藏
    show()方法，可传多个参，参数可以是数值，也可以时回调函数
    hide()方法可传参数与show一致
### 滑入滑出（上下）
    滑入：slideDown()
    滑出：slideUp()
    切换：slideToggle()
         在滑入滑出之间切换
### 淡入淡出
    淡入：fadeIn()
    淡出：fadeOut()
    切换：fadeToggle()
### 自定义动画animate
    animate(参数1,参数2,参数3,参数4)
    参数1：对象，里面可传需要动画的样式，如{left:800}，当然前提是需要定位
    参数2：持续时间
    参数3：动画的执行效果：swing（秋千效果），linear（匀速），默认为秋千效果，
    参数4：回调函数，动画完成后

## 动画不停止bug
 动画队列问题：jquery会将未完成的动画放在一个队列中挨个执行

 解决：在动画效果前调用stop方法，即要调用动画时检测当前是否还有动画在执行，有的话就停止
    `.stop().show()`

## 当字符串中需要传参时，
`"我是'+name+'"`  
其中，name为参数

## 音乐标签auto

## 视频标签video

## 添加节点 append
`$("div").append(可以是一个jQuery对象，也可以是一个html代码)`  
当是一个html代码时，实际上jQuery会将其转换成一个jQuery对象

## 清除一个节点中的内容
`$("div").html("")`  
    即让其内容为空
    但会有内存泄露问题：当该标签绑定了事件时，该操作仅仅删除了内容，但并未删除事件，导致占用内存造成浪费
`$("div").empty()`  
    不仅会删除内容，同时会删除该标签上面绑定的事件

## 删除节点
`$("div").remove()`

## 复制节点
`$("div").clone(|false|true)`
- 不传参和传false：深度复制，但不会复制事件
- 传true：深度复制，会复制事件

## val 和 text
- val：获取与插入表单标签value值
- text：获取插入普通标签内容
- html：获取插入普通标签内容，且能识别html标签

## width  height：获取元素的宽高
单纯获取到的就是width和height的值  
不常用的一些东东：  
    innerWidth：width + padding
    outWidth：width + padding + border
    outWidth(true)：width + padding + margin
## 获取可视区域的宽高
注意这里不需要加双引号
```js
$(window).resize(function(){    //当调整浏览器窗口大小，就会触发resize事件
    console.log($(window).width);
    console.log($(window).height);
})
```

## scroll事件
当用户滚动指定的元素时，会触发 scroll 事件。  
scrollTop()：返回滚动条垂直方向的位置  
scrollLeft()：返回滚动条水平方向的位置

## offset()：返回相对于页面的位置，返回的是对象
position：返回相对于有定位的父元素的位置，返回的也是对象

## 注册事件会出现的问题：当有元素在页面加载完成之后创建的时候，就难以给该元素注册事件
解决方法：使用委托事件绑定
委托事件：即给父元素注册事件，当触发了新生成的元素时，虽然该元素没有绑定事件，但会冒泡到父元素，这时会触发父元素的委托事件
delegate()：给父元素注册委托事件，子元素执行
    $("div").delegate("p","click",function(){
        alert("呵呵");
    })
    //即为父元素div注册点击事件，且只有当点击的是子元素中的p标签时，才会触发该事件
但delegate()事件并不常用，on()方法诞生
on()方法既可以为父元素注册委托事件，同时也可以为自己注册普通事件


## on(events,selector,data,handle)：事件绑定
events：绑定事件的名称
selector：子元素标签，可选参数，要注册委托事件时候使用，
data：可以传值，初始为undefined，通过给function传参使用
callback：即function

## off：解绑事件
`$("div").off("click")`  
    解绑div上绑定的click事件
不传参，即解绑div上绑定的所有事件

## trigger：触发事件

## on方法中的data参数使用
```js
$("div").on("click",100,function(e){
    console.log(e.data)
})
```
e为一个事件对象，e中有data这个属性

## 阻止浏览器默认行为
`e.preventDefault()`
## 阻止冒泡
`e.stopPropagation()`

## 即阻止浏览器默认行为，也阻止事件冒泡
`return false;`

## 链式编程并不一定能一直链式下去：五星评论案例
即后面再链式所链的jQuery对象不一定是想要的对象，最初的jQuery在链式的过程中已经变化
需要用到end()方法


## each()方法：替代for遍历
```js
$("li").each(function(index,element){
    //index:获取到的每个li的下标
    //element：获取到的每个li的DOM对象
})
```
## $冲突问题解决
当jQuery的$与其他框架冲突时，可以通过$.noConflict()释放$的控制权（前提是jQuery有$的控制权，即最后引入的script是jQuery文件）
var j$ = $.noConflict()
    即jQuery改用j$代替$

## 图片懒加载
引入懒加载插件
将图片的src换成data-original，给需要懒加载的图片一个类，如lazy
jQuery代码: `$("img.lazy").lazyload();`

## jQuery插件
插件即功能，为jQuery添加功能
其实，jQuery对象之所以能调用方法，是因为这些方法都存在于这些对象的原型中，原型就是jQuery对象存储方法的一个地方，jQuery对象调用方法时，其实是从原型中调用这些方法。
那要制作插件，即为jQuery对象的原型添加功能就行
方法：`&.fn.自定义的方法`