import Vue from 'vue';
import 'github-markdown-css';
import './markdown.less';
import '../packages/styles/index.less'; // 全局样式
import '../packages/basecmp/icon/src/font.less'; // icon-font
import App from './App.vue';
import router from './router';

window._IsProd = process.env.NODE_ENV === 'production';
Vue.config.productionTip = false;
console.debug(`环境: ${process.env.NODE_ENV}`);

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
