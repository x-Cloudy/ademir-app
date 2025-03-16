<template>
  <div v-if="hasAccess(['Cripto', 'admin'])" id="app">
    <UserPyramid style="scale: 0.8;" :userIds="users"
    :depth="isMobile() ? 2 : 3"/>
  </div>

  <RestrictPage v-else />
</template>

<script setup lang="ts">
import UserPyramid from 'src/components/Pyramid/UserPyramid.vue'
import RestrictPage from 'src/components/RestrictPage/RestrictPage.vue';
import { hasAccess } from 'src/utils/can-access';
import isMobile from 'src/utils/isMobile';

const users = Array.from({ length: 100 }, (_, index) => ({
  id: index + 1,
  nome: `Usuário ${index + 1}`,
}));
</script>

<style scoped>

</style>
