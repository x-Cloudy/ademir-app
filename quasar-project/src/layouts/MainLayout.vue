<template>
  <q-layout class="layout" :style="{paddingLeft: isMobile() ? '0px' : '250px'}">
    <SideBar v-if="!isMobile()" />
    <div style="height: 100%;">
      <q-card class="top-menu" :style="{justifyContent: isMobile() ? 'space-between' : 'end'}">
        <q-btn v-if="isMobile()" flat class="text-white">
          <q-icon name="menu"></q-icon>
        </q-btn>

        <div class="flex items-center justify-center" style="margin: 0;">
          <p class="text-white q-mr-sm q-mt-md">{{ authStore.user.name }}</p>
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
import { useAuthStore } from 'src/stores/authStore';
import isMobile from 'src/utils/isMobile';

const router = useRouter()
const authStore = useAuthStore()

</script>

<style scoped lang="scss">
.layout {
  width: auto;
  min-height: 100vh !important;
  padding-top: 1rem;
  background: linear-gradient(0deg, rgb(255, 255, 255) 0%, rgba(236,232,192,1) 65%, rgba(209,209,209,1) 100%);
}

.top-menu {
  display: flex;
  align-items: center;
  background-color: rgb(43, 42, 42);
  height: 70px;
  padding: 1rem;
  margin: 0 1rem;
}
</style>
