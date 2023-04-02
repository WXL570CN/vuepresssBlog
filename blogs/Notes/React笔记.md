---
title: React笔记
date: 2022/06/04 
tags:
- React
---

## useImperativeHandle
`useImperativeHandle` 需搭配 `forwardRef` 一起使用

```
// 父组件
const testRef =  useRef(null)
const getList = () => {
  const list = testRef.current.getList()
}
return {
 <Child ref={testRef} />  \
}

// 子组件
const Child = react.forwardRef(props, ref) {
  const [list, setList] = useState([])
    useImperativeHandle(ref, () => ({
      getList: () => {
          return [...list];
      },
      changeList: (copyList) => {
          setList([...copyList]);
      },
    }));
}
```


## useRef
因为在函数式组件里没有了 `this` 来存放一些实例的变量，所以 React 建议使用 `useRef` 来存放一些会发生变化的值，`useRef` 并不再单单是为了 DOM 的 ref 准备的，同时也会[用来存放组件实例的属性](<https://link.zhihu.com/?target=https%3A//reactjs.org/docs/hooks-faq.html%23is-there-something-like-instance-variables>)。

## `useLayoutEffect`
`useLayoutEffect` (等效于 `didMount` 和 `didUpdate`)

## `connect`和`forwardRef`冲突解决方案

再封装一层

```js
const A = (props)  => {
	const { refInstance } = props

	useImperativeHandle(refInstance, () => ({
      ...
    }));
}

const APackage = Form.create()(connect(mapStateToProps)(A));

export default forwardRef((props, ref) => (
	<APackage {...props} refInstance={ref} />
));
```