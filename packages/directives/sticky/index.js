import vSticky from './src/sticky';
export { default as example } from './example/usage';

vSticky.install = function(app) {
  if (vSticky.installed) return;
  vSticky.installed = true;
  app.directive('loading', vSticky);
};

export default vSticky;
