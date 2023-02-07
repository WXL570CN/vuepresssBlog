---
title: Vue3---learning_note（二）
categories:
  - Vue
tags:
- Vue
- Vue3
date: 2021-05-31 11:30:46
---

# 项目创建

## Vite
Vite 的实现原理是利用 ES6 的 import 会发送请求去加载文件的特性，拦截这些请求，做一些预编译，省去 webpack 冗长的打包时间。

## 安装 Vite
```
npm install -g create-vite-app
```
## 利用 Vite 创建 Vue3 项目
```
  create-vite-app projectName
  cd projectName
  npm install
  npm run dev
```

## main.js 入口文件
```js
import { createApp } from 'vue'
import App from './App.vue'
import './index.css'
 
// 创建App组件并挂载到 #app 上
createApp(App).mount('#app')
```

Vue3 是基本兼容 Vue2 的，过去的语法这里依旧可以正常使用。