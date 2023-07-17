import { copyString } from '@zl/utils/dom';
import toast from '@zl/extend-toast';

export const copyAndToast = str => {
  const isSuccess = copyString(str);
  const toastCfg = {
    text: isSuccess ? '复制成功' : '复制失败',
    type: isSuccess ? 'success' : 'error',
  };
  toast(toastCfg);
};

export default function install(app) {
  if (install.installed) return;
  install.installed = true;
  app.config.globalProperties.$copy = copyAndToast;
}
