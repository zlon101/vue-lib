export class Dom {
  static __traversingEleAction(fn, domList) {
    domList.forEach(dom => {
      fn(dom);
    });
  }

  static removeClass(dom, cl) {
    if (!dom || !cl) {
      return;
    }
    if (!dom.length) {
      dom = [dom];
    }
    const remove = (d, c) => {
      if (d.classList) {
        d.classList.remove(c);
      } else {
        const reg = new RegExp(c, 'g');
        d.className = d.className.replace(reg, '');
      }
    };
    Dom.__traversingEleAction((d) => {
      if (Array.isArray(cl)) {
        cl.forEach(c => {
          remove(d, c);
        });
      } else {
        remove(d, cl);
      }
    }, dom);
  }

  static addClass(dom, cl) {
    if (!dom || !cl) {
      return;
    }
    if (!dom.length) {
      dom = [dom];
    }
    const add = (d, c) => {
      if (d.classList) {
        d.classList.add(c);
      } else {
        d.className += ` ${c}`;
      }
    };
    Dom.__traversingEleAction((d) => {
      if (Array.isArray(cl)) {
        cl.forEach(c => {
          add(d, c);
        });
      } else {
        add(d, cl);
      }
    }, dom);
  }

  static insertHtmlBeforeParent(el, htmlStr) {
    if (el) {
      el.insertAdjacentHTML('beforebegin', htmlStr);
    }
  }

  static insertHtmlInParentBegin(el, htmlStr) {
    if (el) {
      el.insertAdjacentHTML('afterbegin', htmlStr);
    }
  }

  static insertHtmlInParentEnd(el, htmlStr) {
    if (el) {
      el.insertAdjacentHTML('beforeend', htmlStr);
    }
  }

  static insertHtmlAfterParent(el, htmlStr) {
    if (el) {
      el.insertAdjacentHTML('afterend', htmlStr);
    }
  }

  static removeSelf(el) {
    if (el) {
      el.remove();
    }
  }

  static removeDom(selector) {
    const domList = document.querySelectorAll(selector);
    domList.forEach(dom => {
      dom.remove();
    });
  }
}

// 文本是否溢出
export function isOverflow(dom) {
  if (!dom) {
    return false;
  }
  // height 可能存在误差：即两行刚刚可以显示完整的时候也会判断为需要hover。但是该情况出现影响不是特别大
  // tooltips组件另外需要多行省略号的情况下，需要重写c-tooltip-rel，覆盖组件内部css。因为组件内部是按照默认一行编写的
  const widthDiff = dom.scrollWidth - dom.offsetWidth;
  const heightDiff = dom.scrollHeight - dom.offsetHeight;
  if (widthDiff > 2 || heightDiff > 2) {
    return true;
  }
  return false;
}

// 节流
export function throttle(callFn, interval) {
  let timer = null;
  return function(...args) {
    if (!timer) {
      timer = setTimeout(() => {
        clearTimeout(timer);
        timer = null;
        callFn.apply(this, args);
      }, interval);
    }
  };
}

export function computedStyle(el, cssProp) {
  if (!el || !cssProp) return;
  return document.defaultView.getComputedStyle ? document.defaultView.getComputedStyle(el, '')[cssProp] : el.currentStyle[cssProp];
}

// 计算鼠标的绝对位置，兼容 safair 和 firefax
export function getMouseCoords(ev) {
  if (ev.pageX || ev.pageY) {
    return { x: ev.pageX, y: ev.pageY };
  }
  return {
    x: ev.clientX + document.body.scrollLeft - document.body.clientLeft,
    y: ev.clientY + document.body.scrollTop - document.body.clientTop,
  };
}
