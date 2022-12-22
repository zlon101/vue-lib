/**
 * 页面性能测试
 * navigationStart: 在同一个浏览器上下文中，前一个网页（与当前页面不一定同域）unload 的时间戳，如果无前一个网页 unload ，则与 fetchStart 值相等
 *    performance.timing<PerformanceTiming>
 * unloadEventStart: 前一个网页（与当前页面同域）unload 的时间戳，如果无前一个网页 unload 或者前一个网页与当前页面不同域，则值为 0
 * redirectStart: 第一个 HTTP 重定向发生时的时间。有跳转且是同域名内的重定向才算，否则值为 0
 * fetchStart: 浏览器准备好使用 HTTP 请求抓取文档的时间，这发生在检查本地缓存之前
 * domainLookupStart: DNS 域名查询开始的时间，如果使用了本地缓存（即无 DNS 查询）或持久连接，则与 fetchStart 值相等
 * connectStart: HTTP（TCP） 开始建立连接的时间，如果是持久连接，则与 fetchStart 值相等
 * connectEnd: 注意这里握手结束，包括安全连接建立完成、SOCKS 授权通过
 * requestStart: HTTP 请求读取真实文档开始的时间（完成建立连接），包括从本地读取缓存
 * responseStart: HTTP 开始接收响应的时间（获取到第一个字节），包括从本地读取缓存
 *
 * domLoading: 开始解析渲染 DOM 树的时间，此时 Document.readyState 变为 loading，并将抛出 readystatechange 相关事件
 *   performance.timing<PerformanceTiming>
 * domInteractive: 完成解析 DOM 树的时间，Document.readyState 变为 interactive 并将抛出 readystatechange 相关事件，注意只是 DOM 树解析完成，这时候并没有开始加载网页内的资源
 * domContentLoadedEventStart: DOM 解析完成后，网页内资源加载开始的时间, 在 DOMContentLoaded 事件抛出前发生
 * domContentLoadedEventEnd: DOM 解析完成后，网页内资源加载完成的时间（如 JS 脚本加载执行完毕）
 * domComplete: 所有资源准备就绪的时间，Document.readyState 变为 complete 并将抛出 readystatechange 相关事件
 * loadEventStart: load 事件发送给文档，也即 load 回调函数开始执行的时间, 如果没有绑定 load 事件，值为 0
 * loadEventEnd: load 事件的回调函数执行完毕的时间
 */

function toFixed(num, digits = 2) {
  return +num.toFixed(digits);
}

// 页面渲染
export function pageStatistics() {
  const performance = window.performance;
  const htmlTime = performance.getEntriesByType('navigation')[0];
  const pageInfo = [
    {
      key: 'Loaded',
      desc: '页面load的总耗时',
      value: toFixed(htmlTime.duration, 2), // loadEventEnd - startTime
    },
    {
      key: 'DOMContentLoaded',
      desc: 'dom解析完成的总耗时',
      value: toFixed(htmlTime.domContentLoadedEventEnd - htmlTime.startTime, 2),
    },
    {
      key: 'Redirect',
      desc: '网页重定向的耗时',
      value: toFixed(htmlTime.redirectEnd - htmlTime.redirectStart, 2),
    },
    {
      key: 'AppCache',
      desc: '检查本地缓存的耗时',
      value: toFixed(htmlTime.domainLookupStart - htmlTime.fetchStart, 2),
    },
    {
      key: 'DNS',
      desc: 'DNS查询的耗时',
      value: toFixed(htmlTime.domainLookupEnd - htmlTime.domainLookupStart, 2),
    },
    {
      key: 'TCP',
      desc: 'TCP连接的耗时',
      value: toFixed(htmlTime.connectEnd - htmlTime.connectStart, 2),
    },
    {
      key: 'Waiting(TTFB)',
      desc: '从客户端发起请求到接收到响应的时间',
      value: toFixed(htmlTime.responseStart - htmlTime.requestStart, 2),
    },
    {
      key: 'Content Download',
      desc: '下载服务端返回数据的时间',
      value: toFixed(htmlTime.responseEnd - htmlTime.responseStart, 2),
    },
    {
      key: 'HTTP Total Time',
      desc: 'http请求总耗时',
      value: toFixed(htmlTime.responseEnd - htmlTime.requestStart, 2),
    },
  ];
  // 解析DOM耗时, 衡量DOM结果复杂度
  const parseDomStart = htmlTime.responseEnd; // performance.timing.domLoading
  pageInfo.push({
    key: 'Parse html',
    desc: '解析DOM耗时, 衡量DOM结果复杂度',
    value: toFixed(htmlTime.domInteractive - parseDomStart, 2),
  });
  // First Contentful Paint(FCP) 首次内容渲染
  const paints = performance.getEntriesByType('paint');
  pageInfo.push({
    key: 'FCP',
    desc: '首次内容渲染(FCP)',
    value: toFixed(paints[1].startTime - paints[0].startTime, 2),
  });
  // 白屏时间
  pageInfo.push({
    key: 'FPT',
    desc: '白屏时间',
    value: toFixed(performance.getEntriesByName('first-contentful-paint')[0].startTime - htmlTime.startTime, 2),
  });
  // 首次可交互时间
  pageInfo.push({
    key: 'TTI',
    desc: '首次可交互时间',
    value: toFixed(htmlTime.domInteractive - htmlTime.startTime, 2),
  });
  return pageInfo;
}

