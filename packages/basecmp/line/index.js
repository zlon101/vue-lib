import SplitLine from './src/splitLine';
export { default as example } from './example/usage';

SplitLine.install = function(Vue) {
  if (SplitLine.installed) return;
  SplitLine.installed = true;
  Vue.component(SplitLine.name, SplitLine);
};

export default SplitLine;
