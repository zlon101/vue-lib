import multiStepBar from './src/multiStepBar.vue';

multiStepBar.install = function(Vue) {
  if (multiStepBar.installed) return;
  multiStepBar.installed = true;
  Vue.component(multiStepBar.name, multiStepBar);
};

export default multiStepBar;
