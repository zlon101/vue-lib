import Form from './src/form.vue';
export { default as example } from './examples/usage.vue';

Form.install = function(app) {
  if (Form.installed) return;
  Form.installed = true;
  app.component('ZlForm', Form);
};

export default Form;
