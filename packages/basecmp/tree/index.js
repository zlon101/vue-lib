import Tree from './src/tree.vue';
import './src/tree.less';

Tree.install = function(Vue) {
  if (Tree.installed) return;
  Tree.installed = true;
  Vue.component(Tree.name, Tree);
};

export default Tree;
