const host = process.env.NODE_ENV === 'production'
  ? '/?n=acnSdp.httpApi.'
  : `http://127.0.0.1:${window._port}/?n=acnSdp.httpApi.`;

export default class Tool {
  static urlencoded(obj) {
    const arr = [];
    Object.keys(obj).forEach(k => {
      const val = encodeURIComponent(obj[k]);
      arr.push(`${k}=${val}`);
    });
    return arr.join('&');
  }

  static handleList(res) {
    if (!res) {
      return [];
    }
    let data;
    try {
      data = JSON.parse(res) || [];
    } catch (error) {
      data = [];
    }
    return data;
  }

  static handleObj(res) {
    if (!res) {
      return {};
    }
    let data;
    try {
      data = JSON.parse(res) || {};
    } catch (error) {
      data = {};
    }
    return data;
  }

  static pasteString(str) {
    const el = document.createElement('textarea');
    el.value = str;
    el.setAttribute('readonly', '');
    el.style.position = 'absolute';
    el.style.left = '-9999px';
    document.body.appendChild(el);
    const selected = document.getSelection().rangeCount > 0 ? document.getSelection().getRangeAt(0) : false;
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    if (selected) {
      document.getSelection().removeAllRanges();
      document.getSelection().addRange(selected);
    }
  }

  static copyString(str) {
    const input = document.createElement('textarea');
    input.readOnly = 'readonly';
    input.style.position = 'absolute';
    input.style.left = '-9999px';
    input.value = str;
    document.body.appendChild(input);
    input.select();
    let isSuccess = true;
    if (document.execCommand('copy')) {
      document.execCommand('copy');
      isSuccess = true;
    } else {
      isSuccess = false;
    }
    document.body.removeChild(input);
    return isSuccess;
  }

  static parseListToNVList(inList) {
    if (!inList || inList.length <= 0) {
      return [];
    }
    const result = inList.map(x => ({
      name: x,
      value: x,
    }));
    return result;
  }

  static windowW() {
    return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
  }

  static downloadCSV(content, fileName) {
    try {
      window.URL = window.webkitURL || window.URL;
      const b = new Blob([Tool.arr2csv(content)], { type: 'text/csv;charset=utf-8;' });
      const url = window.URL.createObjectURL(b);
      const link = document.createElement('a');
      link.href = url;
      link.target = '_blank';
      link.download = fileName || `${this.$pNameEN}用户信息`;
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      throw new Error('download failed!');
    }
  }

  static arr2csv(objArray) {
    const array = typeof objArray !== 'object' ? JSON.parse(objArray) : objArray;
    let str = '';
    for (let i = 0; i < array.length; i++) {
      let line = '';
      const obj = array[i];
      obj.keys(array[i]).forEach(index => {
        if (line !== '') {
          line += ',';
        }
        line += array[i][index];
      });
      // for (const index in array[i]) {
      //   if (line !== '') {
      //     line += ',';
      //   }
      //   line += array[i][index];
      // }
      str += `${line}'\r\n'`;
    }
    return str;
  }

  static getUrlByNameWithP(funcName, paramObj) {
    if (paramObj) {
      const params = Tool.urlencoded(paramObj);
      return `/?n=acnSdp.httpApi.${encodeURIComponent(funcName)}&${params}`;
    }
    return `/?n=acnSdp.httpApi.${encodeURIComponent(funcName)}`;
  }

  /**
   * 获取操作系统信息
   * return: linux | windows | mac
   * */
  static getPCSystem() {
    let userAgent = `${navigator.platform} ${navigator.userAgent.toLowerCase()}`;
    userAgent = userAgent.toLowerCase();
    if (userAgent.indexOf('mac') !== -1) {
      return 'mac';
    }
    if (userAgent.indexOf('win') !== -1) {
      return 'windows';
    }
    if (userAgent.indexOf('linux') !== -1) {
      return 'linux';
    }
    return 'mac';
  }

  static getRuleListFieldStr(ruleList) {
    const fieldList = [];
    if (!ruleList || !ruleList.length) {
      return '';
    }
    ruleList.forEach(r => {
      const idx = fieldList.indexOf(r.Field);
      idx === -1 && fieldList.push(r.Field);
    });
    return fieldList.join(', ');
  }

  // val: IconImageId | base64 | ''
  static getAppIcon(val) {
    if (!val) {
      return Tool.getAppIconB64();
    }
    if (/data:image/.test(val)) {
      return val;
    }
    // IconImageId
    return `${host}LoadImage&ImageId=${val}`;
  }

