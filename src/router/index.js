import { createRouter, createWebHistory, RouterView } from 'vue-router';
import Home from '../pages/home/index.vue';

const IgnoreDirs = ['node_modules'];
const loadFile = (pkgPath, component, compDir, list) => {
  // pkgPath: ./input/example/index.vue
  if (IgnoreDirs.some(item => pkgPath.includes(item))) {
    return;
  }
  const paths = pkgPath.split('/');
  const pkgName = paths[paths.length - 3];
  const caseName = compDir.replace(/^\w/, c => c.toUpperCase()) + pkgName.replace(/^\w/, c => c.toUpperCase());
  list.push({
    name: caseName,
    path: pkgName,
    component,
  });
};

// 基础组件
const BaseCmp = [];
let pkgMap = import.meta.glob('../../packages/**/example/index.vue');
Object.keys(pkgMap).forEach(pkgPath => loadFile(pkgPath, pkgMap[pkgPath], 'basecmp', BaseCmp));

// 业务组件
const BusinessCmp = [];
pkgMap = import.meta.glob('../../packages/business/**/example/index.vue');
Object.keys(pkgMap).forEach(pkgPath => loadFile(pkgPath, pkgMap[pkgPath], 'business', BusinessCmp));

// 指令
const Directive = [];
pkgMap = import.meta.glob('../../packages/directives/**/example/index.vue');
Object.keys(pkgMap).forEach(pkgPath => loadFile(pkgPath, pkgMap[pkgPath], 'directives', Directive));

// 扩展的全局vue方法
const GlobalMethod = [];
pkgMap = import.meta.glob('../../packages/extends/**/example/index.vue');
Object.keys(pkgMap).forEach(pkgPath => loadFile(pkgPath, pkgMap[pkgPath], 'extends', GlobalMethod));

const routeList = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/image',
    name: 'Image',
    component: () => import('../pages/image/index.vue'),
  },
  {
    path: '/tool',
    name: 'Tool',
    component: () => import('../pages/tool/index.vue'),
  },
  {
    path: '/style',
    name: 'Style',
    component: () => import('../pages/style/index.vue'),
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

const Route = createRouter({
  history: createWebHistory(),
  routes: routeList,
});

// 全局导航守卫
Route.beforeEach((to, from) => {
  console.debug(`to: ${to.path} from: ${from.path}`);
});

export default Route;
