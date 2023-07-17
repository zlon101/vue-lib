import Tooltip from './src/tooltip.vue';
export { default as example } from './example/usage';

Tooltip.install = function(app) {
  if (Tooltip.installed) return;
  Tooltip.installed = true;
  app.component(Tooltip.name, Tooltip);
};

export default Tooltip;
