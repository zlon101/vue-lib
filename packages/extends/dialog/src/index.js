import { createApp } from 'vue';
import DialogComponent from './dialog.vue';

const Dialog = () => {
  const parent = document.body;
  const container = document.createElement('div');
  const instance = createApp(DialogComponent);
  instance.mount(container);

  parent.appendChild(container);
  return instance;
};

export default Dialog;
