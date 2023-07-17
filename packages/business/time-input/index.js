import TimeInput from './src/timeInput';
export { default as example } from './example/usage';

TimeInput.install = function(app) {
  if (TimeInput.installed) return;
  TimeInput.installed = true;
  app.component(TimeInput.name, TimeInput);
};

export default TimeInput;
