import Checkbox from './src/checkbox.vue';
import CheckboxGroup from './src/checkboxGroup.vue';

Checkbox.Group = CheckboxGroup;
Checkbox.install = function(Vue) {
  Vue.component(Checkbox.name, Checkbox);
  Vue.component(CheckboxGroup.name, CheckboxGroup);
};

export default Checkbox;
