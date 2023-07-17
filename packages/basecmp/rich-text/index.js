import RichText from './src/editor.vue';

RichText.install = function(app) {
  if (RichText.installed) return;
  RichText.installed = true;
  app.component(RichText.name, RichText);
};

export default RichText;
