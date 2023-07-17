import TimePicker from './src/timepicker.vue';
export { default as calendar } from './src/calendar';

TimePicker.install = function(app) {
  app.component(TimePicker.name, TimePicker);
};

export default TimePicker;
