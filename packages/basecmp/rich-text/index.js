import RichText from './src/editor.vue';

RichText.install = function(Vue) {
  if (RichText.installed) return;
  RichText.installed = true;
  Vue.component(RichText.name, RichText);
};

export default RichText;
