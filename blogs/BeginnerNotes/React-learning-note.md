---
title: React：learning_note（一）
tags:
- React
date: 2021/07/12
---

## 一、使用脚手架
`npx create-react-app 项目名`

## 二、组件的创建
### 1、函数创建
- 函数名必须首字母大写
- 必须返回组件的结构（结构使用jsx语法）
```js
function Hello(){
  return (
    <div>Hello, React.</div>
  )
}
```

### 2、类创建
- 类名必须大写
- 继承父类React.Component
- 类必须提供 render() 方法
- render() 方法必须返回组件的结构（结构使用jsx语法）
```js
class Hello extends React.Componnet {
  render () {
    return (
      <div>Hello, React.</div>
    )
  }
}
// 挂载到dom节点
ReactDom.render(<Hello />, root)
```

## 三、无状态组件和有状态组件
- 函数组件 --> 无状态组件， 类组件 --> 有状态组件
- 状态即数据

## 四、事件绑定
- 语法：on + 事件名称 = {事件函数}
- 驼峰命名

## 五、state（状态）
相当于Vue里面的data
```js
class Hello extends React.Componnet {
  // constructor() {
  //   // 语法要求
  //   super()
  //   this.state = {
  //     msg: 'hello',
  //   }
  // }
  // 简化
  state = {
    msg: 'hello',
  }
}
```

### setState()修改状态
```js
class Hello extends React.Componnet {
  constructor(props) {
    super(props);
    this.state = {msg: 'hello',};

    // 为了在回调中使用 `this`，这个绑定是必不可少的
    this.msgHandle = this.msgHandle.bind(this);
  }
  msgHandle() {
    // 当前this如果不经过绑定，是 undefined
    this.setState(state => ({
      msg: `${state.msg}, Jack`
    }))
  }
  render() {
    return (
      <div>
        <div>{ this.state.msg }</div>
        <button onClick={this.msgHandle}>
          打招呼
        </button>
      </div>
    )
  }
}
```

### this的指向性问题
上面代码写法没法用 state简化，且必须绑定 this  
箭头函数  
箭头函数本身没有this，谁调用的箭头函数，则函数内的this指向谁  
- 方式一：利用这个特性，我们在方法调用时可以使用箭头函数
```js
class Hello extends React.Componnet {
  state = {
    msg: 'hello',
  }
  msgHandle() {
    this.setState(state => ({
      msg: `${state.msg}, Jack`
    }))
  }
  render() {
    return (
      <div>
        <div>{ this.state.msg }</div>
        // 箭头函数调用
        <button onClick={() => this.msgHandle()}>
          打招呼
        </button>
      </div>
    )
  }
}
```
- 方式二：函数使用箭头函数形式定义
> 该语法为实验性语法，但由于babel的存在可以直接使用
```js
class Hello extends React.Componnet {
  state = {
    msg: 'hello',
  }
  // 箭头函数定义
  msgHandle = () => {
    this.setState(state => ({
      msg: `${state.msg}, Jack`
    }))
  }
  render() {
    return (
      <div>
        <div>{ this.state.msg }</div>
        <button onClick={this.msgHandle}>
          打招呼
        </button>
      </div>
    )
  }
}
```

## 六、表单数据绑定
### 受控组件
```js
class Hello extends React.Componnet {
  state = {
    msg: 'hello',
  }
  // 箭头函数定义
  msgHandle = (e) => {
    const {value, name} = e.target
    this.setState(state => ({
      // 引用变量
      [name]: value
    }))
  }
  render() {
    return (
      <div>
        <input type="text" name="msg" value={this.state.msg} onChange={this.msgHandle} />
      </div>
    )
  }
}
```

### ref
```js
class Hello extends React.Componnet {
  constructor() {
    super();
    // 创建ref
    this.msgRef = React.createRef()
  }
  msgHandle = () => {
    console.log('文本框内容为：', this.msgRef.current.value)
  }
  render() {
    return (
      <div>
        <input type="text" ref={ this.msgRef } />
        <button onClick={ this.msgHandle }>
          获取文本框的值
        </button>
      </div>
    )
  }
}
```

## 七、JSX语法
### 1、条件渲染
```JSX
{
  a ? (<div></div>) : (<input />)
}
```

### 2、列表渲染
`map()`
```html
<ul>
  {
    this.state.arr.map((item, index) => {
      <li :key={index}>
        {item.value}
      </li>
    })
  }
</ul>
```

## 八、props
### 1、特性
- 可传任何类型的数据
- 只读
- 在类组件中，如果有constructor， 则props需要传递给super()，否则在构造函数内无法使用props

```js
// 字符串
name="hello"
// 数值
age={19}
// 数组
colors={[blue, black, white]}
// 函数
fn={() => console.log('hello')}
// JSX
hm={<h1>Hello</h1>}

constructor(props){
  super(props);
}
```

### 2、获取props
函数组件通过参数`props`接受数据  
类组件通过`this.props`接受数据
### 3、children
当使用组件时，当组件内部有内容时，组件中可通过props.children读取到该内容（类似Vue的slot）
```js
// 使用Child组件
<Child>我是一个组件</Child>

// Child组件内部
this.props.children === '我是一个组件'  // true
```

### 3、类型约束
```js
// 下载包  
npm install prop-types
// 使用
import PropTypes from 'prop-types'

function App(props) {}

// 指定props类型
App.propTypes = {
  // 常见类型：array, bool, func, number, object, string
  props名: props类型(PropTypes.array)
  // 设置为必填：isRequired
  props名: PropTypes.array.isRequired
}
```

## 九、组件间的数据传递
### 父 --> 子
传递数据props
### 子 --> 父
传递方法props
### 兄弟组件
- 方案一：将数据存放到两个组件的父组件  
- 方案二：消息订阅-发布机制
  - 安装工具库PubSubJS：`npm i pubsub-js -S`
  - 引入：`import PubSub from 'pubsub-js'`
  - 发布：`PubSub.publish('标识'), data)`
  - 接收：`PubSub.subscribe('标识', function(data){}`
  - 卸载：`PubSub.unsubscribe()`
### 祖孙甚至更深层嵌套关系的组件
Context
```js
// 通过React.createContext创建两个组件：Provider（数据提供），Consumer（数据使用）
const {Provider, Consumer} = React.createContext()

// 使用Provider作为父组件，并通过value作为props进行传递
<Provider value="propsData">
  <Child />
</Provider>

// 在需要使用数据的组件中通过Consumer使用数据
// Child组件
<div>
  <Consumer>
    {
      data => <span>{ data }<span>
    }
  </Consumer>
</div>
```