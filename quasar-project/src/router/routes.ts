import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/IndexPage.vue') }],
  },
  {
    path: '/login',
    component: () => import('layouts/ContainerLayout.vue'),
    children: [{ path: '', component: () => import('pages/Login/LoginPage.vue') }],
  },
  {
    path: '/register',
    component: () => import('layouts/ContainerLayout.vue'),
    children: [{ path: '', component: () => import('pages/Register/RegisterPage.vue') }],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
