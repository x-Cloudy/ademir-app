import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/ContainerLayout.vue'),
    children: [{ path: '', component: () => import('pages/Entry/EntryPage.vue') }],
  },
  {
    path: '/recuperar-senha',
    component: () => import('layouts/ContainerLayout.vue'),
    children: [{ path: '', component: () => import('pages/PasswordRecovery/RecoveryPage.vue') }],
  },        
  {
    path: '/home',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/IndexPage.vue') }],
  },
  {
    path: '/usuarios',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/Users/UsersPage.vue') }],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
