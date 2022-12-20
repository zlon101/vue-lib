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

  static windowW() {
    return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
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
      str += `${line}'\r\n'`;
    }
    return str;
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
