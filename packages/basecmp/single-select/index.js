import SingleSelect from './src/singleSelect';
export { default as example } from './example/usage';

SingleSelect.install = function(Vue) {
  if (SingleSelect.installed) return;
  SingleSelect.installed = true;
  Vue.component(SingleSelect.name, SingleSelect);
};

export default SingleSelect;
