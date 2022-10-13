import Modal from './src/modal';
export { default as example } from './example/usage.vue';

Modal.install = function(Vue) {
  if (Modal.installed) return;
  Modal.installed = true;
  Vue.component(Modal.name, Modal);
};

export default Modal;
