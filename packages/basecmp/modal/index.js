import Modal from './src/modal';
export { default as example } from './example/usage.vue';

Modal.install = function(app) {
  if (Modal.installed) return;
  Modal.installed = true;
  app.component(Modal.name, Modal);
};

export default Modal;
