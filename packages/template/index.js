import componentCfg from './src/index.vue';
export { default as example } from './example/usage.vue';


componentCfg.install = function(app) {
  if (componentCfg.installed) return;
  componentCfg.installed = true;
  app.component(componentCfg.name, componentCfg);
};

export default componentCfg;
