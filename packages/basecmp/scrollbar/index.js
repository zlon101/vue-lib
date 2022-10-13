import Scrollbar from './src/main';
import './src/scrollbar.css';
export { default as example } from './example/usage';

Scrollbar.install = function(Vue) {
  if (Scrollbar.installed) return;
  Scrollbar.installed = true;
  Vue.component(Scrollbar.name, Scrollbar);
};

export default Scrollbar;
