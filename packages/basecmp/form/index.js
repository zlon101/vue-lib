import Form from './src/form.vue';
export { default as example } from './examples/usage';

Form.install = function(Vue) {
  if (Form.installed) return;
  Form.installed = true;
  Vue.component('form', Form);
};

export default Form;
