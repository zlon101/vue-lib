const isEmpty = (val) => {
  if (Array.isArray(val)) {
    return val.length === 0;
  }
  if (typeof val === 'object') {
    return Object.keys(val).length === 0;
  }
  return !!val;
};

// 轮询
const DefaultArgs = {
  formatRes: true, // 是否格式化响应
  stepTime: 3, // 间隔3s
  timeout: 60, // 超时60s
};
export class Poll {
  constructor(args) {
    const mergeArgs = { ...DefaultArgs, ...args };
    mergeArgs.stepTime = mergeArgs.stepTime * 1000;
    mergeArgs.timeout = mergeArgs.timeout * 1000;
    this.mergeArgs = mergeArgs;
    this.formatRes = mergeArgs.formatRes;
    this.firstRun = true;
    this.disabled = false;
    this.listener = {};

    const xhr = new XMLHttpRequest();
    // xhr.onreadystatechange = this.onStateChange;

    xhr.onload = () => {
      let err = '';
      let isFail = false;
      let resData = null;
      const res = xhr.response;
      // console.debug('\nonload:\n', res);
      if (xhr.status === 200) {
        if (this.formatRes) {
          err = isEmpty(res[0]) ? '' : res[0];
          resData = res[1];
          isFail = !!err;
        } else {
          resData = res;
        }
      } else {
        err = res;
        isFail = true;
      }
      if (isFail) {
        this.stop();
      } else {
        !this.disabled && this.launchTimer();
      }

      if (typeof this.listener.load === 'function') {
        this.listener.load({
          isFail,
          err,
          resData,
          originRes: res,
        });
      }
    };
    xhr.onerror = err => {
      console.debug('\n onerror');
      this.clean();
      if (typeof this.listener.error === 'function') {
        this.listener.error(err);
      }
    };
    xhr.ontimeout = e => {
      console.debug('ontimeout:\n', e);
      if (typeof this.listener.timeout === 'function') {
        this.listener.timeout(e);
      }
    };
    xhr.onprogress = event => {
      if (typeof this.listener.progress === 'function') {
        this.listener.progress(event);
      }
    };

    this.xhr = xhr;
  }

  run() {
    this.firstRun = false;
    this.xhr.open('POST', this.mergeArgs.url);

    this.xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    this.xhr.responseType = 'json';
    this.xhr.timeout = this.mergeArgs.timeout; // ms
    this.xhr.withCredentials = true;

    this.xhr.send(JSON.stringify(this.mergeArgs.param));
  }

  launchTimer() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }

    if (this.firstRun) {
      this.run();
    } else {
      this.timer = setTimeout(this.run.bind(this), this.mergeArgs.stepTime);
    }
  }

  // load error timeout progress
  addEventListener(name, cb) {
    this.listener[name] = cb;
  }

  start() {
    this.disabled = false;
    if ([0, 4].includes(this.xhr.readyState)) {
      this.launchTimer();
    }
  }

  stop() {
    this.xhr.abort();
    clearInterval(this.timer);
    this.timer = null;
    this.disabled = true;
  }

  clean() {
    this.stop();
    this.xhr = null;
  }

  // onStateChange() {
  //   if (this.xhr.readyState === 4) {
  //     if (this.xhr.status === 200) {
  //     }
  //   }
  // }
}

export function ajax(cfg, data) {
  const xhr = getXHR();
  // 注册事件监听
  const Event = ['ontimeout', 'onprogress'];
  Object.keys(cfg).forEach(k => {
    if (Event.includes(k)) {
      xhr[k] = cfg[k];
    }
  });
  return new Promise((resolve, reject) =>{
    xhr.onreadystatechange = () => {
      if (xhr.readyState !== 4) return;

      const result = xhr.responseText;
      if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
        resolve(result);
      } else {
        reject(result);
      }
    };
    // 保证这些方法一定要是大写字母，否则其他一些浏览器（比如FireFox）可能无法处理这个请求
    xhr.open(cfg.method.toUpperCase(), cfg.url);
    xhr.send(data || cfg.data);
  });
}

export function getXHR() {
  if (window.XMLHttpRequest) {
    // 兼容 IE7+, Firefox, Chrome, Opera, Safari
    return new XMLHttpRequest();
  }

  let xhr = null;
  if (window.ActiveXObject) {
    try {
      xhr = new window.ActiveXObject('Msxml2.XMLHTTP'); // 即MSXML3
    } catch (e) {
      try {
        xhr = new window.ActiveXObject('Microsoft.XMLHTTP'); // 兼容IE5、6
      } catch (e) {
        return new Error('您的浏览器暂不支持Ajax!');
      }
    }
  } else {
    return new Error('您的浏览器暂不支持Ajax!');
  }
  return xhr;
}
