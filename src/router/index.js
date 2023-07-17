import {createRouter, createWebHistory} from 'vue-router';
import RouterView from '../router-view';
import Home from '../pages/home';

const IgnoreDirs = ['node_modules'];
const loadFile = (filePath, compDir, list) => {
  // filePath: ./input/example/index.vue
  if (IgnoreDirs.some(item => filePath.includes(item))) {
    return;
  }
  if (/example\/index\.vue$/.test(filePath)) {
    filePath = filePath.replace(/^\.\//, '');
    const name = filePath.split('/')[0];
    const caseName = compDir.replace(/^\w/, c => c.toUpperCase()) + name.replace(/^\w/, c => c.toUpperCase());
    list.push({
      name: caseName,
      path: name,
      component: () => import(`../../packages/${compDir}/${name}/example/index.vue`),
    });
  }
};

// 基础组件
const BaseCmp = [];
const requireRoutes = require.context('../../packages/basecmp', true, /index\.vue$/);
requireRoutes.keys().forEach(path => loadFile(path, 'basecmp', BaseCmp));
// console.debug('BaseCmp\n', BaseCmp);

// 业务组件
const BusinessCmp = [];
const require2 = require.context('../../packages/business', true, /index\.vue$/);
require2.keys().forEach(path => loadFile(path, 'business', BusinessCmp));

// 指令
const Directive = [];
const require3 = require.context('../../packages/directives', true, /index\.vue$/);
require3.keys().forEach(path => loadFile(path, 'directives', Directive));

// 扩展的全局vue方法
const GlobalMethod = [];
const require4 = require.context('../../packages/extends', true, /index\.vue$/);
require4.keys().forEach(path => loadFile(path, 'extends', GlobalMethod));

const routeList = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/image',
    name: 'Image',
    component: () => import('../pages/image'),
  },
  {
    path: '/tool',
    name: 'Tool',
    component: () => import('../pages/tool'),
  },
  {
    path: '/style',
    name: 'Style',
    component: () => import('../pages/style'),
  },
  {
    path: '/basecmp', // 和文件目录相同
    component: RouterView,
    redirect: `/basecmp/${BaseCmp[0].path}`,
    children: BaseCmp,
  },
  {
    path: '/business',
    component: RouterView,
    redirect: `/business/${BusinessCmp[0].path}`,
    children: BusinessCmp,
  },
  {
    path: '/directives',
    component: RouterView,
    redirect: `/directives/${Directive[0].path}`,
    children: Directive,
  },
  {
    path: '/extends',
    component: RouterView,
    redirect: `/extends/${GlobalMethod[0].path}`,
    children: GlobalMethod,
  },
  {
    path: '/:catchAll(.*)',
    redirect: '/',
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes: routeList,
});

export default router;
