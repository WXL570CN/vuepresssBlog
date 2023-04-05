---
date: 2021/07/28 
tags:
- 面试
---

# 「面试」Css

## 选择器
1. 标签选择器 `div {}`
2. 属性选择器 `a[title='..'] {}`
2. id选择器
3. class选择器
4. 子代选择器 `ul>li {}`
5. 后代选择器 `body li {}`
6. 群组选择器 `h1,p`
7. 相邻兄弟选择器 `h1 + p {}`
8. 伪类选择器 `:hover`

## first-child 和 first-of-type
- `p:first-child`：当父元素下的第一个元素为p元素时
- `p:first-of-type`：父元素下的第一个p元素

## 属性的权重
!important > 内联样式 > ID选择器 > class选择器 > 标签选择器 > 通配符（*） > 浏览器默认样式 > 继承样式

## 盒模型
> box-sizing
- `content-box `浏览器默认，盒子宽度为 width（内容宽度） + padding + border
- `border-box`盒子宽度为width， 即 内容宽度 + padding + border

## transition
> 过渡效果
- `transition-property` 过渡属性(默认值为all)  
- `transition-duration` 过渡持续时间(默认值为0s)  
- `transiton-timing-function` 过渡函数(默认值为ease函数)  
- `transition-delay` 过渡延迟时间(默认值为0s)  
> 注意：IE9-不支持该属性，safari3.1-6、IOS3.2-6.1、android2.1-4.3需要添加-webkit-前缀；而其余高版本浏览器支持标准写法

## animation
> 动画效果
- `animation-name` 动画名  
- `animation-duration` 持续时间  
- `animation-timing-function` 动画曲线  
- `animation-delay` 延迟  
- `animation-iteration-count` 播放次数  
- `animation-direction` 是否在下一周期逆向播放  

## 元素分类
#### 行内元素
不独占一行；宽度(width)、高度(height)、内边距和外边距的 top/bottom 都不可改变，也就是说 padding 和 margin 的左右是可以改变的。  
`a b br i span input select`
#### 块级元素
独占一行；宽度(width)、高度(height)、内边距(padding)和外边距(margin)都可控制;  
`div p h1 h2 h3 h4 form ul`
#### 行内块元素
不独占一行；可以设置宽和高。  
`<input> 、<img> 、<button> 、<texterea> 、<label>`

## 水平垂直居中
:::: code-group
::: code-group-item Html
@[code{120-122}](@preview/interview/vertical-center.html)
:::
::: code-group-item 绝对定位1
@[code{9-25}](@preview/interview/vertical-center.html)
:::
::: code-group-item 绝对定位2
@[code{26-40}](@preview/interview/vertical-center.html)
:::
::: code-group-item 绝对定位3
@[code{41-56}](@preview/interview/vertical-center.html)
:::
::: code-group-item 绝对定位4
@[code{57-74}](@preview/interview/vertical-center.html)
:::
::: code-group-item flex布局1
@[code{75-88}](@preview/interview/vertical-center.html)
:::
::: code-group-item flex布局2
@[code{89-101}](@preview/interview/vertical-center.html)
:::
::: code-group-item table布局
@[code{102-115}](@preview/interview/vertical-center.html)
:::
::::

## BFC
Block Formatting Contexts （块级格式化上下文）  
它是一个独立的盒子，并且这个独立的盒子内部布局不受外界影响。
### 何时会触发BFC
- 根元素< html>
- float的值不为none。
- position的值不为relative和static。
- overflow的值为auto,scroll或hidden。
- display的值为table-cell, table-caption, inline-block中的任何一个。
### 作用
- 清除浮动（阻止高度塌陷）。
- 外边距合并：同属一个BFC的相邻元素会发生外边距（margin）重叠。
- 阻止元素被浮动元素覆盖，可用来实现两列布局。

## 清除浮动
### 浮动的影响
在父元素未定义高度时，父元素高度会坍缩
### 清除浮动的方法
- BFC清除浮动
- 添加额外标签，应用 clear: both  
:::: code-group
::: code-group-item Html
@[code{51-55}](@preview/interview/clear-float.html)
:::
::: code-group-item Css
@[code{9-27}](@preview/interview/clear-float.html)
:::
::::

- 使用伪元素 :after
:::: code-group
::: code-group-item Html
@[code{57-60}](@preview/interview/clear-float.html)
:::
::: code-group-item Css
@[code{29-46}](@preview/interview/clear-float.html)
:::
::::

## inline-block的间隙问题
两个`display: inline-block`的元素放到一起会产生一段空白  
因为这时两个元素之间的代码换行会被转换成空白符
### 解决方案
代码写在同一行
```html
<div style='display: inline-block;'></div><div style='display: inline-block;'></div>
```

## display: none，visibility: hidden, opacity: 0 的区别
### 结构上
- `display: none` 会让目标元素不会被渲染进渲染树， 因此不占空间，而且不能点击。
- `visibility: hidden`目标元素会被渲染进渲染树，因此占空间，但是不能点击。
- `opacity: 0`目标元素会被渲染进渲染树，因此占空间，而且能点击。
### 继承上
- `display: none`作用于父元素后，子元素也不会被渲染（即使给子元素加了display: block）
- `visibility: hidden`作用于父元素后，子元素继承这个属性，也不可见；可以给子元素设置visibility: visible使其可见。
- `opacity: 0`作用于父元素后，虽然子元素不会继承这个属性，但是子元素的透明度也会被影响，所以也不可见；而且不能通过给子元素设置opacity: 1使其变成不透明。
### 性能上
- `display: none`会造成回流/重绘，性能影响大
- `visibility: hidden`会造成元素内部的重绘，性能影响相对小
- `opacity: 0`由于opacity属性启用了GPU加速，性能最好
::: tip
opacity是不继承属性，父元素设置opacity，子元素并不会继承。  
但是因为该属性的特殊性（类似background），父元素有了透明度，子元素的样式也会被影响。  
如果父元素设置`opacity: 0.5`，子元素设置`opacity: 0.5`，那么实际上子元素的透明度是0.5 * 0.5 = 0.25。  
如果希望子元素不被父元素的透明度影响，我们可以使用`background: rgba`代替`opacity: 0`
:::

## 重绘和回流
- 重绘: 当渲染树中的一些元素需要更新属性，而这些属性只是影响元素的外观、风格，而不会影响布局的操作，比如 background-color，我们将这样的操作称为重绘。
- 回流：当渲染树中的一部分（或全部）因为元素的规模尺寸、布局、隐藏等改变而需要重新构建的操作，会影响到布局的操作，这样的操作我们称为回流。
### 如何减少重排、重绘
- CSS  
   - 尽可能在DOM树的末端改变class  
   - 将动画效果加在position属性为fixed或absolute的元素上，避免影响其他元素。  
   - 避免使用table布局（一个小改动会使整个table重新布局）  
   - 使用visibility:0（引起重绘）代替display:none（引起重排）  
- JS  
   - 避免频繁更改样式，对于多处更改最好一次性完成  
   - 避免频繁操作DOM，创建一个容器元素，在其中完成所有DOM操作，再将其添加到文档  

## [Akara的博客](https://messiahhh.github.io/blog/docs/CSS)