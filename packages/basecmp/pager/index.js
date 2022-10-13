import Pager from './src/pager';
export { default as example } from './example/usage.vue';

Pager.install = function(Vue) {
  if (Pager.installed) return;
  Pager.installed = true;
  Vue.component(Pager.name, Pager);
};

export default Pager;
