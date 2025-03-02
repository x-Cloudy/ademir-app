<template>
  <div class="sidebar">
    <div class="q-mt-md q-mb-lg">
      <q-img class="q-mx-auto block q-mb-md q-mt-md" :src="logo" />
    </div>

    <div v-for="(item, index) of menus" :key="index">
      <div :class="{ active: currentRoute === item.path }" class="menu-item" @click="activeMenu = item.path">
        <router-link :to="item.path" class="link q-pa-md" :class="{ linkActive: currentRoute === item.path }">
          <q-icon :name="item.icon" size="25px" class="q-mr-sm" />
          {{ item.name }}
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import logo from 'assets/LogoBrancasemfundo.png'
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute()
const activeMenu = ref('home')
const currentRoute = computed(() => route.path)
const menus = [
  {
    name: 'Home',
    path: '/home',
    icon: 'home'
  },
  {
    name: 'Ranking',
    path: '/ranking',
    icon: 'leaderboard'
  },
  {
    name: 'Usuários',
    path: '/usuarios',
    icon: 'people'
  },
  {
    name: 'Gráfico',
    path: '/grafico',
    icon: 'stock'
  },
  {
    name: 'Opções',
    path: '/options',
    icon: 'settings'
  },
]
</script>

<style scoped lang="scss">
.sidebar {
  color: black;
  background-color: rgb(43, 42, 42);
  width: 250px;
  float: left;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  bottom: 0;
  padding: 1.25em;
  box-shadow: 0.5px 0px 40px 3px rgba(123, 123, 123, 0.4);
  transition: 0.6s ease;
  display: flex;
  flex-direction: column;
}

.menu-item {
  display: flex;
  justify-content: start;
  align-items: center;
  height: 45px;
  text-decoration: none;
  border-radius: 5px;
  margin-bottom: 1rem;
}

.active {
  background-color: white;
  color: black;
}

.linkActive {
  color: black !important;
}

.link {
  text-decoration: none;
  color: white;
  font-weight: 500;
}
</style>