// 把浏览器URL上的query转换为对象
export function getParams(url) {
  const params = {};
  const _url = url || window.location.search;
  _url.replace(/([^?&=]+)=([^&]+)/g, (_, k, v) => (params[k] = v));
  return params;
}

// args: { k: v }
export function setUrlQuery(args) {
  const { location } = window;
  if (typeof args !== 'object') {
    return location.pathname + location.search;
  }

  const newQuery = getParams();
  const newKList = Object.keys(args);
  newKList.forEach((k) => {
    newQuery[k] = args[k];
  });
  let newPath = `${location.pathname}?`;
  const list = Object.keys(newQuery)
    .filter((k) => newQuery[k])
    .map((k) => `${k}=${newQuery[k]}`);
  newPath += list.join('&');
  return newPath;
}

// 设置URL上的query，但是不刷新页面
// query: { k: v }
export function updateUrlQuery(query) {
  const newUrl = setUrlQuery(query);
  window.history.replaceState({}, '', newUrl);
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

// url拼接
export function urlencoded(obj) {
  const arr = [];
  Object.keys(obj).forEach(k => {
    const val = encodeURIComponent(obj[k]);
    arr.push(`${k}=${val}`);
  });
  return arr.join('&');
}
