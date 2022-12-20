import button from './src/button.vue';
export { default as example } from './example/usage.vue';

button.install = function(Vue) {
  if (button.installed) return;
  button.installed = true;
  Vue.component(button.name, button);
};

export default button;
