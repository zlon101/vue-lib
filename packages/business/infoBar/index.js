import InfoBar from './src/infoBar.vue';
export { default as example } from './example/usage.vue';

InfoBar.install = function(Vue) {
  if (InfoBar.installed) return;
  InfoBar.installed = true;
  Vue.component(InfoBar.name, InfoBar);
};

export default InfoBar;
