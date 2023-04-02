---
date: 2023/02/17
tags:
 - lang.js
 - moment.js
 - localStorage
---

# Utils

## 常用库
- [lodash.js：一个一致性、模块化、高性能的 JavaScript 实用工具库](https://www.lodashjs.com/)
- [moment.js：JavaScript 日期处理类库](http://momentjs.cn/)

## lang.js
```js
/**
 * @description: 判断字符串是否为空
 */
export const strEmpty = (value) => {
  return value === undefined || value === null || value === '';
}

/**
 * @description: 判断数值是否为空
 */
export const numEmpty = (value) => {
  return strEmpty(value) || value === 0
}

/**
 * @description: 回显变量
 */
const showValue = (value, fixed) => {
  if (strEmpty(value)) {
    return '--';
  }
  return value;
}

/**
 * @description: 将传入变量（有可能为空、非数值）保留n位小数
 */
export const toFixed = (value, decimals = 2) => {
  if (strEmpty(value)) return '--;
  if (isNaN(value)) return value;
  return Number(value).toFixed(decimals);
};

/**
 * @description: 判断字符串中是否包含字母
 */
export const hasLetter = (str) => {
  for (const i in str) {
    const asc = str.charCodeAt(i);
    if ((asc >= 65 && asc <= 90) || (asc >= 97 && asc <= 122)) {
      return true;
    }
  }
  return false;
}

/**
 * @description: 将小数的经纬度转化成度分秒
 */
export const formatDegree = (value, isLng, extra = {}) => {
  // returnObj：返回度分秒
  // second：是否返回秒
  const { returnObj = false, second = true } = extra
  const absValue = Math.abs(value);
  const v1 = Math.floor(absValue); // 度
  const v2 = second ? Math.floor((absValue - v1) * 60) : ((absValue - v1) * 60).toFixed(4) // 分
  const v3 = (((absValue - v1) * 3600) % 60).toFixed(1); // 秒
  // eslint-disable-next-line no-nested-ternary
  if (returnObj) return {
    degree: v1,
    minute: v2,
    second: v3,
  };
  return `${v1}°${v2}'${second ? `${v3}"` : ''}${value > 0 ? (isLng ? 'E' : 'N') : isLng ? 'W' : 'S'
    }`;
}

/**
 * @description: 将度分秒转化成小数的经纬度
 */
export const formatTransform = (arg1, arg2, arg3, arg4) => {
  const arg = Number(arg1) + arg2 / 60 + arg3 / 3600;
  if (arg4 === 'W' || arg4 === 'S') {
    return -arg;
  }
  return arg;
}

/**
 * @description: 将常量中的对象常量转换为数组（用于下拉框）
 * @param {*} constantObj：传入的对象（{ name: { value: '', text: '' } }）
 * @param {*} addAll：是否添加全部
 */
export const objectToOptions = (constantObj, addAll = false) => {
  const _options = Object.values(constantObj)
  if (addAll) {
    const allItem = {
      value: '',
      text: '全部',
    }
    _options.unshift(allItem)
  }
  return _options
};

/**
 * @description: 通过value获取对应常量中的匹配项（默认返回text）
 * @param {*} options：传入的常量格式
 * 格式一：[{ [name]: { value: '', text: '' } }]
 * 格式二：[{ value: '', text: '' }]
 * @param {*} value：要查找的value
 * @param {*} keyName：要返回的值对应的key
 * returnObj 为 true 时 keyName 无效
 * @param {*} returnObj：是否返回匹配上的对象
 */
export const getOptionsMatch = (options, value, extra = {}) => {
  const { keyName = 'text', valueName = 'value', returnObj = false } = extra || {}
  const _options = isArray(options) ? options : Object.values(options)
  const res = _options.find(item => `${item[valueName]}` === `${value}`) || {}
  if (returnObj) return res
  return res[keyName] || '--'
}

/**
 * @description: 获取DOM
 */
export const $ = (selector) => {
  return document.querySelector(selector)
}

/**
 * @description: 获取缩放比例
 * 物体宽高：width, height
 * 容奇宽高：boxWidth, boxHeight
 */
export const getScale = (width, height, boxWidth, boxHeight) => {
  const scale = width / height
  const boxScale = boxWidth / boxHeight
  if (boxScale > scale) {
    return boxHeight / height
  }
  return boxWidth / width
}

```

## dateFormater.js（依赖*moment.js*）
```js
import moment from 'moment';
import { strEmpty, numEmpty } from './lang';

// 日期格式类型
export const DATE_FORMAT_TYPE = {
  YMD: 'YYYY-MM-DD', // 年月日
  YMDH: 'YYYY-MM-DD HH', // 年月日-时
  YMDHM: 'YYYY-MM-DD HH:mm', // 年月日-时分
  YMDHMS: 'YYYY-MM-DD HH:mm:ss', // 年月日-时分秒
  YMD_START: 'YYYY-MM-DD 00:00:00',
  YMD_END: 'YYYY-MM-DD 23:59:59',
};

/**
 * @description: 将时间对象转换成易读格式（YYYY年-MM月-DD日 HH时mm分ss秒）
 */
export function dateFormat(date = moment(), formatString = DATE_FORMAT_TYPE.YMDHMS) {
  return moment(date).format(formatString);
}

/**
 * @description 时长格式化（将一段时长转换为几年几月几日几分几时几秒的格式）
 * @val 传入的时长
 * @type 传入时长的单位（years/months/weeks/days/hours/minutes/seconds）
 * @placeholder 数值为空时的占位符
 * @notShow 列表，不显示的单位
 */
export function formatDuration({
  value,
  type,
  placeholder = '--',
  notShow = [],
  defaultUnit = 'h'
}) {
  if (strEmpty(value)) return placeholder;
  if (isNaN(value)) return value
  if (value === 0) return `${value}${defaultUnit}`
  let years = moment.duration(value, type).years();
  years = !numEmpty(years) && !notShow.includes(type) ? `${years}y` : '';
  let days = moment.duration(value, type).days();
  days = !numEmpty(days) && !notShow.includes(type) ? `${days}d` : '';
  let hours = moment.duration(value, type).hours();
  hours = !numEmpty(hours) && !notShow.includes(type) ? `${hours}h` : '';
  let minutes = moment.duration(value, type).minutes();
  minutes = !numEmpty(minutes) && !notShow.includes(type) ? `${minutes}m` : '';
  let seconds = moment.duration(value, type).seconds();
  seconds = !strEmpty(seconds) && !notShow.includes(type) ? `${seconds}s` : '';
  return `${years}${days}${hours}${minutes}${seconds}`;
}

/**
 * @description: 毫秒级时间戳转换成易读格式（YYYY年-MM月-DD日 HH时mm分ss秒）
 */
export function formateMilliseconds(milliseconds, formateString = DATE_FORMAT_TYPE.YMDHMS) {
  return moment(milliseconds).format(formateString);
}

/**
 * @description: 秒级时间戳转换成易读格式（YYYY年-MM月-DD日 HH时mm分ss秒）
 */
export function formateUnixTime(seconds, formateString = DATE_FORMAT_TYPE.YMDHMS) {
  return moment.unix(seconds).format(formateString);
}

/**
 * @description: 当前时间转换成易读格式（YYYY年-MM月-DD日 HH时mm分ss秒）
 */
export function formateNow(formateString = DATE_FORMAT_TYPE.YMDHMS) {
  return moment().format(formateString);
}

/**
 * @description: 将易读格式时间字符串（YYYY年-MM月-DD日 HH时mm分ss秒）转换成时间戳（秒级）
 */
export function dateStrToUnix(dateString) {
  return moment(dateString).unix();
}

/**
 * @description: 将易读格式时间字符串（YYYY年-MM月-DD日 HH时mm分ss秒）转换成时间戳（毫秒级）
 */
export function dateStrToMillisecond(dateString) {
  return moment(dateString).valueOf();
}

/**
 * @description: 时间选择器禁用函数（禁用今天之前的日期）
 */
export function disabledDate(current) {
  return current && current < moment().startOf('day');
}

/**
 * @description: 计算时间戳差值
 */
export function timeDiff(startTime, endTime) {
  return dateStrToUnix(endTime) - dateStrToUnix(startTime)
}

/**
 * @description: 获取一段时间前/后
 * @note 这与 getSomeTimeBefore 完全相同，只是不减去时间，而是增加时间。
 * @num 取负值为前，正值为后
 * @type 取值：years	y
              quarters	Q
              months	M
              weeks	w
              days	d
              hours	h
              minutes	m
              seconds	s
              milliseconds	ms
 * @eg 一年前/一月前/一周前...，一年后/一月后/一周后...
 */
export function getAfewDaysAgo(num, type = 'd', formateString = DATE_FORMAT_TYPE.YMDHMS) {
  return moment().add(num, type).format(formateString)
}

/**
 * @description: 获取一段时间前/后
 * @note 这与 getAfewDaysAgo 完全相同，只是不增加时间，而是减去时间。
 * @num 取负值为后，正值为前
 * @type 取值：years	y
              quarters	Q
              months	M
              weeks	w
              days	d
              hours	h
              minutes	m
              seconds	s
              milliseconds	ms
 * @eg 一年前/一月前/一周前...，一年后/一月后/一周后...
 */
export function getSomeTimeBefore(num, type, formateString = DATE_FORMAT_TYPE.YMDHMS) {
  return moment().subtract(num, type).format(formateString);
}

/**
 * @description: 获取一段时间的开始
 * @timeType year/quarter/month/week/day/hour/minute/second
 * @eg 某年/某季度/某月/某星期/某天的开始...
 */
export function getSomeTimeStart(time, timeType, formateString = DATE_FORMAT_TYPE.YMDHMS) {
  return moment(time).startOf(timeType).format(formateString);
}

/**
 * @description: 获取一段时间的结束
 * @timeType year/quarter/month/week/day/hour/minute/second
 * @eg 某年/某季度/某月/某星期/某天的结束...
 */
 export function getSomeTimeEnd(time, timeType, formateString = DATE_FORMAT_TYPE.YMDHMS) {
  return moment(time).endOf(timeType).format(formateString);
}

```

## storage.js
```js
import { isObject } from 'lodash';

const storage = {
  //设置缓存
  set: (params) => {
    const obj = {
      name: ' ',
      value: '',
      expires: '',
      startTime: new Date().getTime(), //记录何时将值存入缓存，毫秒级
    };
    const options = {};
    //将obj和传进来的params合并
    Object.assign(options, obj, params);
    if (options.expires) {
      //如果options.expires设置了的话
      //以options.name为key，options为值放进去
      localStorage.setItem(options.name, JSON.stringify(options));
    } else {
      //如果options.expires没有设置，就判断一下value的类型
      const type = Object.prototype.toString.call(options.value);
      //如果value是对象或者数组对象的类型，就先用JSON.stringify转一下，再存进去
      if (type === '[object Object]') {
        options.value = JSON.stringify(options.value);
      }
      if (type === '[object Array]') {
        options.value = JSON.stringify(options.value);
      }
      localStorage.setItem(options.name, options.value);
    }
  },
  //拿到缓存
  get: (name) => {
    let item = localStorage.getItem(name);
    //先将拿到的试着进行json转为对象的形式
    try {
      item = JSON.parse(item);
    } catch (error) {
      //如果不行就不是json的字符串，就直接返回
      return item;
    }
    //如果有startTime的值，说明设置了失效时间
    if (isObject(item) && item.startTime) {
      const date = new Date().getTime();
      //何时将值取出减去刚存入的时间，与item.expires比较，如果大于就是过期了，如果小于或等于就还没过期
      if (date - item.startTime > item.expires) {
        //缓存过期，清除缓存，返回false
        localStorage.removeItem(name);
        return false;
      }
      //缓存未过期，返回值
      return item.value;
    }
    //如果没有设置失效时间，直接返回值
    return item;
  },
  //移除缓存
  remove: (name) => {
    localStorage.removeItem(name);
  },
  //移出全部缓存
  clear: () => {
    localStorage.clear();
  },
};

export default storage;

```