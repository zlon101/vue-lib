/**
 * 轮询接口
 * @param api: 接口名
 * @param param: 参数
 * @param stepTime: 轮询间隔秒
 * @param updateCallBack: 成功或失败时的回调
 */
export default class TimeTask {
  constructor({ api, param, stepTime, updateCallBack }) {
    this.api = api;
    this.param = param;
    this.stepTime = stepTime * 1000;

    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          const response = JSON.parse(xhr.responseText);
          const errorMsg = (response[0] || {}).ErrMsg;
          // 如果ErrMsg存在直接走catch
          if (errorMsg) {
            updateCallBack(500, errorMsg, this.xhr);
          } else {
            updateCallBack(200, Array.isArray(response) ? response[1] : response, this.xhr);
          }
        } else {
          try {
            let error = JSON.parse(xhr.responseText);
            error = (error[0] || {}).ErrMsg || '';
            updateCallBack(500, error, this.xhr);
          } catch (err) {
            this.stop();
            updateCallBack(500, '', this.xhr);
          }
        }
      }
    };

    xhr.open('POST', api, true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.withCredentials = true;
    xhr.send(JSON.stringify(this.param));
    this.xhr = xhr;
  }

  start() {
    return new Promise((resolve, reject) => {
      new Promise((resolve2, reject2) => {
        this.timer = setInterval(() => {
          try {
            if ([0, 4].includes(this.xhr.readyState)) {
              this.xhr.open('POST', this.api);
              this.xhr.send(this.param);
            }
          } catch (err) {
            reject2(err);
          }
        }, this.stepTime);
      }).catch(err => {
        this.stop();
        reject(err);
      });
    });
  }

  stop() {
    clearInterval(this.timer);
    this.xhr = null;
  }
}