  static getAppIconB64() {
    return `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAMAAAC7IEhfAAAAjVBMVEUAAAA8UuE6UeE7U+I6UuE8U+I6UeE7UuE7UuE7UeA7UuE6UeA7UuI7U+I9VeFAUuQ8WuFBXe9
  AYP86UeE7UuE8UuM9U+I6UeD///+Rnu3Jz/Z2hulYa+X29/3v8Pzk6Pq5wfSHlexneOdGW+I/VeCirfBPZONOY+PZ3vnW2/insfGZpO6Xo+5gc+amsPHNmFqfAAAAF3RSTlMAgOt5Zj313t3Pu6eciyocEQ8I
  kI9RUKhs6noAAAEaSURBVDjL7dXJjoJAFIVhFXHEAadzZVAEBMd+/8frGwJ9U6kqa9Fb/02x+IKmEo89rfViMlmse86GA3CDoYP5U7RN/Q9sNQek+crCNt4ISiNvY3KHMbTGB40tZzA2Wyos3MHaLlSvxJ5cV
  QBHQXt3cOY30OOnKrsWJlFcs5oPr4F9fvohOl10dzkRXfns/8GYuFuusvxGXKxA5HfiskpYlRF3zyFQPobSZ4mm8pmSfB0FongQd47BxWfiHgUMkEsi4qKkOwEjlDfJm60Q5SslLn2VMEOpjoiiGnBCHImO+M
  IOem7oNdB3w3ZeAhcM5Odqh+qyhVs73Ib6pAjUJ0XadyP1Jnp3I7X/OHtJYpg995C6p/l/Y+/++/gFhqNhvX88VD8AAAAASUVORK5CYII=`;
    //     return `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAMAAAC5zwKfAAAAflBMVEUAAAA9V+Y6
    // UeFNb/87UeE8UuFEXvs6UeE6UuE7UeE+VeRBW+VJYec6UeE6UeE7UeA6UuE7UeE6UeE6UeE6UuE8UeE7UuI7UuM7U+I8VOM6Uu
    // E7UeE7UuE7UuE6UuE+U+U8UeRDVuM6UeA6UuI+U+I7UeE7UeE6U+JAUuQ6UeCAKocpAAAAKXRSTlMAHfcDg0QI1e3RIRMK4a7v
    // zMO/qZhuallUP+S6lX9tMS4R8WArsKJ7HIFwRXIAAAIISURBVFjD7ZnnkoIwFIWFWCgqTUQEsWG57/+Cu8OoYT1LSZnRH3wP8A
    // 2aQ3JyGfWBnQPPC85spInJjCpmEy06Z0kvlo6ybj42qYY5nqv5ki29sU0UdPuACAn2kjp3RQ2sXAkdKzxqxCuYbFQQHiGpqCA8
    // QuJRQaQitFlQTxabHrpDSAKEhw7dMSdB8mNbVNYWCWOtGyOU2iSFnf6rMyKSJjJAN92ZpIC5m749nk+K+Maf57NJGbv+jDFpIK
    // 4JfR1CvyY80YNsvDSFFiMaZ/TgVBPWn7rM+vuysv5/oXDGdweRvWHRKMyei34ze/za23NZs0ah9Vr5e9T5ctxfmbMahXRl8GJ3
    // vr7sSiiEowK2Hthg4PABIR4Vx7xlC8TDB4V4VJQh6sISDx8UYtvgBwxGBXsKCrFt8H0NdynsKSjEtoE7b2RAT+kSYtvgEbJT6C
    // kCQogQREVMiBGCqAgJMUIQFVEhxoTHSEKIbYP3FGEhkruPqOREWoRkuZXPIl1CMqqA0yAchINwEH6b8KQmxErsqwmxtMc6hDFc
    // fNSE9hSuZkpC34DLo5wQaxkvWfLCyGi4gMsJ7VR0RIBCbPDd8y4Uys3BDmGrEItPNwkWrElVM7GaJbKjqpD9/sEhlkf5YZpfFD
    // 7U24+M+zgsbhtIxuzzI9O2oe73jJ11DMYR58J9F+cbPy4Ifv74AZxYU6LtIfpHAAAAAElFTkSuQmCC`;
  }

  static IsInteger(n) {
    const num = Number(n);
    if (Number.isNaN(num)) {
      return false;
    }
    if (`${num}`.indexOf('.') !== -1) {
      return false;
    }
    return true;
  }

