---
title: React hooks
date: 2023-02-20
categories:
- [Notes]
tags:
- react
- hooks
---

## 一、[react-query](https://tanstack.com/query/latest)
[GitHub地址]()
### 1、介绍
react-query 是一个异步状态管理的hook，内置了loading,error等状态，无疑是管理服务器状态的最佳库之一。

### 2、为什么
提供了很多便利的API（例如无限加载，分页等等，不需要开发者自己再去维护很多状态

### 3、使用
#### 3.1、useQuery
useQuery接收两个参数，第一个是唯一表示key，第二个是一个fetch的异步函数。
key是一个唯一的字符串，用来标识query，key还可以是个数组，存放query的一些依赖变量，当依赖发生变化时会重新发起请求。
> key最好传递一个数组，即使它可以是字符串，但最终它还是会被处理成数组。
```tsx
const { getTodos } from '.../todo-api'

const Todos = (props) => {
  const { isLoading, error, data } = useQuery(
    queryKey: ['todos', id], 
    queryFn: getTodos,
    // react-query也提供了转换器，并且也只在有数据的时候才会被调用
    { select: useCallback(
      (data) => data.map(todo => {
        // ...
      }),
      []
    ) }
  );
  
  // isLoading是没有缓存时的加载，是指在内存中没有该缓存时的加载。
  if(isLoading) return 'data loading...'

  // isFetching是每次请求时的加载。
  if(isFetching) return 'data loading...'

  // 网络请求遇到了异常，可以通过error属性获取异常对象；
  if(error) return 'something error'

  // 接口返回数据
  return (
    ...
  )
}

```

## 二、[ahooks](https://ahooks.js.org/zh-CN/)
[GitHub地址](https://github.com/alibaba/hooks)

## 三、[useHooks](https://usehooks.com/)
[GitHub地址](https://github.com/uidotdev/usehooks)

## 四、[react-use](https://github.com/streamich/react-use)
[GitHub地址]()

## 五、[SWR](https://swr.vercel.app/zh-CN)
[GitHub地址](https://github.com/vercel/swr)

## 六、[beautiful-react-hooks](https://antonioru.github.io/beautiful-react-hooks/)
[GitHub地址](https://github.com/antonioru/beautiful-react-hooks)

[中文文档](https://github.com/antonioru/beautiful-react-hooks/blob/master/docs/README.zh-CN.md)

## 七、react-hanger
[GitHub地址](https://github.com/kitze/react-hanger)

## 八、[react-use-gesture](https://use-gesture.netlify.app/docs/)
[GitHub地址](https://github.com/pmndrs/use-gesture)

## 九、use-scroll-position
[GitHub地址](https://github.com/n8tb1t/use-scroll-position)

## 十、[react-use-form-state](https://react-use-form-state.vercel.app/)
[GitHub地址](https://github.com/wsmd/react-use-form-state)