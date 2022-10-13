import TimeInput from './src/timeInput';
export { default as example } from './example/usage';

TimeInput.install = function(Vue) {
  if (TimeInput.installed) return;
  TimeInput.installed = true;
  Vue.component(TimeInput.name, TimeInput);
};

export default TimeInput;
