/**
 * 局部loading指令
 * 包含背景模糊和loading动画
 * value: {
 *   isLoading: bool, 是否显示
 *   isBlur: bool 是否模糊
 *   page: boolean, 是否是页面loading, 为true 时dom被插入到body中, 否则插入父元素中
 *   title: string
 *   icon: string loading 显示的icon
 * }
 */

import { xssH } from '@zl/utils/xss';
import './index.less';

// 默认参数
const defaultParam = {
  title: '加载中...',
  isBlur: true,
  page: true,
  icon: 'icon_loading_circle',
};

export default {
  inserted(el, binding) {
    doLoading(el, binding);
  },
  update(el, binding) {
    doLoading(el, binding);
  },
  unbind(el) {
    removeLoadingDom(el);
  },
};

function doLoading(el, binding) {
  const params = { ...defaultParam, ...binding.value };
  params.isLoading ? insertHtmlAfterParent(el, params) : removeLoadingDom(el);
}

function removeLoadingDom(el) {
  const ele = el.querySelector('.g-loading-wrap');
  ele && ele.remove();
}

function insertHtmlAfterParent(el, params) {
  // 通过获取元素距离顶部的就像素与屏幕高度，相减求出遮罩层高度
  // 若元素距离视窗底部为负数，即代表元素高度超出可视区域，直接使用元素高度作为遮罩层高度
  const elRectInfo = el.getBoundingClientRect();
  let boxHeight = el.clientHeight;
  const boxWidth = el.clientWidth;
  const screenHeight = document.documentElement.clientHeight;
  // 父组件未挂载
  if (!boxHeight || !boxWidth) {
    return;
  }
  // console.debug({ boxHeight, boxWidth });
  if (!params.page) {
    boxHeight = el.clientHeight;
  } else if (elRectInfo.bottom > 0) {
    boxHeight = screenHeight - elRectInfo.top;
  }
  const styleObj = {
    height: `${boxHeight}px`,
    width: `${boxWidth}px`,
    position: 'absolute !important',
    // outline: '1px solid blue',
  };
  if (params.page) {
    // styleObj.left = `${elRectInfo.left}px`;
    // styleObj.top = `${elRectInfo.top}px`;
    styleObj.position = 'fixed !important';
  }
  const styleStr = styleObjToStr(styleObj);
  const loadingEle = el.querySelector('.g-loading-wrap');
  if (loadingEle) {
    loadingEle.style = styleStr;
    return;
  }
  const html = `
      <div class="g-loading-wrap${params.isBlur ? ' g-page-bgfilter' : ''}"
        style="${styleStr}">
        <div class="g-page-loading dynamic">
          <div class="inner">
            <div class="loading_icon ${params.icon}"></div>
            <div class="txt">
              <div class="title">${xssH(params.title)}</div>
            </div>
          </div>
        </div>
      </div>
    `;
  el.insertAdjacentHTML('afterbegin', html);
}

function styleObjToStr(styleObj = {}) {
  return Object.keys(styleObj).reduce((acc, cur) => acc + `${cur}:${styleObj[cur]};`, '');
}
