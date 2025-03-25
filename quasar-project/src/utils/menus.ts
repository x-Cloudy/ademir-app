import type { Role } from "src/types";

const menus = [
  {
    name: 'Home',
    path: '/home',
    icon: 'home',
    roles: ['admin', 'Invistribe'] as Role[]
  },
  {
    name: 'Ranking',
    path: '/ranking',
    icon: 'leaderboard',
    roles: ['admin', 'Invistribe'] as Role[]
  },
  {
    name: 'Usuários',
    path: '/usuarios',
    icon: 'people',
    roles: ['admin'] as Role[]
  },
  {
    name: 'Matriz InvisTribe',
    path: '/matriz-invis',
    icon: 'stock',
    roles: ['admin', 'Invistribe'] as Role[]
  },
  {
    name: 'Matriz Cripto',
    path: '/matriz-cripto',
    icon: 'stock',
    roles: ['admin', 'INTELECTUS'] as Role[]
  },
  {
    name: 'Opções',
    path: '/options',
    icon: 'settings',
    roles: ['admin'] as Role[]
  },
]

export default menus;
