import drawer from './src/drawer.vue';
export { default as example } from './example/usage';

drawer.install = function(Vue) {
  if (drawer.installed) return;
  drawer.installed = true;
  Vue.component(drawer.name, drawer);
};

export default drawer;
