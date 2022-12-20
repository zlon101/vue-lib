import Input from './src/input.vue';
export { default as example } from './example/usage';

Input.install = function(Vue) {
  if (Input.installed) return;
  Input.installed = true;
  Vue.component(Input.name, Input);
};

export default Input;
