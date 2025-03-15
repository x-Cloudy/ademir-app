import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/ContainerLayout.vue'),
    children: [{ path: '', component: () => import('pages/Entry/EntryPage.vue') }],
  },
  {
    path: '/register/:id?',
    component: () => import('layouts/ContainerLayout.vue'),
    children: [{ path: '', component: () => import('pages/Register/RegisterPage.vue') }],
  },
  {
    path: '/recuperar-senha',
    component: () => import('layouts/ContainerLayout.vue'),
    children: [{ path: '', component: () => import('pages/PasswordRecovery/RecoveryPage.vue') }],
  },
  {
    path: '/home',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/homePage.vue') }],
    meta: { requiresAuth: true },
  },
  {
    path: '/ranking',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/Ranking/RankingPage.vue') }],
    meta: { requiresAuth: true },
  },
  {
    path: '/perfil',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/Perfil/PerfilPage.vue') }],
    meta: { requiresAuth: true, },
  },
  {
    path: '/usuarios',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/Users/UsersPage.vue') }],
    meta: { requiresAuth: true },
  },
  {
    path: '/grafico',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/Pyramid/PyramidCripto.vue') }],
    meta: { requiresAuth: true },
  },
  {
    path: '/matriz-invis',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/Pyramid/PyramidPage.vue') }],
    meta: { requiresAuth: true },
  },
  {
    path: '/options',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/Options/OptionsPage.vue') }],
    meta: { requiresAuth: true },
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
