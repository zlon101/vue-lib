## Props

| 名称         | 类型      | 默认值  | 必填  | 描述       |
|:-----------|:--------|:-----|:----|:---------|
| visible    | Boolean | true | 否   | 是否显示     |
| routes     | Array   | -    | 是   | 路由配置列表   |
| iconCmp    | Object  | -    | 否   | 图标属性配置对象 |
| iconCfg    | Object  | -    | 否   | 所用图标组件对象 |
| miniScreen | Boolean | -    | 否   | 是否使用小屏显示 |

## Slot

| 名称      | 描述   |
|:--------|:-----|
| default | 头部插槽 |

## 事件

| 名称             | 描述          |
|:---------------|:------------|
| update:visible | 小屏点击空白自动隐藏  |

## routes 配置项

| 名称          | 描述                 |
|:------------|:-------------------|
| name        | 路由名称               |
| path        | 路由path             |
| component   | 组件                 |
| redirect    | 重定向地址              |
| hidden      | 是否在导航栏中隐藏          |
| permis      | 所需权限               |
| meta.title  | 导航栏和面包屑中显示的名称      |
| meta.icon   | 导航栏中使用的图标名称        |
| meta.sort   | 用于确定导航栏中的位置，越小约靠前  |
| meta.parent | 父级路由，用于面包屑中跳转到上级路由 |

```javascript
import { normalize } from './src/normalize.js';

const routeCfg = {
  path: 'case',
  component: RouteView,
  redirect: 'case/list',
  meta: { title: 'xxxx', icon: 'IconCase', sort: 0 },
  children: [
    {
      path: 'list',
      name: 'SDSS',
      permis: '权限',
      component: () => import('@/pages/case/list'),
      meta: { title: 'xas' },
    },
    {
      path: 'detail',
      name: 'DASA',
      permis: '权限',
      component: () => import('@/pages/case/detail'),
      meta: { title: 'asdf', parent: 'list' },
    },
  ],
};
normalize({ path: Prefix }, routeCfg);


// 或者动态加载路由
const Prefix = '/Prefix';
let ManaList = [];
const reqRoute = require.context('./modules', false, /\.js$/);
reqRoute.keys().forEach(name => {
  const cfg = reqRoute(name).default;
  normalize({ path: Prefix }, cfg);
  ManaList.push(cfg);
});
ManaList.sort((a, b) => a.meta.sort - b.meta.sort);

const routeList = [
  {
    path: '/login',
    component: () => import('@/pages/login'),
    hidden: true,
  },
  {
    path: Prefix,
    component: Layout,
    hidden: true,
    redirect: `${Prefix}/${defaultPath}`,
    children: ManaList,
  },
  { path: '*', redirect: `${Prefix}/${defaultPath}`, hidden: true },
];

const createRouter = () =>
  new VueRouter({
    mode: 'history',
    routes: routeList,
  });

const router = createRouter();
export default router;
```