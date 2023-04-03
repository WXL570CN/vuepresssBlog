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
  if (strEmpty(value)) return '--';
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