import LinkBtn from './src/linkBtn.vue';
export { default as example } from './example/usage.vue';

LinkBtn.install = function(Vue) {
  if (LinkBtn.installed) return;
  LinkBtn.installed = true;
  Vue.component(LinkBtn.name, LinkBtn);
};

export default LinkBtn;
