import Checkbox from './src/checkbox.vue';

export { default as CheckboxGroup } from './src/group.vue';

Checkbox.install = function(app) {
  app.component(Checkbox.name, Checkbox);
};

export default Checkbox;
