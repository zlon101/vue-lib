import { createApp } from 'vue';
import ToastComponent from './toast.vue';

const defaults = {
  type: 'success',
  text: '',
  timeout: 1500,
};
let instance;

const Toast = (options = {}) => {
  if (['string', 'number'].includes(typeof options)) {
    options = { text: options };
  }

  options = {
    ...defaults,
    ...options,
  };

  if (!instance) {
    const el = document.createElement('div');
    instance = createApp(ToastComponent);
    instance.mount(el);
    document.body.appendChild(el);
  }
  Object.keys(options).forEach(key => {
    instance[key] = options[key];
  });
  instance.show();
  return instance;
};

export default Toast;
