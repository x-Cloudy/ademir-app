<template>
  <q-layout view="lHh Lpr lFf" class="layout">
    <!-- <q-header elevated>
      <div class="q-px-xl bg-white row" style="
          display: flex;
          width: 100%; 
          height: 85px;
          align-items: center;
        ">
        <div class="flex items-center col-8 no-wrap">
          <q-img :src="logo2" style="width: 130px; margin-right: 4rem; min-width: 100px;" />
          <div style="display: flex; width: auto; gap: 3rem;">
            <p @click="router.push('/usuarios')">Usuários</p>
            <p @click="router.push('/grafico')">Gráfico
            </p>
            <p @click="router.push('/usuarios')">Usuários</p>
          </div>
        </div>

        <div class="flex items-center justify-end col-4" style="height: 85px;"> 
          <GradBtn :title="'Meu perfil'" icon="person" style="width: 150px; height: 45px;"/>
        </div>

      </div>
    </q-header> -->

    <div class="sidebar">
      <div class="q-mt-md q-mb-lg">
        <q-img class="q-mx-auto block q-mb-md q-mt-md" :src="logo" />
      </div>

      <q-scholl-area class="q-gutter-md">
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
      </q-scholl-area>
    </div>

    <q-page-container>
      <q-card class="top-menu">
        <div class="flex items-center justify-center" style="margin: 0;">
          <p class="text-white q-mr-sm q-mt-md">Nome</p>
          <q-btn class="bg-warning" style="height: 50px; width: 50px; border-radius: 50%; margin: 0;">
            <q-icon name="diamond" size="md" />
          </q-btn>
        </div>
      </q-card>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import GradBtn from 'src/components/MobileButton/GradBtn.vue';
import logo from 'assets/LogoBrancasemfundo.png'
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute()
const activeMenu = ref('home')
const currentRoute = computed(() => route.path)

</script>

<style scoped lang="scss">
.layout {
  background: #eceff1;
  padding-left: 250px;
}

.top-menu {
  display: flex;
  align-items: center;
  justify-content: end;
  background-color: rgb(43, 42, 42);
  height: 70px;
  margin: 1rem;
  padding: 1rem;
}

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
