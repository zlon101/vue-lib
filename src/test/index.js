import Vue from 'vue';
import App from './index.vue';

Vue.config.productionTip = true;
Vue.prototype.$msg = () => {};

new Vue({
  render: h => h(App),
}).$mount('#app');
