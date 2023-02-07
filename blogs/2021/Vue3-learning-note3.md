---
title: Vue3---learning_note（三）
categories:
  - Vue
tags:
- Vue
- Vue3
date: 2021-05-31 11:41:52
---

# 组合式API
当我们的组件中含有大量逻辑时，每个逻辑都有对应的数据以及逻辑代码，
这些代码可能分布在data、computed、methods、watch中，
因此我们关注某个逻辑时，关注点的列表会变得很长，导致组件难以阅读和理解，
尤其是对于那些一开始就没有编写这些组件的人来讲。
下图是官网给出的一个大型组件的示例，其中逻辑关注点是按颜色分组。
{% img https://v3.cn.vuejs.org/images/options-api.png %}

Vue3的解决方案是使用组合式 API，使用组合式API的地方叫 setup

## setup 组件选项
setup 组件选项在创建组件之前执行，一旦 props 被解析，就作为组合式 API 的入口点。

{% note warn %}
**Warning**
由于在执行 setup 时，组件实例尚未被创建，因此在 setup 选项中没有 this。这意味着，除了 props 之外，你将无法访问组件中声明的任何属性——本地状态、计算属性或方法。
{% endnote %}

## 带 ref 的响应式变量

### 什么是 ref
    Vue3中提供的实现响应式数据的方法
    由于reactive必须传递对象，所以为了使基本类型的变量实现响应式时
    Vue3提供了ref方法实现对基本类型的数据的监听
### 本质
    ref本质上还是reactive，底层会将ref自动转换成reactive
    ref(1) => reactive({value: 1})

> 关于ref， [具体请查看](https://juejin.cn/post/6844903960562630670)

## reactive
### 什么是reactive
    Vue3中提供的实现响应式数据的方法
    在Vue2中响应式数据是通过defineProperty来实现的
    而在Vue3中响应式数据是通过ES6的Proxy来实现的
### 注意点
    reactive参数必须是普通对象（JSON或者Array）

> 关于reactive， [具体请查看](https://juejin.cn/post/6844903969894973448)