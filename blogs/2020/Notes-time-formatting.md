---
title: Notes---时间格式化 
date: 2020-10-23 09:32:02
categories:
- [Notes]
tags:
- [date format]
---

安装 moment.js
```
npm i moment -S
```

在utils中新建 dateFormat.js
```js
import moment from 'moment'

// 毫秒级时间戳转换
export function formateMilliseconds(milliseconds, formateString) {
  return moment(milliseconds).format(formateString)
}

// 秒级时间戳转换
export function formateUnixTime(seconds, formateString) {
  return moment.unix(seconds).format(formateString)
}

// 当前时间转换
export function formateNow(formateString) {
  return moment().format(formateString)
}

// 转换成时间戳
export function dateStrToUnix(dateString) {
  return moment(dateString).unix()
}
```

<!--more-->

在文件中使用
引入
```js
import { formateUnixTime, formateNow } from '~/utils/dateFormat.js'

export default {
  filters: {
  	formateUnixTime(time, formate) {
  	return formateUnixTime(time, formate)
  },
  formateNow(formate) {
  	return formateNow(formate)
  },
},
```
使用
```js
formateUnixTime(时间戳, '要转换成的时间格式')
formateNow( '要转换成的时间格式')
```
