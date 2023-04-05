---
date: 2021/07/28 
tags:
- 面试
---

# 「面试」Vue

[牛客网最新前端面试题汇总之Vue篇](https://www.nowcoder.com/discuss/622394?type=all&order=time&pos=&page=1&ncTraceId=&channel=-1&source_id=search_all_nctrack)

## 双向数据绑定的原理
实现mvvm主要包含两个方面，数据变化更新视图，视图变化更新数据。
### 视图变化更新数据
view更新data，可以通过事件监听即可，比如input标签监听 'input' 事件就可以实现了。
### 数据变化更新视图
通过Object.defineProperty( )对属性设置一个set函数，当数据改变了就会来触发这个函数，所以我们只要将一些需要更新的方法放在这里面就可以实现data更新view了。
### 实现过程
我们已经知道实现数据的双向绑定，首先要对数据进行劫持监听，所以我们需要设置一个监听器Observer，用来监听所有属性。如果属性发上变化了，就需要告诉订阅者Watcher看是否需要更新。因为订阅者是有很多个，所以我们需要有一个消息订阅器Dep来专门收集这些订阅者，然后在监听器Observer和订阅者Watcher之间进行统一管理的。接着，我们还需要有一个指令解析器Compile，对每个节点元素进行扫描和解析，将相关指令对应初始化成一个订阅者Watcher，并替换模板数据或者绑定相应的函数，此时当订阅者Watcher接收到相应属性的变化，就会执行对应的更新函数，从而更新视图。  
因此接下去我们执行以下3个步骤，实现数据的双向绑定：
1. 实现一个监听器Observer，用来劫持并监听所有属性，如果有变动的，就通知订阅者。
2. 实现一个订阅者Watcher，可以收到属性的变化通知并执行相应的函数，从而更新视图。
3. 实现一个解析器Compile，可以扫描和解析每个节点的相关指令，并根据初始化模板数据以及初始化相应的订阅器。
![图片](https://pic2.zhimg.com/v2-057b896f2006500cb44b1569bc1e6ee5_b.jpg)

## 常见的事件修饰符及其作用
- `.stop` ：等同于 JavaScript 中的 event.stopPropagation() ，防止事件冒泡；  
- `.prevent` ：等同于 JavaScript 中的 event.preventDefault() ，防止执行预设的行为（如果事件可取消，则取消该事件，而不停止事件的进一步传播）；  
- `.capture` ：与事件冒泡的方向相反，事件捕获由外到内；  
- `.self` ：只会触发自己范围内的事件，不包含子元素；  
- `.once` ：只会触发一次

## 兄弟组件之间的传值
### 方式一：eventBus
- **Vue实例 event.js**
```js
// 创建一个vue实例，让各个兄弟共用同一个事件机制
import Vue from 'vue'
export default new Vue
```
- **组件A BrotherA.vue**
```html
<input @click='toB' />
```
```js
// 引入 event.js
import eventVue from 'event.js'
```
```js
methods: {
  toB() {
    eventBus.$emit('toB', 'this is from A!')
  }
}
```
- **组件B BrotherB.vue**
```js
// 引入 event.js
import eventVue from 'event.js'
```
```
created() {
  eventBus.$on('toB',(fromA)=>{
    console.log(fromA)
  })
}
```

### 方式二：[Vuex](https://codesandbox.io/s/pensive-currying-b6szw?fontsize=14&hidenavigation=1&module=%2Fsrc%2Fcomponents%2FHelloWorld.vue&theme=dark)
- **store对象**
```js
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

var store = new Vuex.Store({
    state:{
        toB: ''
    }，
    mutations: {
      // 向 store.commit 传入额外的参数，即 mutation 的 载荷（payload）
      // 在大多数情况下，载荷应该是一个对象，这样可以包含多个字段并且记录的 mutation 会更易读：
      hello(state, fromA) {
        state.toB = fromA.value
      }
    }
});

export default store;
```
- **组件A BrotherA.vue**
```js
<input type="button"@click="toB">
```
```js
import store from "../store";
```
```js
data() {
  return {
    fromA: {
      value: 'hello, this if form A!'
    }
}
store:store,
methods: {
  toB() {
    store.commit('hello', this.fromA)
  }
}
```
- **组件B BrotherB.vue**
```html
<h1>{{ fromA }}</h1>
```
```js
import store from "../store";
```
```
store,
computed: {
  fromA() {
    return this.$store.state.toB
  }
}
```

### 依赖注入（project / inject）

### ref / refs

### $parents和$children

### vuex

### $attrs和$listeners和$emit
- $attrs：继承所有的父组件属性（除了prop传递的属性、class 和 style ），一般用在子组件的子元素上
- $listeners：该属性是一个对象，里面包含了作用在这个组件上的所有监听器，可以配合 v-on="$listeners" 将所有的事件监听器指向这个组件的某个特定的子元素。（相当于子组件继承父组件的事件）
- $emit：调用父组件绑定的方法

## 谈谈对 SPA 和 SSR 的理解
[面试题十八：谈谈对SPA和SSR的理解？](https://course.51qux.com/2293.html)
