import DropdownTree from './src/dropdownTree';

DropdownTree.install = function(Vue) {
  if (DropdownTree.installed) return;
  DropdownTree.installed = true;
  Vue.component(DropdownTree.name, DropdownTree);
};

export default DropdownTree;