  static isEmptyObj(input) {
    return Object.keys(input).length === 0;
  }

  static scrollToBottom() {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    // 变量windowHeight是可视区的高度
    const windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
    // 变量scrollHeight是滚动条的总高度（当前可滚动的页面的总高度）
    const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
    // 滚动条到底部
    if (scrollTop + windowHeight >= scrollHeight) {
      return true;
    }
    return false;
  }

  static eleScrolToBottom(ele) {
    if (!ele) {
      return false;
    }
    const st = ele.scrollTop;
    const ch = ele.clientHeight;
    const sh = ele.scrollHeight;
    if (Math.ceil(st + ch) >= sh) {
      return true;
    }
    return false;
  }

  static unique(arr, key) {
    return arr.filter((item, index, target) => {
      let fn = item;
      if (Array.isArray(item)) {
        fn = child => JSON.stringify(child) === JSON.stringify(item);
      } else if (typeof item === 'object') {
        fn = child => item[key] === child[key];
      }
      return target.findIndex(fn) === index;
    });
  }

  static scrollToBottomWithSpace(space) {
    const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
    // const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
    window.scrollTo(0, scrollHeight - windowHeight + space);
  }

  static creatorLinkObj(creator, index) {
    let parent = {
      index,
      type: 'text',
      text: '-',
    };
    if (creator && creator.Name) {
      if (creator.IsDeleted) {
        parent = {
          index,
          type: 'linkInfo',
          text: `${creator.Name}_${creator.Id.slice(0, 8)}(已删除)`,
          desc: [creator.Email],
          link: {
            to: {
              name: 'EmptyUser',
            },
          },
        };
      } else {
        parent = {
          index,
          type: 'linkInfo',
          text: creator.Name,
          desc: [creator.Email],
          link: {
            to: {
              name: 'MemberInfo',
              query: { id: creator.Id },
              params: { bcName: creator.Name },
            },
          },
        };
      }
    }
    return parent;
  }

  static getCreatorNameDisplay(creator) {
    if (creator && creator.Name) {
      if (creator.IsDeleted) {
        return `${creator.Name}_${creator.Id.slice(0, 8)}(已删除)`;
      }
      return creator.Name;
    }
    return '';
  }

