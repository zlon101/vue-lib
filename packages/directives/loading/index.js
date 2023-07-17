import vLoading from './src';
export { default as example } from './example/usage';

vLoading.install = function(app) {
  if (vLoading.installed) return;
  vLoading.installed = true;
  app.directive('loading', vLoading);
};

export default vLoading;
