// 判断dom元素文本是否溢出
export function isOverflow(dom) {
  if (!dom) {
    return false;
  }
  // clientWidth
  const widthDiff = dom.scrollWidth - dom.offsetWidth;
  const heightDiff = dom.scrollHeight - dom.offsetHeight;
  return widthDiff > 2 || heightDiff > 2;
}

// 复制
export function copyString(str) {
  if (navigator.clipboard) {
    return navigator.clipboard.writeText(str);
  }
  const input = document.createElement('textarea');
  input.readOnly = 'readonly';
  input.style.position = 'fixed';
  input.style.clip = 'rect(0 0 0 0)';
  input.style.top = '10px';
  input.value = str;
  document.body.appendChild(input);
  input.select();
  const isSuccess = document.execCommand('copy');
  document.body.removeChild(input);
  return isSuccess;
}

/**
 * 检查浏览器是否支持CSS
 * 浏览器遇到不支持的属性值时，浏览器会直接把这个值抛弃
 */
export const supportsCSS = (attribute, value) => {
  if (window.CSS && window.CSS.supportsCSS) {
    if (typeof value === 'undefined') return window.CSS.supportsCSS(attribute);
    return window.CSS.supportsCSS(attribute, value);
  }

  const elem = document.createElement('div');
  if (attribute in elem.style) {
    elem.style[attribute] = value;
    // window.getComputedStyle
    return elem.style[attribute] === value;
  }
  return false;
};

// 监听页面可见性变化，切换标签页或浏览器窗口
export function listenVisible(cb) {
  let hidden, visibilityEventName;
  // Opera 12.10 and Firefox 18 and later support
  if (typeof document.hidden !== 'undefined') {
    hidden = 'hidden';
    visibilityEventName = 'visibilitychange';
  } else if (typeof document.msHidden !== 'undefined') {
    hidden = 'msHidden';
    visibilityEventName = 'msvisibilitychange';
  } else if (typeof document.webkitHidden !== 'undefined') {
    hidden = 'webkitHidden';
    visibilityEventName = 'webkitvisibilitychange';
  }

  const onVisibilityChange = (e) => cb(document[hidden], e);

  // 如果浏览器不支持 addEventListener 或 Page Visibility API 给出警告
  if (typeof document.addEventListener !== 'function' || typeof document[hidden] === 'undefined') {
    throw new Error('The browser not support Visibility API.');
  }
  document.addEventListener(visibilityEventName, onVisibilityChange, false);
  return () => document.removeEventListener(visibilityEventName, onVisibilityChange, false);
}

export const isFullScreen = () => {
  return !!(
    document.fullScreen ||
    document.webkitIsFullScreen ||
    document.mozFullScreen ||
    document.msFullscreenElement ||
    document.fullscreenElement
  );
};
// 全屏某个元素
export const handleFullscreen = (container) => {
  // If fullscreen mode is active...
  if (isFullScreen()) {
    // ...exit fullscreen mode
    // (Note: this can only be called on document)
    if (document.exitFullscreen) document.exitFullscreen();
    else if (document.mozCancelFullScreen) document.mozCancelFullScreen();
    else if (document.webkitCancelFullScreen) document.webkitCancelFullScreen();
    else if (document.msExitFullscreen) document.msExitFullscreen();
  } else {
    // ...otherwise enter fullscreen mode
    // (Note: can be called on document, but here the specific element is used as it will also ensure that the element's children, e.g. the custom controls, go fullscreen also)
    if (container.requestFullscreen) {
      container.requestFullscreen();
    } else if (container.mozRequestFullScreen) {
      container.mozRequestFullScreen();
    } else if (container.webkitRequestFullScreen) {
      // Safari 5.1 only allows proper fullscreen on the video element. This also works fine on other WebKit browsers as the following CSS (set in styles.css) hides the default controls that appear again, and
      // ensures that our custom controls are visible:
      // figure[data-fullscreen=true] video::-webkit-media-controls { display:none !important; }
      // figure[data-fullscreen=true] .controls { z-index:2147483647; }
      container.webkitRequestFullScreen();
    } else if (container.msRequestFullscreen) {
      container.msRequestFullscreen();
    }
  }
};