// api
export function apiStatistics() {
  const list = window.performance.getEntriesByType('resource').filter(item => item.initiatorType === 'xmlhttprequest');
  return list.map((item) => {
    const dstInfo = {};
    // dstInfo.entryType = item.entryType;
    dstInfo.name = item.name.split('/');
    dstInfo.name = dstInfo.name[dstInfo.name.length - 1];
    dstInfo.duration = toFixed(item.duration, 2);
    dstInfo.size = toFixed(item.encodedBodySize / 1024) + 'KB';
    // TCP 连接耗时
    dstInfo.TCP = toFixed(item.connectEnd - item.connectStart, 2);
    return dstInfo;
  });
}

// 静态资源js、css、image
export function assetStatistics() {
  let list = window.performance.getEntriesByType('resource');
  list = list.filter((item) => item.initiatorType !== 'xmlhttprequest');
  const result = list.map((item) => {
    const dstInfo = {};
    // dstInfo.entryType = item.entryType;
    dstInfo.name = item.name.split('/');
    dstInfo.name = dstInfo.name[dstInfo.name.length - 1];
    dstInfo.duration = toFixed(item.duration, 2);
    dstInfo._size = toFixed(item.encodedBodySize / 1024);
    dstInfo.size = dstInfo._size + 'KB';
    return dstInfo;
  });
  result.sort((a, b) => b._size - a._size);
  return result;
}

// 代码示例来自：《无线性能优化：FPS 测试》
export function calcFps(N) {
  let lastTime = performance.now();
  let frame = 0;
  let lastFameTime = performance.now();
  const fpsList = [];
  let count = 0;
  return new Promise((resolve) => {
    const loop = () => {
      const now = performance.now();
      const fs = now - lastFameTime;
      lastFameTime = now;
      let fps = Math.round(1000 / fs);
      frame++;
      count++;
      if (now - lastTime > 1000) {
        console.debug('x');
        fps = Math.round((frame * 1000) / (now - lastTime));
        frame = 0;
        lastTime = now;
      }
      console.debug(frame, fps);
      fpsList.push(fps);
      if (count <= N) {
        window.requestAnimationFrame(loop);
      } else {
        let result = fpsList.reduce((acc, cur) => acc + cur, 0) / fpsList.length;
        result = Number(result.toFixed(2));
        resolve({ fps: result, fpsList });
      }
    };
    window.requestAnimationFrame(loop);
  });
}
// calcFps(100).then(res => console.debug(res));

// 测量代码段
export class PerformanceCode {
  constructor() {
    if (!window.performance) {
      return new Error('Can\'t support performance!');
    }
    this.timing = [];
  }

  start(tag) {
    performance.mark(`${tag}-start`);
  }

  end(tag) {
    let duration = performance.measure(tag, `${tag}-start`).duration;
    duration = toFixed(duration, 2);
    this.timing.push({ name: tag, duration });
  }

  getTiming() {
    return this.timing;
  }
}
// const pInstance = new PerformanceCode();
// (function test(t) {
//   pInstance.start('test');
//   const start = performance.now();
//   while (performance.now() - start < t) {
//   }
//   console.debug('test 耗时', performance.now() - start);
//   pInstance.end('test');
// }(1000));

/* ************************************************************************ */
window.addEventListener('load', () => {
  setTimeout(() => {
    console.debug(pageStatistics());
    console.debug(apiStatistics());
    console.debug(assetStatistics());
  }, 3000);
});
