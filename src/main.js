import Vue from 'vue';
import '../packages/styles/index.less'; // 全局样式
import 'github-markdown-css';
import './markdown.less';
import '../packages/basecmp/icon/src/font.less'; // icon-font
import App from './App.vue';
import router from './router';

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
