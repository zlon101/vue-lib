import numberInput from './src/numberInput.vue';
export { default as example } from './example/usage.vue';

numberInput.install = function(Vue) {
  Vue.component(numberInput.name, numberInput);
};

export default numberInput;
