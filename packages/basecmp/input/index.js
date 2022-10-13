import input from './src/input.vue';
export { default as example } from './example/usage';

input.install = function(Vue) {
  if (input.installed) return;
  input.installed = true;
  Vue.component(input.name, input);
};

export default input;
