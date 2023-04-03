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