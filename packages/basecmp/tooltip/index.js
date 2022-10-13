import Tooltip from './src/tooltip.vue';
export { default as example } from './example/usage';

Tooltip.install = function(Vue) {
  if (Tooltip.installed) return;
  Tooltip.installed = true;
  Vue.component(Tooltip.name, Tooltip);
};

export default Tooltip;