  static checkEmailReg(email) {
    const EmailReg = /[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?/;
    return EmailReg.test(email);
  }

  static checkIsBase64(base64) {
    if (!base64) {
      return false;
    }
    if (/^data:image.*base64,/.test(base64)) {
      return true;
    }
    return false;
  }

  // 格式化提交给服务端的应用icon
  static formatSubmitAppIcon(srcStr) {
    if (!srcStr) {
      return '';
    }
    let dst = '';
    // 如果是本地上传的文件, 去掉前缀
    if (/^data:image.*base64,/.test(srcStr)) {
      dst = srcStr.replace(/^data:image.*base64,/, '');
    } else {
      // 如果是服务端提供的数据, 传空字符串
      dst = '';
    }
    return dst;
  }

  static checkPhone(str) {
    if (!str) {
      return false;
    }
    const patrn = /^[0-9]{11}$/;
    if (!patrn.exec(str)) {
      return false;
    }
    return true;
  }

  static getAppRenderGroup(appList, disableFn) {
    const res = [];
    const groupMap = {}; // 二级目录
    const groupImgMap = {};
    appList.forEach(item => {
      const groupApp = item.GroupApp;
      const appInfo = item.AppInfo;
      const iconId = appInfo.IconImageId ? appInfo.IconImageId : '';
      let integratedWay = item.AppType === 'PwdShare' ? '账号密码' : item.AppType;
      integratedWay = integratedWay === 'URL' ? '快捷访问' : integratedWay;
      const ai = {
        name: appInfo.Name,
        desc: `${integratedWay}集成`,
        hidedesc: true,
        value: appInfo.AppId,
        imgFullUrl: Tool.getAppIcon(iconId),
        disable: disableFn && disableFn(appInfo.AppId),
      };
      if (groupApp && groupApp.GroupAppId) {
        const groupL = groupMap[groupApp.GroupAppName] || [];
        groupL.push(ai);
        groupMap[groupApp.GroupAppName] = groupL;
        groupImgMap[groupApp.GroupAppName] = groupApp.IconImageId;
      } else {
        res.push(ai);
      }
    });
    const tmp = [];
    Object.keys(groupMap).forEach(key => {
      const child = groupMap[key];
      if (child && child.length) {
        const allDisable = child.every(c => c.disable);
        const parent = {
          name: key,
          desc: child[0].desc,
          unfold: true,
          children: child,
          hasChild: true,
          disable: allDisable,
          imgFullUrl: Tool.getAppIcon(groupImgMap[key]),
        };
        tmp.push(parent);
      }
    });
    const result = tmp.concat(res);
    return result;
  }

  static maskPhone(phone) {
    if (!phone) {
      return '';
    }
    return `${phone.slice(0, 3)}****${phone.slice(-4)}`;
    // return `*** **** **${phone.slice(-2)}`;
  }

  static removeErrRand(err, rand) {
    if (!err) {
      return '';
    }
    if (err.indexOf(rand) === -1) {
      return 'DE'; // dont exist
    }
    const reg = new RegExp(rand, 'g');
    return err.replace(reg, '').trim();
  }

  /**
   * 表格排序
   */
  static sortMethod(a, b, type) {
    if (a > b) {
      return type === 'desc' ? -1 : 1;
    }
    if (a < b) {
      return type === 'desc' ? 1 : -1;
    }
    if (a === b) {
      return 0;
    }
  }

  /**
   * 筛选数据
   * @param {Array} data 源数据
   * @param {Object} paramsData 筛选对应的字段和数据 { String, Array }
   * @param {Object} keyMap 如果筛选的字段和源数据的字段不同时需要给一个map映射
   */
  static filterData(data = [], paramsData = {}, keyMap = {}) {
    data = JSON.parse(JSON.stringify(data));
    const keys = [];
    const paramsDataNew = {};
    Object.keys(paramsData).forEach(key => {
      const val = paramsData[key];
      if (val && val !== '' && val.length) {
        keys.push({
          dataKey: keyMap[key] || key,
          filterKey: key,
        });
        paramsDataNew[key] = Tool.lowerCaseAndToString(val);
      }
    });
    if (!keys.length) {
      return data;
    }
    // console.debug('keys =>', keys);
    return data.filter(item => keys.every(key => {
      const { dataKey } = key;
      const { filterKey } = key;
      let dataVal = '';
      if (typeof dataKey === 'string') {
        dataVal = Tool.lowerCaseAndToString(item[dataKey]);
      } else if (Array.isArray(dataKey)) {
        let fieldData = item;
        dataKey.forEach(k => {
          dataVal = fieldData[k];
          fieldData = dataVal;
        });
        dataVal = Tool.lowerCaseAndToString(dataVal);
      }
      const filterVal = paramsDataNew[filterKey];
      if (!filterVal) {
        return true;
      }
      if (!dataVal) {
        return false;
      }
      if (Array.isArray(dataVal) && Array.isArray(filterVal)) {
        return filterVal.some(filterItemV => dataVal.includes(filterItemV));
      }
      // if (Array.isArray(dataVal)) {
      //   return filterVal.every(filterItemV => dataVal.includes(filterItemV));
      // }
      // dataVal: [1]  filterVal: [1, 2]  逻辑或
      if (!dataVal.includes(filterVal) && !filterVal.includes(dataVal)) {
        return false;
      }
      return true;
    }));
  }

  static lowerCaseAndToString(value) {
    if ([null, undefined].includes(value)) {
      value = '';
    } else if (typeof value === 'string') {
      value = value.toLocaleLowerCase();
    } else if (typeof value === 'boolean') {
      value = `${value}`;
    } else if (Array.isArray(value)) {
      value = value.map(item => {
        if (typeof item === 'string') {
          item = item.toLocaleLowerCase();
        } else if (typeof item === 'boolean') {
          item = `${item}`;
        }
        return item;
      });
    }
    return value;
  }

  // 页面筛选条件是否为空
  static filterObjIsEmpty(filterObj) {
    return Object.keys(filterObj).every(k => {
      const val = filterObj[k];
      let itemIsEmpt = false;
      // 目前只有string 和 array两种类型
      if (typeof val === 'string') {
        itemIsEmpt = !val;
      } else {
        itemIsEmpt = !val.length;
      }
      return itemIsEmpt;
    });
  }

  static handleDownloadFile(fileName, content) {
    const blob = new Blob([content]);
    // IE BUG
    if (navigator.msSaveOrOpenBlob) {
      navigator.msSaveOrOpenBlob(blob, fileName);
      return;
    }
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
}
