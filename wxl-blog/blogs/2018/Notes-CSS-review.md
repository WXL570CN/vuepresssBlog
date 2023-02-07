---
title: Notes---CSS_review
date: 2018-09-17 09:14:50
categories:
- Notes
- [Css]
tags:
- Css
---

## 字体
字号尽量用偶数字号，奇数字号有可能出问题  
字体名含空格，则选用该字体时需要加引号

## 链接伪类选择器，主要针对a标签
	link：未访问的链接
	visited：已访问的链接
	hover：鼠标移动到链接上
	active：鼠标点击但未松开时的状态
使用方法  
```css
a：link {}
a：visited {}
a：hover {}
a：active {}
```
且如果同时存在，四个选择器的顺序不能乱

## 结构伪类选择器
- first-child:第一个元素
- last-child：最后一个
- nth-child(an)：第a*n个元素，a取自然数，n取0，1，2，3，4...
- nth-last-child：和nth-child相反，它是从最后一个元素开始数
使用方法(以列表为例)：
```css
li:first-child {}
li:nth-child(n) {}
li:nth-child(odd) {} // 选择所有第奇数个元素
li:nth-child(even) {} // 选择所有第偶数个元素
```
> :first-child 和 :first-of-type 的区别
>> p:first-child，第一个子元素且该元素为p元素  
>> p:first-of-type: 第一个p子元素

## 目标伪类选择器
与锚点链接配合使用，当点击导航到达目标段时，改变目标段的状态  
使用方法：
`:target{}`

## 选择器优先级
`!important > 内联样式 > ID选择器 > class选择器 > 标签选择器 > 通配符（*） > 浏览器默认样式 > 继承样式`

## 文本样式
- text-align：文字水平对齐  
- text-indent: 所有段落首行缩进，单位用em  
- letter-spacing: 字间距  
- word-spacing: 单词间距，针对英文  
- word-wrap: normal | break-word 文本超出是否断行  
- white-space: nowrap 文本中换行无效(word-wrap无效)  
- text-shadow: 水平位置 垂直位置 模糊距离 阴影颜色; 文字阴影（前两个参数必须写）

## 块级标签（h系列,p,div,ul,ol,li）
独自占一行，可控制高宽，行高，外边距和内边距，宽度默认100%  
## 行内元素（a,strong,b,em,i,del,s,ins,u,span）
和相邻行内同处一行，高宽无效，垂直方向无效，水平方向的padding和margin控制  
宽度默认为其中的内容宽度

## 行内块标签（img,input,td）
和相邻行内（行内块）元素处同一行，之间会有空隙，宽度之类的控制和块级标签一致  
默认宽度为其中内容的宽度

## 属性选择器
```css
a[title]{}			    /* <a href="#" title="我是title">haha<a> */
input[type=type名]{}	/* <input type="type名" value="">  */ 
div[class^=name]{}		/* class名字以name开头的 */ 
div[class$=name]{}		/* class名字以name结束的 */ 
div[class*=name]{}		/* class名字中含有name的 */ 
```

		
## 伪元素选择器
```css
p::first-letter {}	                 /* p标签中内容的第一个字 */
p::first-line {}		             /* p标签中内容的第一个行  */
p::selection {}		                 /* 当选中文字时可以改变的样式，如color=red，改变当选中文字时文字显示为红色 */
div::before{ content="要加的内容" }	 /* 在div标签的内容前面加入content */
div::after{ content="要加的内容" }	 /* 在div标签的内容后面加入content */
```
		

## background
	background-repeat:背景图片是否平铺
		repeat
		repeat-x
		repeat-y
		no-repeat
	background-position:背景图片位置
	background-attachment:
		fixed	背景固定
		scoll	背景随文字滚动
