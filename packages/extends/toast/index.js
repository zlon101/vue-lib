import toast from './src';

toast.install = function(Vue) {
  if (toast.installed) return;
  toast.installed = true;
  Vue.prototype.$toast = toast;
};

export default toast;
