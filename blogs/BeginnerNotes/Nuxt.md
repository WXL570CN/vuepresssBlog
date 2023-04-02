---
title: Nuxt.js
date: 2021/06/22
tags:
- Nuxt
---

## 一、nuxt.config.js
### head
该配置项用于配置应用默认的 meta 标签。
Nuxt.js 使用了 [vue-meta](https://github.com/nuxt/vue-meta) 更新应用的 头部标签(Head) 和 html 属性。  
[vue-meta 配置文档](https://vue-meta.nuxtjs.org/api/#metainfo-properties)

#### htmlAttrs
```json
htmlAttrs: {
  lang: 'zh-CN',  // 设置网站语言
},
```

## 二、布局 layouts
引入方式：
`layout: '布局文件名'`  
可当成page使用，可以使用全部的生命周期

## 三、中间件 middleware
页面渲染前执行  

接收 context 作为第一个参数  
```js
export default function (context) {}
```

也就是说Vuex，router, route等在这里是可用的

引用方式：
`middleware: ''`
或
`middleware: ['中间件文件名1', '中间件文件名2']`

可用于 nuxt.config.js 、 layouts 或者 pages 中使用中间件:
```js
module.exports = {
  router: {
    middleware: 'stats'  // 每个路由改变时被调用
  }
}
```

不同地方引用的 middleware 也有先后执行顺序
1. nuxt.config.js
2. 匹配布局
3. 匹配页面

## 四、plugins
运行 js 插件，如axios的封装，第三方库的引入

### 1、往 Vue实例 中注入方法  
`plugins/vue-inject.js:`
```js
import Vue from 'vue'

Vue.prototype.$myInjectedFunction = string =>
  console.log('This is an example', string)
```
`nuxt.config.js:`
```js
export default {
  plugins: ['~/plugins/vue-inject.js']
}
```
使用
```js
this.$myInjectedFunction('test')
```

### 2、向 context 中注入方法
`plugins/ctx-inject.js:`
```js
export default ({ app }) => {
  app.myInjectedFunction = string =>
    console.log('Okay, another function', string)
}
```
使用
```js
asyncData(context) {
  context.app.myInjectedFunction('ctx!')
}
```
### 3、同时向Vue实例、context、Vuex注入
利用plugin导出函数的第二个参数 `inject`  
`plugins/combined-inject.js:`
```js
export default ({ app }, inject) => {
  inject('myInjectedFunction', string => console.log('That was easy!', string))
}
```
在Vue实例中通过`$方法名`调用  
Vuex的 actions/mutations 方法中的 this 可以调用 myInjectedFunction 方法

## store
拆分文件模块时，必须使用箭头函数  
我更喜欢根据功能划分文件而不是划分成 `state.js,actions.js,mutations.js和getters.js`
`store/todo.js`
```js
export const state = () => ({
  list: []
})

export const mutations = {
  add(state, text) {
    state.list.push({
      text,
      done: false
    })
  },
}
```
调用mutations中的方法
```js
...MapMutations('toto', ['add'])
// 若是调用 store/index 中的方法，
// ...MapMutations(['add'])
// 或
...mapMutations({
  add: 'todos/add' // 可重命名
})
```

### fetch 方法
fetch 方法会在渲染页面前被调用，作用是填充状态树 (store) 数据
