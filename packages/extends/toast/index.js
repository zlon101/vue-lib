import toast from './src';

toast.install = function(app) {
  if (toast.installed) return;
  toast.installed = true;
  app.config.globalProperties.$toast = toast;
};

export default toast;
