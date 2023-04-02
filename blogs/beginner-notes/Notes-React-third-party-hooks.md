---
date: 2023/02/20
tags:
  - react
  - hooks
---

# 「初学笔记」React第三方hooks

## 一、[react-query](https://tanstack.com/query/latest)

[GitHub 地址](https://github.com/TanStack/query)

### 1、介绍

react-query 是一个异步状态管理的 hook，内置了 loading,error 等状态，提供了很多便利的 API（例如无限加载，分页等等，不需要开发者自己再去维护很多状态。

### 2、使用

#### 2.1、准备工作

需要使用 react-query 的组件，其父组件需要被包裹在`QueryClientProvider`内，建议直接包裹 App。

```js
import App from "./App";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

return (
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
);
```

#### 2.1、useQuery
当该组件被加载时，组件内的useQuery就会开始请求。  
useQuery 接收三个参数，第一个是唯一标识 key，第二个是一个 fetch 的异步函数，第三个参数为一些配置。  
key 是一个唯一的字符串，用来标识 query。  
key 还可以是个数组，存放 query 的一些依赖变量，当依赖发生变化时会重新发起请求。

> key 最好传递一个数组，即使它可以是字符串，但最终它还是会被处理成数组。
> key 数组第一个元素最好是唯一标识。

```tsx
const { getTodos } from '.../todo-api'

const Todos = (props) => {
  const { 
    data, //这个就是请求成功回来的数据
    isLoading, //true表示数据在获取的路上
    error,//错误对象，如果存在则包含相关的错误信息
    refetch，//这个还挺实用的，你可以在需要的地方或需要更新数据时调用，则会触发这个请求，比如enabled=false时
  } = useQuery(
    queryKey: ['todos', id],
    queryFn: getTodos,
    // react-query也提供了转换器，并且也只在有数据的时候才会被调用
    {
      select: useCallback(
        (data) => data.map(todo => {
          // ...
        }),
        []
      ),
      // enable：传入的值类型必须是Boolean，当参数值为false时，将会禁止请求接口
      enable: !!id,
      retry, //请求失败后，请求的重试次数，也可以为boolean，true为无数次重试，false则不会重试
      refetchOnWindowFocus，//页面取得焦点时，重新获取数据，默认为true
      staleTime, //指定缓存时长，以毫秒为单位。
    }
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

#### 2.2、useQueries
> 动态生成请求

```jsx
import { useQueries } from "react-query";

const App = () => {
  const [query, setQuery] = useState(["a", "b"]);

  const getData = (queryItem) => fetch(`.../${queryItem}/...`).then((res) => res.json());

  const list = useQueries({
    queries: query.map((item) => {
      return {
        queryKey: ["query", ...query],
        queryFn: () => getData(item),
      };
    }),
  });

  return (
    <div>
      <button onClick={() => setUsers(["c", "d"])}>
        更改获取用户      
      </button>
      {list.map((item) =>
        item.isLoading ? <div>加载中....</div> : <div>{item.data}</div>
      )}
    </div>
  );
};
```

#### 2.3、useInfiniteQuery
用于无限加载的列表，非常强大，让构建无限加载组件变得简单。

## 二、[ahooks](https://ahooks.js.org/zh-CN/)

[GitHub 地址](https://github.com/alibaba/hooks)

## 三、[useHooks](https://usehooks.com/)

[GitHub 地址](https://github.com/uidotdev/usehooks)

## 四、[react-use](https://github.com/streamich/react-use)

[GitHub 地址]()

## 五、[SWR](https://swr.vercel.app/zh-CN)

[GitHub 地址](https://github.com/vercel/swr)

## 六、[beautiful-react-hooks](https://antonioru.github.io/beautiful-react-hooks/)

[GitHub 地址](https://github.com/antonioru/beautiful-react-hooks)

[中文文档](https://github.com/antonioru/beautiful-react-hooks/blob/master/docs/README.zh-CN.md)

## 七、react-hanger

[GitHub 地址](https://github.com/kitze/react-hanger)

## 八、[react-use-gesture](https://use-gesture.netlify.app/docs/)

[GitHub 地址](https://github.com/pmndrs/use-gesture)

## 九、use-scroll-position

[GitHub 地址](https://github.com/n8tb1t/use-scroll-position)

## 十、[react-use-form-state](https://react-use-form-state.vercel.app/)

[GitHub 地址](https://github.com/wsmd/react-use-form-state)
