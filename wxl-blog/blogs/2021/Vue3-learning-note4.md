---
title: Vue3---learning_note（四）
categories:
  - Vue
tags:
- Vue
- Vue3
date: 2021-06-01 14:03:34
---

# Teleport
传送门组件提供一种简洁的方式，可以指定它里面内容的父元素
简单点说就是可以指定teleport里的内容出现在什么位置
下面是一个例子，一个控制弹窗显示组件
弹窗的父元素是body而不是com-box
```vue
<template>
  <div class="com-box">
    <button @click="alertIsShow = true">弹窗</button>
    // 弹窗
    <teleport to="body">
      <div v-if="alertIsShow" class="alert-box">
        <div class="alert-main">
          这是一个弹窗
          <button @click="alertIsShow = false">关闭</button>
        </div>
      </div>
    </teleport>
  </div>
</template>
```

# emits属性
Vue3中组件发送的自定义事件需要定义在emits选项中
为了解决自定义事件与原生事件重名导致触发两次的问题
```js
export default {
  // 用户定义的事件
  emits: ['click']
}
```