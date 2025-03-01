<template>
  <q-layout class="layout">
    <SideBar />
    <div>
      <q-card class="top-menu">
        <div class="flex items-center justify-center" style="margin: 0;">
          <p class="text-white q-mr-sm q-mt-md">Nome</p>
          <q-btn 
            @click="router.push('/perfil')"
            class="bg-warning" 
            style="height: 50px; width: 50px; border-radius: 50%; margin: 0;">
            <q-icon name="diamond" size="md" />
          </q-btn>
        </div>
      </q-card>

      <router-view />
    </div>
  </q-layout>
</template>

<script setup lang="ts">
import SideBar from './SideBar.vue';
import { useRouter } from 'vue-router';

const router = useRouter()

</script>

<style scoped lang="scss">
.layout {
  padding-left: 250px;
  padding-top: 1rem;
  height: 100%;
}

.top-menu {
  display: flex;
  align-items: center;
  justify-content: end;
  background-color: rgb(43, 42, 42);
  height: 70px;
  padding: 1rem;
  margin: 0 1rem;
}
</style>
