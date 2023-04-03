---
date: 2021/06/02
tags:
- 文本溢出
---

# 「代码块」文本溢出

## CSS实现

### 单行文本溢出隐藏
:::: code-group
::: code-group-item HtTextOverflow.html
```html
<p class='ell'>
  网易公司（NASDAQ:NTES），1997年由创始人兼CEO丁磊先生在广州创办，2000年在美国NASDAQ股票交易所挂牌上市，是中国领先的互联网技术公司。在开发互联网应用、服务及其它技术方面，始终保持中国业界领先地位。
</p>
```
:::
::: code-group-item TextOverflow.scss
@[code{258-259}](@preview/init/common.css)

:::
::::

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