import vSticky from './src/sticky';
export { default as example } from './example/usage';

vSticky.install = function (Vue) {
  if (vSticky.installed) return;
  vSticky.installed = true;
  Vue.directive('loading', vSticky);
}

export default vSticky;
