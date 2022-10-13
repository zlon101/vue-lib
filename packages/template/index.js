import componentCfg from './src/index.vue';
export { default as example } from './example/usage.vue';


componentCfg.install = function(Vue) {
  Vue.component(componentCfg.name, componentCfg);
};

export default componentCfg;
