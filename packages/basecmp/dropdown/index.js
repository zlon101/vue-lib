import Dropdown from './src/dropdown';
export { default as example } from './example/usage';

Dropdown.install = function(Vue) {
  if (Dropdown.installed) return;
  Dropdown.installed = true;
  Vue.component(Dropdown.name, Dropdown);
};

export default Dropdown;
