import moment from 'moment';

/**
 * 按utc8时区格式化时间
 * @param {number} date 时间戳或日期字符串或Date对象
 * @param {string} format 格式  hh(0~12) HH(0~23)
 */
export function dateToString(date, format = 'YYYY-MM-DD HH:mm:ss') {
  if (!date) return '-';
  const dateString = `${date}`;
  if (/^\d+$/.test(dateString) && dateString.length > 13) { // 超大时间戳
    date = date / (1000 ** 2);
  }
  return moment(date).utcOffset(8).format(format);
}

export function utf8TimeNowStr() {
  const now = new Date();
  return moment(now).utcOffset(8).format('YYYY-MM-DD HH:mm:ss');
}

export function stringToDate(str) {
  if (str instanceof Date || !str) {
    return str;
  }
  str = `${str.replace(/\D/g, '')}0000000000000000`;
  const year = Number(str.slice(0, 4));
  const month = Number(str.slice(4, 6));
  const d = Number(str.slice(6, 8));
  const h = Number(str.slice(8, 10));
  const m = Number(str.slice(10, 12));
  const s = Number(str.slice(12, 14));
  return new Date(year, month - 1, d, h, m, s);
}
export function isInRange({ startT, endT, curTime }) {
  startT = String(startT || '').replace(/\D/g, '');
  endT = String(endT || '').replace(/\D/g, '');
  curTime = String(curTime || '').replace(/\D/g, '');
  const maxLength = Math.max(startT.length, endT.length, curTime.length);
  const zeroStr = '0'.repeat(20);
  const nineStr = '9'.repeat(20);
  startT = `${startT}${zeroStr}`.slice(0, maxLength);
  endT = `${endT}${nineStr}`.slice(0, maxLength);
  curTime = `${curTime}${zeroStr}`.slice(0, maxLength);
  return Number(curTime) >= Number(startT) && Number(curTime) <= Number(endT);
}

// 月份映射
export const MonthMap = {
  Jan: 1,
  Feb: 2,
  Mar: 3,
  Apr: 4,
  May: 5,
  Jun: 6,
  Jul: 7,
  Aug: 8,
  Sep: 9,
  Oct: 10,
  Nov: 11,
  Dec: 12,
};

// 星期映射
export const WeekMap = {
  Mon: 1,
  Tue: 2,
  Wed: 3,
  Thu: 4,
  Fri: 5,
  Sat: 6,
  Sun: 7,
};

/**
 * 日期转换为常用语
 * @param date
 * @returns {string}
 */
export function dataToLocaleString(date) {
  const dateTimeStamp = new Date(date).getTime();
  const minute = 1000 * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const month = day * 30;
  const now = new Date().getTime();
  let result = '';
  const diffValue = now - dateTimeStamp;
  const monthC = diffValue / month;
  const weekC = diffValue / (7 * day);
  const dayC = diffValue / day;
  const hourC = diffValue / hour;
  const minC = diffValue / minute;
  if (monthC >= 1) {
    result = dateToString(date, 'YYYY-MM-DD');
  } else if (weekC >= 1) {
    result = `${parseInt(weekC, 12)}周前`;
  } else if (dayC >= 1) {
    result = `${parseInt(dayC, 12)}天前`;
  } else if (hourC >= 1) {
    result = `${parseInt(hourC, 12)}小时前`;
  } else if (minC >= 1) {
    result = `${parseInt(minC, 12)}分钟前`;
  } else {
    result = '刚刚';
  }
  return result;
}

/**
 * 获取指定日期范围
 * @param dateNow {String|Date} 当前日期，默认取当前系统日期
 * @param intervalDays {Number} 间隔天数
 * @param format {String} 返回格式
 * @param isBefore {Boolean} 是否在当前日期前
 * @param besideNow {Boolean} 范围计算是否排除当前日期
 * @returns {{start: (string|string|*), end: (string|string|*)}}
 */
export function getDateRange({
  dateNow = new Date(),
  intervalDays,
  format = 'YYYY-MM-DD',
  isBefore = true,
  besideNow = false,
}) {
  const dayTime = 24 * 60 * 60 * 1000;
  if (typeof dateNow === 'string') {
    dateNow = new Date(dateNow);
  }
  if (besideNow) {
    dateNow = new Date(dateNow.getTime() - dayTime);
  }
  if (isBefore) {
    const lastDay = new Date(dateNow.getTime() - intervalDays * dayTime);
    return { start: dateToString(lastDay, format), end: dateToString(dateNow, format) };
  }
  const nextDay = new Date(dateNow.getTime() + intervalDays * dayTime);
  return { start: dateToString(dateNow, format), end: dateToString(nextDay, format) };
}
