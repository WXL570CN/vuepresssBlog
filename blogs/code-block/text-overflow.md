---
date: 2021/06/02
tags:
- 文本溢出
---

# 「代码块」文本溢出

## CSS实现
```css
<p>
  这是一段测试文字，这是一段测试文字，这是一段测试文字，这是一段测试文字。
</p>
```
### 单行文本溢出隐藏
```css
overflow: hidden;
text-overflow: ellip;
white-space: nowrap;
```
### 多行文本溢出隐藏
> 使用`:checked`切换文本溢出
:::: code-group
::: code-group-item HtTextOverflow.html
@[code{2-16}](@preview/codeBlock/TextOverflow.vue)

:::
::: code-group-item TextOverflow.scss
@[code](@preview/codeBlock/TextOverflow.scss)

:::
::::

## JavaScript实现
```js
const p = document.querySelector('p')
let words = p.innerHTML.split(/(?<=[\u4e00-\u9fa5])|(?<=\w*?\b)/g)
while (p.scrollHeight > p.clientHeight) {
  words.pop()
  p.innerHTML = words.join('') + '...'
}
```