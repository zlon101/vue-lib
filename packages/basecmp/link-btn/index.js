import LinkBtn from './src/linkBtn.vue';
export { default as example } from './example/usage.vue';

LinkBtn.install = function(app) {
  if (LinkBtn.installed) return;
  LinkBtn.installed = true;
  app.component(LinkBtn.name, LinkBtn);
};

export default LinkBtn;
