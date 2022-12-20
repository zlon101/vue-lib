import { urlencoded } from './url.js';

// const nodeEnv = process.env.NODE_ENV;
// const isProd = nodeEnv === 'production';
function errorTipsDialog(error) {
  window.appVue.$dialog.show({
    type: 'warn',
    title: '操作失败',
    desc: `操作失败：${error}`,
  });
}

/**
 * 文件上传api
 * @param {*} req
 * @param {prefix} api 前缀
 * @param {file} req.file 上传文件
 * @param {string} req.actionName 方法名称
 * @param {function} req.process 进度回调函数
 * @param {bool} req.dontShowErrorTips 不显示报错弹窗
 * @param {json} req.data 额外数据
 * @returns
 */
export default function uploadApi(req) {
  const file = req.file;
  const actionName = req.actionName;
  const progress = req.progress;
  const data = req.data;
  // const baseURL = isProd ? '/' : 'https://127.0.0.1:3003/';
  return new Promise((resolve, reject) => {
    const params = urlencoded({
      name: file.name,
      ...data,
    });
    const url = `/?n=${req.prefix}.${actionName}&ud3q=${+new Date()}&${params}`;
    const xhr = new XMLHttpRequest();
    xhr.open('POST', url, true);
    xhr.withCredentials = true;
    xhr.onreadystatechange = function() {
      if (this.readyState === 4) {
        if (this.status === 200) {
          try {
            const res = JSON.parse(this.responseText);
            if (Array.isArray(res)) {
              const errorMsg = (res[0] || {}).ErrMsg;
              if (errorMsg) {
                !req.dontShowErrorTips && errorTipsDialog(errorMsg);
                return reject(errorMsg);
              }
              resolve(res[1]);
            } else {
              resolve(this.responseText);
            }
          } catch (error) {
            resolve(this.responseText);
          }
        } else {
          if (!this.responseText) {
            window.appVue.$dialog.show({
              type: 'warn',
              title: '网络错误',
              desc: '目前无法与服务器通信，请检查你的网络设置',
            });
            return;
          }
          let res = this.responseText;
          try {
            res = JSON.parse(res);
            if (Array.isArray(res)) {
              res = (res[0] || {}).ErrMsg || '';
            }
            !req.dontShowErrorTips && errorTipsDialog(res);
          } catch (error) {
            console.log();
          }
          reject(res);
        }
      }
    };
    xhr.upload.addEventListener('progress', e => {
      let per = '0';
      const total = e.total || e.loaded;
      per = parseFloat(e.loaded / total).toFixed(2);
      if (progress) {
        progress({
          per: per,
          name: file.name,
        });
      }
    });
    xhr.timeout = 300000;
    try {
      xhr.send(file.slice());
    } catch (error) {
      reject(error.message);
    }
  });
}
