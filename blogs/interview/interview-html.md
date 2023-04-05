---
date: 2021/07/28 
tags:
- 面试
---

# 「面试」Html

## [Akara的博客](https://messiahhh.github.io/blog/docs/HTML)

## 脚本的加载
script脚本会阻塞html的解析
但多个script脚本的加载是并行的（同时）：因为实际上现代浏览器会对资源进行预解析，提前把html中要引用到的资源放进请求队列中。

## async 和 defer 的区别
```html
<script async ...></script>
<script defer ...></script>
```
`相同点`：不会阻塞html的解析  
`不同点`：
- `async`：html和脚本同时解析，脚本加载完成后立刻开始执行，会阻塞html解析
- `defer`：html和脚本同时解析，html解析完成后才会开始脚本的执行

## DOMContentLoaded和Load的区别
- `DOMContentLoaded`：
当初始的 HTML 文档被完全加载和解析完成之后，DOMContentLoaded 事件被触发，而无需等待样式表、图像和子框架的完成加载。  
- `Load`：
样式表、图像和子框架的完成加载， load 事件被触发。  

## href和src的区别
- `href`：
用于在当前文档和指定资源间确定联系  
- `src`：
下载资源并替换当前内容

## link和@import的区别
- `link`是XHTML提供的标签，不仅仅可以加载CSS。`@import`是CSS提供的语法规则，只能加载CSS。
- 加载页面时，`link标签`引入的 CSS 被同时加载；`@import`引入的 CSS 将在页面加载完毕后被加载。

## Doctype
Doctype声明位于文档中的最前面，处于html标签之前。告知浏览器的解析器，用什么文档类型规范来解析这个文档

## 重定向
### mata标签
- http-equiv="refresh"：告诉浏览器进行页面的跳转
- content：告知在多少秒后进行跳转，跳转的地址
```html
<!-- 此处为2s后重定向。 -->
<meta http-equiv="refresh" content='2;https://wxl570cn.github.io/my-blog/'>
```
### href
```js
location.href = 'https://wxl570cn.github.io/my-blog/'
```
### 响应状态码
```js
res.statusCode = 301 // or 302
res.setHeader('Location', 'https://wxl570cn.github.io/my-blog/')
```

## iframe 的优缺点？  
优点：  
- 解决加载缓慢的第三方内容如图标和广告等的加载问题  
- Security sandbox  
- 并行加载脚本  

缺点：  
- iframe 会阻塞主页面的 Onload 事件  
- 即时内容为空，加载也需要时间  
- 没有语意