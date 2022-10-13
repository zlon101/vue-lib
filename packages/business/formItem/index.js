import FormItem from './src/formItem.vue';

FormItem.install = function(Vue) {
  if (FormItem.installed) return;
  FormItem.installed = true;
  Vue.component(FormItem.name, FormItem);
};

export default FormItem;
