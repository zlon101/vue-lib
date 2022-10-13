import Radio from './src/radio';

Radio.install = function(Vue) {
  if (Radio.installed) return;
  Radio.installed = true;
  Vue.component(Radio.name, Radio);
};

export default Radio;
