import { copyAndToast } from '@zl/extend-copy';

const getStr = directVal => {
  let str = directVal;
  if (typeof directVal === 'object') {
    str = directVal.str;
  }
  return str;
};

const option = {
  inserted(el, binding) {
    const directVal = binding.value;
    let targetEle = el;
    if (typeof directVal === 'object') {
      targetEle = el.querySelector(directVal.target);
    }
    const copyAct = () => {
      const txt = el._value !== undefined ? el._value : targetEle.textContent;
      copyAndToast(txt);
    };
    el._value = getStr(directVal);
    el._copyAct_ = copyAct;
    targetEle.addEventListener('click', copyAct);
    targetEle.style.cursor = 'pointer';
    targetEle.style['text-decoration'] = 'underline';
  },
  unbind(el, binding) {
    const directVal = binding.value;
    if (typeof directVal === 'object') {
      el.querySelector(directVal.target).removeEventListener('click', el._copyAct_);
    } else {
      el.removeEventListener('click', el._copyAct_);
    }
  },
  update(el, binding) {
    el._value = getStr(binding.value);
  },
};

option.install = function (Vue) {
  if (option.installed) return;
  option.installed = true;
  Vue.directive('copy', option);
}

export default option;
