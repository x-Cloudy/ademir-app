import type { Role } from "src/types";

const menus = [
  {
    name: 'Home',
    path: '/home',
    icon: 'home',
    roles: ['admin', 'Invistribe'] as Role[]
  },
  {
    name: 'Vídeos Intelectus',
    path: '/videos-intelectus',
    icon: 'smart_display',
    roles: ['admin', 'INTELECTUS'] as Role[]
  },
  {
    name: 'Ranking Intelectus',
    path: '/ranking-Intelectus',
    icon: 'leaderboard',
    roles: ['admin', 'INTELECTUS'] as Role[]
  },
  {
    name: 'Ranking Invistribe',
    path: '/ranking-invistribe',
    icon: 'leaderboard',
    roles: ['admin', 'Invistribe'] as Role[]
  },
  {
    name: 'Matriz InvisTribe',
    path: '/matriz-invis',
    icon: 'stock',
    roles: ['admin', 'Invistribe'] as Role[]
  },
  {
    name: 'Matriz Intelectus',
    path: '/matriz-cripto',
    icon: 'stock',
    roles: ['admin', 'INTELECTUS'] as Role[]
  },
  {
    name: 'Usuários',
    path: '/usuarios',
    icon: 'people',
    roles: ['admin'] as Role[]
  },
  {
    name: 'Opções',
    path: '/options',
    icon: 'settings',
    roles: ['admin'] as Role[]
  },
]

export default menus;
