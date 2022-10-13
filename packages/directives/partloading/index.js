import vLoading from './src/loading';
export { default as example } from './example/usage';

vLoading.install = function (Vue) {
  if (vLoading.installed) return;
  vLoading.installed = true;
  Vue.directive('loading', vLoading);
}

export default vLoading;
