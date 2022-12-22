/**
 * 获取url参数
 * @param {string} url 可选
 * @returns Object
 */
export function getParams(url) {
  const params = {};
  const _url = url || window.location.search;
  _url.replace(/([^?&=]+)=([^&]+)/g, (_, k, v) => (params[k] = v));
  return params;
}

/**
 * 设置url参数
 * @param {Object} args: { k, v }
 * @returns url: string
 */
export function setUrlQuery(args) {
  const { location } = window;
  if (typeof args !== 'object') {
    return location.pathname + location.search;
  }

  const newQuery = getParams();
  const newKList = Object.keys(args);
  newKList.forEach(k => {
    newQuery[k] = args[k];
  });
  let newPath = `${location.pathname}?`;
  const list = Object.keys(newQuery)
    .filter(k => newQuery[k])
    .map(k => `${k}=${newQuery[k]}`);
  newPath += list.join('&');
  return newPath;
}

// 阻止浏览器回退
export function preventBrowserBack() {
  window.history.pushState(null, null, document.URL);
  const popFn = function() {
    window.history.pushState(null, null, document.URL);
  };
  window.addEventListener('popstate', popFn);
  // 恢复回退
  return () => {
    window.removeEventListener('popstate', popFn);
  };
}

/**
 * 获取上传文件的 url, 处理使用 <base> 的情况
 * <base href="http://google.com" />
 * <a target="_blank" href="/aa/bb">debug</a>
 * args:
 *  doc: document
 *  relativeUrl: /aa/bb
 */
export function getAbsUrl(doc, relativeUrl) {
  // In the case of data: URL-based pages, relativeUrl === absoluteURL.
  if (doc.location.protocol === 'data:') {
    return doc.location.href;
  }
  let urlNormalizer = doc['__k5645hx'];
  if (!urlNormalizer) {
    urlNormalizer = doc.createElement('a');
    doc['__k5645hx'] = urlNormalizer;
  }

  // Use the magical quality of the <a> element. It automatically converts
  // relative URLs into absolute ones.
  urlNormalizer.href = relativeUrl;
  return urlNormalizer.href;
}
