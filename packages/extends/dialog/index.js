import dialog from './src';
import DialogComponent from './src/dialog.vue';

/**
 * 可以使用模板和命令两种方式调用
 */
dialog.install = function(app) {
  if (dialog.installed) return;
  dialog.installed = true;
  app.config.globalProperties.$dialog = dialog();
  app.component(DialogComponent.name, DialogComponent);
};

export default dialog;
