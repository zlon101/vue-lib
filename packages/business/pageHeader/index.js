import pageHeader from './src/pageHeader.vue';

pageHeader.install = function(Vue) {
  if (pageHeader.installed) return;
  pageHeader.installed = true;
  Vue.component(pageHeader.name, pageHeader);
};

export default pageHeader;
