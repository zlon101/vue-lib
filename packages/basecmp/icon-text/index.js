import IconText from './src/iconText.vue';

IconText.install = function(Vue) {
  if (IconText.installed) return;
  IconText.installed = true;
  Vue.component(IconText.name, IconText);
};

export default IconText;
