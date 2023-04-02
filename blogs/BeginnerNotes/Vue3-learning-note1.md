---
title: Vue3：learning_note（一）
tags:
- Vue
- Vue3
date: 2021/05/31
---

[Vue3.0 中文文档](https://v3.cn.vuejs.org/guide/introduction.html)
[Vue3.0 代码转换](https://vue-next-template-explorer.netlify.app/#%7B%22src%22%3A%22%3Cdiv%3E%5Cr%5Cn%20%20%3Cdiv%20%40click%3D%5C%22onClick%5C%22%3Eclick%3C%2Fdiv%3E%5Cr%5Cn%20%20%3Cdiv%20%40click%3D%5C%22onClick1%5C%22%3Eclick1%3C%2Fdiv%3E%5Cr%5Cn%20%20%3Cinput%20%40keyup.enter%3D%5C%22submit%5C%22%20%2F%3E%5Cr%5Cn%3C%2Fdiv%3E%22%2C%22options%22%3A%7B%22mode%22%3A%22module%22%2C%22filename%22%3A%22Foo.vue%22%2C%22prefixIdentifiers%22%3Afalse%2C%22hoistStatic%22%3Atrue%2C%22cacheHandlers%22%3Afalse%2C%22scopeId%22%3Anull%2C%22inline%22%3Afalse%2C%22ssrCssVars%22%3A%22%7B%20color%20%7D%22%2C%22compatConfig%22%3A%7B%22MODE%22%3A3%7D%2C%22whitespace%22%3A%22condense%22%2C%22bindingMetadata%22%3A%7B%22TestComponent%22%3A%22setup%22%2C%22foo%22%3A%22setup%22%2C%22bar%22%3A%22props%22%7D%2C%22optimizeImports%22%3Afalse%7D%7D)

# 静态标记（PatchFlag）
Vue3 中仅对会发生变化的虚拟DOM进行标记，该标记称为**静态标记**
```html
<div>
  <p>Xmo</p>
  <p>Xmo</p>
  <p>Xmo</p>
  <p>{{msg}}</p>
</div>
```
```js
import { createVNode as _createVNode, toDisplayString as _toDisplayString, openBlock as _openBlock, createBlock as _createBlock } from "vue"

export function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (_openBlock(), _createBlock("div", null, [
    _createVNode("p", null, "Xmo"),
    _createVNode("p", null, "Xmo"),
    _createVNode("p", null, "Xmo"),
    _createVNode("p", null, _toDisplayString(_ctx.msg), 1 /* TEXT */)
  ]))
}
```

上面例子中，Vue3 对 text文本做了静态标记，标记为1
```js
_createVNode("p", null, _toDisplayString(_ctx.msg), 1 /* TEXT */)
```

因此，Vue3 可以通过不同的标记来得知当前节点要比对的具体内容
{% note success %}当数据发生改变时，Vue2会对虚拟DOM进行全量对比，而Vue3只比对带有 PF 的节点进行对比{% endnote %}

# 静态提升
Vue3.0 会对未被静态标记的元素做静态提升，这些元素只会被创建一次，在渲染时直接复用

同样的html结构，以下是静态提升之后的效果
```js
const _hoisted_1 = /*#__PURE__*/_createVNode("p", null, "Xmo", -1 /* HOISTED */)
const _hoisted_2 = /*#__PURE__*/_createVNode("p", null, "Xmo", -1 /* HOISTED */)
const _hoisted_3 = /*#__PURE__*/_createVNode("p", null, "Xmo", -1 /* HOISTED */)

export function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (_openBlock(), _createBlock("div", null, [
    _hoisted_1,
    _hoisted_2,
    _hoisted_3,
    _createVNode("p", null, _toDisplayString(_ctx.msg), 1 /* TEXT */)
  ]))
}
```
# 事件侦听器缓存
OnClick会被视为动态绑定，所以Vue每次更新都会追踪它的变化
但很明显，我们不希望这个属性被标记为动态，直接缓存复用即可

```html
<div>
  <div @click="onClick">click</div>
  <div @click="onClick1">click1</div>
  <input @keyup.enter="submit" />
</div>
```
```js
export function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (_openBlock(), _createBlock("div", null, [
    _createVNode("div", { onClick: _ctx.onClick }, "click", 8 /* PROPS */, ["onClick"]),
    _createVNode("div", { onClick: _ctx.onClick1 }, "click1", 8 /* PROPS */, ["onClick"]),
    _createVNode("input", {
      onKeyup: _withKeys(_ctx.submit, ["enter"])
    }, null, 40 /* PROPS, HYDRATE_EVENTS */, ["onKeyup"])
  ]))
}
```
可以看到，click被静态标记，标记为8，进行事件侦听器缓存后
```js
export function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (_openBlock(), _createBlock("div", null, [
    _createVNode("div", {
      onClick: _cache[1] || (_cache[1] = (...args) => (_ctx.onClick && _ctx.onClick(...args)))
    }, "click"),
    _createVNode("div", {
      onClick: _cache[2] || (_cache[2] = (...args) => (_ctx.onClick1 && _ctx.onClick1(...args)))
    }, "click1"),
    _createVNode("input", {
      onKeyup: _cache[3] || (_cache[3] = _withKeys((...args) => (_ctx.submit && _ctx.submit(...args)), ["enter"]))
    }, null, 32 /* HYDRATE_EVENTS */)
  ]))
}
```
可以发现，静态标记被移除了，但我们还能发现

{% note warn %}只要监听了除了 click 以外的方法，都会添加 32 事件监听静态标记{% endnote %}
