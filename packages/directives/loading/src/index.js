import Vue from 'vue';
import loading from './loading.vue';

// 默认参数
const defaultParam = {
  title: '加载中...',
  isBlur: false,
  page: true,
};

export default {
  inserted(el, binding) {
    doLoading(el, binding.value);
  },
  update(el, binding) {
    console.debug('update binding: ', binding.value);
    doLoading(el, binding.value);
  },
  unbind(el) {
    removeLoadingDom(el);
  },
};

function doLoading(el, args = {}) {
  const params = { ...defaultParam, ...args };
  // 容器
  el._container = params.page ? document.body : el;
  params.show ? insertHtmlAfterParent(el, params) : removeLoadingDom(el);
}

function insertHtmlAfterParent(el, params) {
  if (el._instance) {
    // re-render
    el._instance.updateUi(params);
    return;
  }
  // render
  const instance = new Vue({
    ...loading,
    name: 'LoadinWrap',
    propsData: params,
  }).$mount();
  const styleObj = {};
  styleObj.position = params.page ? 'fixed' : 'absolute';
  instance.$el.style = cssObjToStr(styleObj);
  el._instance = instance;
  el._container.appendChild(instance.$el);
}

function removeLoadingDom(el) {
  if (el._instance) {
    el._instance.$destroy();
    el._instance.$el.remove();
  }
  el._container = null;
}

function cssObjToStr(styleObj = {}) {
  return Object.keys(styleObj).reduce((acc, cur) => acc + `${cur}:${styleObj[cur]};`, '');
}
