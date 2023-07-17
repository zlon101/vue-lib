import button from './src/button.vue';
export { default as example } from './example/usage.vue';

button.install = function(app) {
  if (button.installed) return;
  button.installed = true;
  app.component(button.name, button);
};

export default button;
