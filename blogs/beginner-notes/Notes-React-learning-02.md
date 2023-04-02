---
tags:
- React
date: 2021/08/25
---

# 「初学笔记」React（二）
## 一、路由
### 1、什么是路由？
- 一个路由就是一个映射关系(key:value)
- key为路径, value可能是function或component
### 2、路由是如何实现修改地址但不刷新页面的？
- 方法一：  
利用H5推出的history提供的API
- 方法二：  
利用hash值，即锚点，缺陷是地址上会显示#号

### 3、使用
- 3.1 安装react-router-dom  
  `npm i react-router-dom`
  react的一个插件库。  
  专门用来实现一个SPA应用。  
  基于react的项目基本都会用到此库。  
  - 内置对象  
```
<BrowserRouter>
<HashRouter>
<Route>
<Redirect>
<Link>
<NavLink>
<Switch>
```
- 3.2 引入路由组件  
  `import {Link, Route} from 'react-router-dom'`
  - 路由跳转链接链接  
    `<Link to='/test'>Test</Link>`
  - 注册路由  
    `<Route path='/test' component={Test} />`
  - 包裹BrowserRouter  
  Link和Route组件需要被包裹在同一个BrowserRouter，一劳永逸的办法：在App最外侧包裹  
  `<BrowserRouter><App /></BrowserRouter>`  
  或者  
  `<HashRouter><App /></HashRouter>`  
  使用HashRouter，在地址栏会出现#号

### 4、路由组件和一般组件
#### 4.1 写法不一样
一般组件：`<Demo>`  
路由组件：`<Route path="/demo" component ={Demo}/>`

#### 4.2 存放的位置一般不同
一般组件：components  
路由组件：pages

#### 4.3 接收的内容【props】
一般组件：写组件标签的时候传递什么，就能收到什么  
路由组件：接收到三个固定的属性 `history location match`
```
history:
    go: ƒ go(n)
    goBack: ƒ goBack()
    goForward: ƒ goForward()
    push: ƒ push(path, state)
    replace: ƒ replace(path, state)

location:
    pathname: "/about"
    search: ""
    state: undefined

match:
    params: {}
    path: "/about"
    url: "/about"
```


### 5、NavLink
普通路由链接
`<Link to='/test'>Test</Link>`
NavLink：  
- 被点击的链接被默认添加了一个类active，类名可以通过`activeClassName="newActive"`将active替换为newActive
- 可以通过this.props.children获取标签体内容，相当于vue的slot
`<NavLink to='/test'>Test</NavLink>`

### 6、Switch
Route的外层  
作用  
当有多个Route时，在匹配到相对应的Route时，不继续向下匹配