实际应用：  
```css
width: ;
height: ;
background: url();
background-size: 100% 100%;
```
## BFC
> Block Formatting Contexts（块级格式化上下文)  
> [10 分钟理解 BFC 原理](https://zhuanlan.zhihu.com/p/25321647)

盒子内部布局不受外界影响
### 如何触发BFC
- Html
- float不为none
- position的值不为relative和static
- overflow的值为auto,scroll或hidden
- display的值为table-cell, table-caption, inline-block中的任何一个
### 作用
- 阻止高度塌陷
- 外边距合并：同属一个BFC的相邻元素会发生外边距（margin）重叠
- 阻止元素被浮动元素覆盖，可用来实现两列布局

## 清除浮动的影响
	clear:both		在浮动的盒子后面添加一个空盒子，并给样式添加该属性
	overflow:hidden/auto/scoll	在父元素的样式中加入该属性（该属性会触发BFC，BFC可以清除浮动）
								缺点：内容太多时容易造成内容被隐藏
	after伪元素清除浮动		原理：是第一种方法的优化，在浮动的盒子后面追加一个块元素

## 定位 --position
- 静态定位：static，标准流，边偏移无效，用于清除定位
- 相对定位：relative，标准流，相对于自己的位置移动，通过边偏移移动位置后，原来的位置仍然占有
- 绝对定位：absolute，脱离标准流，当父元素有定位时，相对于父元素移动；当父元素没有定位时，相对于浏览器定位，通过边偏移移动位置后，不占有位置，即下面的盒子有可能会上来。
- 固定定位：fix，脱离标准流，不管父级有没有定位，都只相对于浏览器定位，不占有位置，且不随浏览器滚动而滑动 ，需要写宽高，除非有内容撑开则不用写


> 子绝父相：儿子用绝对定位时，父亲要用相对定位。使用了绝对定位的盒子，无法用margin：0 auto水平居中于父盒子中，这时用位偏移解决：
```css
left:50%;
margin-left:自身长度的一半px;
```
或者可以
```css
left:50%;
transform：translate(-50%);
```
都能达到使盒子水平居中的效果，同理，垂直居中也是如此。

> 绝对定位或者固定定位之后，会转换成行内块元素，行内块元素没写宽度时，宽度根据内容宽度决定（因为这几种方式都是脱离标准流的）


## 元素的隐藏与显示
	display显示
		display:none	隐藏对象
		display:block   显示元素，前面用来转换成块元素
		特点：隐藏之后就不再保留位置

	visibility可见性
		visible		对象可见
		hidden		对象隐藏
		特点：隐藏之后，继续保留原位置

	opacity透明度
### display/visibility/opacity 性能对比
&nbsp;&nbsp;&nbsp;&nbsp;display: none会造成回流/重绘，性能影响大  

&nbsp;&nbsp;&nbsp;&nbsp;visibility: hidden会造成元素内部的重绘，性能影响相对小  

&nbsp;&nbsp;&nbsp;&nbsp;opacity: 0 由于opacity属性启用了GPU加速，性能最好  
## 鼠标样式
- cursor:default	箭头
- cursor:pointer	手
- cursor:move		拖动标
- cursor:text 	默认，文本I符

## 轮廓线outline（类似与边框）
```css
outline: 0;		/* 最常用的方法，取消轮廓线 */
```

## 文本域textarea
右下角可供拖拽，但拖拽会影响布局，所以一般要清除拖拽
```css
resize:none; /* 取消拖拽 */
```


## 图片和文字处于同一行时的对齐问题
原因：图片默认是和父盒子基线对齐的
- a、将图片转换成块元素
-	b、将图片设置为顶线对齐（vertical-align:top）

## 文本溢出
### overflow
	overflow：		内容超出控制
	overflow:visible	默认设置，即文字超出盒子时会溢出
	overflow:auto		超出时显示滚动条，不超出时不显示
	overflow:scroll		一直显示滚动条
	overflow:hidden		超出部分直接隐藏
### 行内块和文字对齐
	vertical-align:baseline;	默认，基线对齐
	vertical-align:middle;		中线对齐
	vertical-align:top;		顶线对齐
### 自动换行word-break（主要针对英文）
	word-break:normal	默认换行规则（达到盒子宽度自动换行）
	word-break:break-all	允许单词拆开换行
	word-break:keep-all	不允许单词拆开换行

### 强制一行显示内容white-space
	white-space:normal	默认处理方式（即达到盒子宽度自动换行）
	white-space:nowrap	强制在同一行显示所有文本，直到文本结束或者遭遇br标签才换行

### 超出部分隐藏或者以省略号显示
	white-space:nowrap;
	overflow:hidden;
	text-overflow:clip;	超出部分直接隐藏
	text-overflow:ellipsis;	超出部分以省略号代替

## 盒模型
content -> padding -> border -> margin
> box-sizing: content-box 

设置盒子长度width  
盒子实际长度等于content（width） + padding + border  
> box-sizing: border-box  

设置盒子长度width  
盒子实际长度等于width

## 过渡效果transition
```css
transition-property: width;
transition-duration: 3s;
transition-timing-function: ease-in;
transition-delay: 1s;
```
简写
```css
transition:width 0.6s ease 0s; //(要过渡的属性(长度或者高度) 花费时间 运动曲线 等待时间)
transition:all 0.6s; //(all:宽高一块变，有了all之后后两项可以省略)
```
ease改为ease-in :过渡动画放慢

## 变形transform
	移动：transform:translate(x,y)		在水平或者垂直方向移动，如果只写一个参数，则水平垂直一起移动
	缩放：transform:scale(x,y)			在水平或者垂直方向缩放，如果只写一个参数，则水平垂直一起缩放
	旋转：transform:rotate(180deg)		以中心点为轴顺时针旋转180度，
	倾斜：transform:skew(30deg,0deg)		X轴方向倾斜30度，Y轴方向不倾斜

## transform-origin:left top;
	可以调整元素转换变形的轴心,此时轴心为左上角,也可以用像素更精确

## backface-visibility:hidden;
	当元素反转到正面不朝向前面时就隐藏
	用途：实现硬币的翻转效果

## perspective：1000px;
	透视效果（使翻转时有3d效果），一般给父类加这一属性


## 动画效果animation
	@keyframes
	animation
	animation-name
	animation-duration
	animation-timing-function
	引用动画		animation:wo 2s ease/linear 0s 2/infinite normal/reverse/alternate/alternate-reverse; 
	(动画名称 动画时间 速度曲线/匀速 开始时间 播放次数/无限循环播放 下一周期正常播放/逆序播放/先正序播放后逆序播放/先逆序播放后正序播放)
	
	一般情况下，只给前两个就行

> 定义动画：@keyframes name{ from { 开始位置 } to { 结束位置 }}  

	@keyframes wo{
		from{
			transform:translateX(0);
		}
		to{
			transform:translateX(600px);
		}
	}


	animation-play-state:paused;	暂停动画

	实现一组照片无缝滚动效果：需要有两组相同的照片


## flex布局
	display:flex		当需要使用伸缩布局时，用在父元素
	flex:n 				用在子元素，表示这个子盒子占了父盒子的n份
	min-width:a px;		用于父元素，盒子缩放最小宽度不小于a

	一个盒子中有很多子盒子时，可以给部分子盒子设置成固定的宽度（网页缩放时宽度不变），其他盒子伸缩划分。

	flex-direction:row		排列方式，默认横排列
	flex-direction:column 		竖排列
### justify-content调整主轴对齐（水平对齐）
	当一个盒子中有多个盒子时可以用这个属性调整这些子盒子在水平方向对齐方式
	flex-start			默认值，子盒子从左向右排列，最右边可能会出现空隙（左对齐）
	flex-end			子盒子从右向左排列，最左边可能会出现空隙（右对齐）
	center				全部子盒子居中
	space-between		左右盒子贴近父盒子，中间盒子居中
	space-around		相当于给每个子盒子添加外边距margin
### align-items调整侧轴对齐（垂直对齐）
	当一个盒子中有多个盒子时可以用这个属性调整这些子盒子在垂直方向对齐方式
	flex-start			上对齐
	flex-end			下对齐
	center				垂直居中对齐
	stretch				子盒子不给高度的情况下，子盒子高度会被拉伸至等于父盒子高度
### flex-wrap控制是否换行
	当子盒子的宽度和大于父盒子宽度时的处理方式
	nowrap				不换行，压缩显示
	wrap 				在必要的时候换行
	wrap-reverse		在必要的时候换行，但是会反转
### align-content多行对齐方式
	前提：必须对父元素设置自由盒属性display:flex，并设置排列方式为flex-direction:row，并设置换行。
	flex-start			项目位于容器开头
	flex-end			项目位于容器结尾 
	center				项目位于容器中心
	stretch				项目被拉伸以适应容器高度
	space-between		
	space-around
### flex-flow
	flex-direction和flex-wrap的简写形式
	flex-flow：flex-direction flex-wrap
### order控制子项目的排列顺序
	用数值大小来定义排列顺序，数值越小排的越前，默认是0
> [更多内容参考阮大文章](http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html)

## 网格布局Grid
相比起Flex布局只局限于单行一维布局，Grid可以对行列进行二维布局
```css
display: grid;
```
> 注意，设为网格布局以后，容器子元素（项目）的float、display: inline-block、display: table-cell、vertical-align和column-*等设置都将失效。

>[更多内容参考阮大文章](http://www.ruanyifeng.com/blog/2019/03/grid-layout-tutorial.html)

### 设置行宽、列宽
```css
grid-template-columns: 100px 100px 100px;
grid-template-rows: 100px 100px 100px;
```
### 设置行、列间距
```css
row-gap: 20px;
column-gap: 20px;
```
简写：gap: row column;
### 单元格布局
```css
justify-items: start | end | center | stretch;
align-items: start | end | center | stretch;
```
简写：place-items: align justify;

### 整块内容布局
```css
justify-content: start | end | center | stretch | space-around | space-between | space-evenly;
align-content: start | end | center | stretch | space-around | space-between | space-evenly;  
```
简写：place-content: align justify

## 适配问题
### vw 和 rem
1. 1em等于一倍父元素的字体的大小
2. 1rem等于一倍根元素（html标签）的字体的大小
3. 1vw等于1%的viewport宽
4. 1vh等于1%的viewport高  

开发移动端页面时，需要注意的是不同手机设备的viewport都是有差异的。所以我们通常不会给元素一个固定像素的宽高，比如50px这种。否则可能页面在A手机上显示正常，再B手机上又不符合预期。

所以我们需要一个相对于viewport的单位，也就是vw了。

而以前使用rem来写移动端主要是历史原因了，早年各大浏览器对vw的单位还远不如今天这么完美。

以前的移动端开发通常使用rem单位配合淘系团队的flexible.js使用，flexisble.js这个库简单来说就是根据设备的不同，为根元素设置不同的font-size。又因为我们使用了rem单位，所以元素大小就和viewport相关联了。

总的来说就是以后只用vw就行了

### 媒体查询
	@media screen and (max-width: )