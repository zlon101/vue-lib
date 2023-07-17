import Input from './src/input.vue';
export { default as example } from './example/usage';

Input.install = function(app) {
  if (Input.installed) return;
  Input.installed = true;
  app.component(Input.name, Input);
};

export default Input;
