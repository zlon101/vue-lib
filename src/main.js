import Vue from 'vue';
import 'github-markdown-css';
import './markdown.less';
import '../packages/styles/index.less'; // 全局样式
import '../packages/basecmp/icon/src/font.less'; // icon-font
import App from './App.vue';
import router from './router';

const isProd = process.env.NODE_ENV === 'production';
window._IsProd = isProd;
Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
