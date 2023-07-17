import { nextTick } from 'vue';

let listenAction;
let stickyTop;
let zIndex;
function findprevFixedNode(el) {
  const domArr = [...document.querySelectorAll('.STICKY-TAG')];
  let result = null;
  domArr.forEach((dom, index) => {
    if (dom === el) {
      result = domArr[index - 1] || null;
    }
  });
  return result;
}
function unwatch() {
  window.removeEventListener('scroll', listenAction);
}
function watch() {
  window.addEventListener('scroll', listenAction);
}
function cssSupport(attr, value) {
  const element = document.createElement('div');
  if (attr in element.style) {
    element.style[attr] = value;
    return element.style[attr] === value;
  }
  return false;
}
export const throttle = (fn, delay = 100) => {
  let now; let lastExec; let timer; let context; let
    args;
  function execute() {
    fn.apply(context, args);
    lastExec = now;
  }

  return () => {
    context = this;
    // eslint-disable-next-line no-undef
    args = arguments;
    now = +new Date();
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
    if (!lastExec) {
      execute();
    } else {
      const diff = delay - (now - lastExec);
      if (diff < 0) {
        execute();
      } else {
        timer = setTimeout(() => {
          execute();
        }, diff);
      }
    }
  };
};
function insertedFn(el, binding) {
  const params = binding.value || {};
  if (params.disable) { return; }
  el.classList.add('STICKY-TAG');
  const elStyle = el.style;
  const prevFixedEl = findprevFixedNode(el);
  const prevEl = el.previousElementSibling;
  let prevHeight = 0;
  let prevTop = 0;
  let prevZIndex = 100;
  if (prevFixedEl) {
    prevTop = parseInt(prevFixedEl.style.top, 10);
    prevHeight = parseInt(prevFixedEl.clientHeight, 10);
    prevZIndex = parseInt(prevFixedEl.style.zIndex, 10);
  }
  if (params.zIndex !== undefined) {
    zIndex = params.zIndex;
  } else if (prevEl !== prevFixedEl) { // 上一个设置指令的元素与当前元素不是兄弟元素
    if (params.wrap === false) { // 如果不换行，保持原有zIndex
      zIndex = prevZIndex;
    } else { // 否则自动递减
      zIndex = prevZIndex - 1;
    }
  } else if (params.wrap === true) { // 如果强制换行，不管是不是兄弟元素都递减
    zIndex = prevZIndex - 1;
  } else {
    zIndex = prevZIndex; // 否则为兄弟元素，保持原有zIndex
  }
  if (params.stickyTop !== undefined) {
    stickyTop = params.stickyTop;
  } else if (prevEl !== prevFixedEl) { // 上一个设置指令的元素与当前元素不是兄弟元素
    if (params.wrap === false) { // 如果不换行，保持原有top值
      stickyTop = prevTop;
    } else { // 否则计算top值
      stickyTop = prevTop + prevHeight;
    }
  } else if (params.wrap === true) { // 如果强制换行，计算top值
    stickyTop = prevTop + prevHeight;
  } else { // 否则为兄弟元素，保持原有top值
    stickyTop = prevTop;
  }
  if (cssSupport('position', 'sticky')) {
    elStyle.position = '-webkit-sticky';
    elStyle.position = 'sticky';
    elStyle.top = `${stickyTop}px`;
    elStyle.zIndex = zIndex;
    return;
  }
  const childStyle = el.firstElementChild.style;
  elStyle.position = '';
  childStyle.cssText = `left: 0; right: 0; top: ${stickyTop}px; z-index: ${zIndex}; ${childStyle.cssText}`;
  let active = false;

  const sticky = () => {
    if (elStyle.position.indexOf('sticky') !== -1 || active) return;
    if (!elStyle.height) {
      elStyle.height = `${el.offsetHeight}px`;
    }
    if (childStyle) {
      childStyle.position = 'fixed';
    }
    active = true;
  };

  const reset = () => {
    if (elStyle.position.indexOf('sticky') !== -1 || !active) return;
    childStyle.position = 'static';
    active = false;
  };

  listenAction = throttle(() => {
    const offsetTop = el.getBoundingClientRect().top;
    if (offsetTop <= stickyTop) {
      return sticky();
    }
    reset();
  });

  watch();
}

export default {
  inserted(el, binding) {
    nextTick(() => insertedFn(el, binding));
  },
  unbind: unwatch,
};
