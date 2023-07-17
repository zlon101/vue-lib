<template>
  <div class="c-example">
    <Sidebar
      :routes="routes"
      :iconCmp="SideIcons"
      :iconCfg="iconCfg"
      :visible.sync="visibleSidebar"
    >
      <template #header>
        <router-link class="logo-wrap" to="/">
          <!--<img src="@/assets/wss_logo.png" alt="wss" />-->
        </router-link>
      </template>
    </Sidebar>
  </div>
</template>

<script>
import { RouterView } from 'vue-router';
import Sidebar from '../src/sidebar';
import { IconYes, IconGithub } from '../../icon';

// 路由配置列表
const RouterCfg = [
  {
    path: 'case',
    component: RouterView,
    redirect: 'case/list',
    meta: { title: '标题A', icon: 'IconYes', sort: 0 },
    children: [
      {
        path: 'list',
        name: 'CaseList',
        permis: 'PermissionCaseList',
        component: () => import('@/pages/image'),
        meta: { title: '标题A-11' },
      },
    ],
  },
  {
    path: 'fghq',
    component: RouterView,
    redirect: 'case/list',
    meta: { title: '标题B', icon: 'IconGithub', sort: 3 },
    children: [
      {
        path: 'list',
        name: 'CaseList',
        permis: 'PermissionCaseList',
        component: () => import('@/pages/style'),
        meta: { title: '标题B-11' },
      },
      {
        path: 'detail',
        name: 'CaseDetail',
        permis: 'PermissionCaseList',
        component: () => import('@/pages/tool'),
        meta: { title: '标题B-22' },
      },
    ],
  },
];

const initAttr = () => {
  return new Array(5).fill('').reduce((acc, _, ind) => {
    acc[ind] = 'currentColor';
    return acc;
  }, {});
};

const SideIconCmp = { IconYes, IconGithub };

export default {
  components: { Sidebar },
  data() {
    return {
      routes: null,
      SideIcons: null,
      iconCfg: {
        default: {
          s: '20px',
          fill: initAttr(),
          stroke: initAttr(),
        },
        IconYes: {
          fill: { 0: 'red' },
        },
        IconGithub: {
          fill: { 0: 'red' },
        },
      },
      visibleSidebar: true,
    };
  },
  created() {
    const iconMap = {};
    const routes = [];
    RouterCfg.forEach(item => {
      if (!item.hidden) routes.push(item);
      const iconName = item.meta && item.meta.icon;
      if (iconName) {
        iconMap[iconName] = SideIconCmp[iconName];
      }
    });
    this.routes = routes;
    this.SideIcons = iconMap;
  },
};
</script>
