---
title: 实现多行文本溢出隐藏效果
date: 2021-06-02 09:18:55
categories:
- [Css]
- [JavaScript]
tags:
- Css
- JavaScript
- line-hidden
---

```css
<p>
  这是一段测试文字，这是一段测试文字，这是一段测试文字，这是一段测试文字。
</p>
```
## 单行文本溢出隐藏
```css
overflow: hidden;
text-overflow: ellip;
white-space: nowrap;
```
## 多行文本溢出隐藏
- 实现方式有两种
   - 1、Css，添加伪类 '...'，用定位的方式将文本超出部分盖住达到隐藏效果
   - 2、JavaScript，将文本切割，超出时加入 '...'
### Css方式
```css
p {
  display: -webkit-box;
  overflow: hidden;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3; 
}
```
兼容写法  
```css
p {
  position: relative;
  line-height: 20px;
  max-height: 40px;
  overflow: hidden;
}
p::after {
  content: "...";
  position: absolute;
  bottom: 0;
  right: 0;
  padding-left: 40px;
  background: -webkit-linear-gradient(left, transparent, #fff 55%);
  background: -o-linear-gradient(right, transparent, #fff 55%);
  background: -moz-linear-gradient(right, transparent, #fff 55%);
  background: linear-gradient(to right, transparent, #fff 55%);
}
```
> 缺陷：不管文本超不超出，都会显示省略号，所以还需要配合JavaScript来判断是否显示省略号  

### JavaScript方式
```js
const p = document.querySelector('p')
let words = p.innerHTML.split(/(?<=[\u4e00-\u9fa5])|(?<=\w*?\b)/g)
while (p.scrollHeight > p.clientHeight) {
  words.pop()
  p.innerHTML = words.join('') + '...'
}
```