import dialog from './src';
import DialogComponent from './src/dialog.vue';
export { default as example } from './example/usage.vue';

/**
 * 可以使用模板和命令两种方式调用
 */
dialog.install = function(Vue) {
  if (dialog.installed) return;
  dialog.installed = true;
  Vue.prototype.$dialog = dialog();
  Vue.component(DialogComponent.name, DialogComponent);
};

export default dialog;
