import Select from './src/select.vue';

Select.install = function(Vue) {
  if (Select.installed) return;
  Select.installed = true;
  Vue.component(Select.name, Select);
};

export default Select;
