<template>
  <div class="sidebar">
      <div class="q-mt-md q-mb-lg">
        <q-img class="q-mx-auto block q-mb-md q-mt-md" :src="logo" />
      </div>

      <div class="q-gutter-md">
        <div :class="{ active: currentRoute === '/home' }" class="menu-item" @click="activeMenu = '/home'">
          <router-link to="/home" class="link q-pa-md" :class="{ linkActive: currentRoute === '/home' }">
            <q-icon name="home" size="30px" class="q-mr-sm" />
            Home
          </router-link>
        </div>
        <div :class="{ active: currentRoute === '/usuarios' }" class="menu-item" @click="activeMenu = '/usuarios'">
          <router-link to="/usuarios" class="link q-pa-md" :class="{ linkActive: currentRoute === '/usuarios' }">
            <q-icon name="people" size="30px" class="q-mr-sm" />
            Usuarios
          </router-link>
        </div>
        <div :class="{ active: currentRoute === '/grafico' }" class="menu-item" @click="activeMenu = '/grafico'">
          <router-link to="/grafico" class="link q-pa-md" :class="{ linkActive: currentRoute === '/grafico' }">
            <q-icon name="stock" size="30px" class="q-mr-sm" />
            Gráfico
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