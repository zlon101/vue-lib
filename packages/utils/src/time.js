export default class TimeUtil {
  static TimeIntervalToEnd(end) {
    const now = new Date();
    const endD = new Date(end) || now;
    return parseInt((endD.getTime() - now.getTime()) / 1000, 10);
  }

  static TimeZone() {
    // ( 0时区 - 本地时区(+8) ) * 60min = -480
    const d = new Date().getTimezoneOffset();
    return -d / 60;
  }

  // +0800/+1200
  static TimeZoneStr() {
    const tz = TimeUtil.TimeZone();
    let timeZoneStr = `00${tz}`.slice(-2);
    if (tz >= 0) {
      timeZoneStr = `+${timeZoneStr}00`;
    } else {
      timeZoneStr = `-${timeZoneStr}00`;
    }
    return timeZoneStr;
  }

  static TimeUtcZoneStr() {
    const tz = TimeUtil.TimeZone();
    let timeZoneStr = `00${tz}`.slice(-2);
    if (tz >= 0) {
      timeZoneStr = `UTC+${timeZoneStr}`;
    } else {
      timeZoneStr = `UTC-${timeZoneStr}`;
    }
    return timeZoneStr;
  }

  /**
   * 获取不包含国家信息的字符串
   * @param {*} date
   * @returns
   * Wed May 12 2021 19:25:15 GMT+0800 (中国标准时间) 返回
   * Wed May 12 2021 19:25:15 GMT+0800
   */
  static DateStrWithoutCountry(date) {
    if (!date) {
      date = new Date();
    }
    return date.toString().split('(')[0].trim();
  }

  static TimeSecondFormat(second) {
    // 获取时分秒
    let h = Math.floor(second / 3600, 10);
    let m = Math.floor((second - h * 3600) / 60);
    let s = Math.floor(second - h * 3600 - m * 60);

    // 格式化
    h < 10 && (h = `0${h}`);
    m < 10 && (m = `0${m}`);
    s < 10 && (s = `0${s}`);

    return `${h}:${m}:${s}`;
  }

  /**
   * 将时间转化为纳秒
   * @param {Date|String} date
   * @returns
  */
  static TimeToNS(date) {
    if (!date) {
      return 0;
    }
    if (date instanceof Date) {
      return date * 1000000;
    }
    return new Date(date) * 1000000;
  }
}
