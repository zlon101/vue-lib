import { createApp } from 'vue';
import {createRouter, createWebHistory} from 'vue-router';
import App from './App.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('./home.vue'),
    },
    {
      path: '/a',
      name: 'PageA',
      component: () => import('./page-a.vue'),
    },
    {
      path: '/b',
      name: 'PageB',
      component: () => import('./page-b.vue'),
    },
  ],
});

const app = createApp(App);
window._APP = app;
app.use(router);
app.mount('#app');
