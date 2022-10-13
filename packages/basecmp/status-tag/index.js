import StatusTag from './src/statusTag';
export { default as example } from './example/usage';

StatusTag.install = function(Vue) {
  if (StatusTag.installed) return;
  StatusTag.installed = true;
  Vue.component(StatusTag.name, StatusTag);
};

export default StatusTag;
