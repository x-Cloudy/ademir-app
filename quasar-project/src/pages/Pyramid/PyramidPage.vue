<template>
  <div v-if="hasAccess(['Invistribe', 'admin'])" id="app">
    <UserPyramid :userIds="users"
    :depth="3"/>
    <WppBtn />
  </div>
  <RestrictPage v-else />
</template>

<script setup lang="ts">
import UserPyramid from 'src/components/Pyramid/UserPyramid.vue'
import RestrictPage from 'src/components/RestrictPage/RestrictPage.vue';
import WppBtn from 'src/components/Buttons/WppBtn.vue';
import { hasAccess } from 'src/utils/can-access';

const users = Array.from({ length: 100 }, (_, index) => ({
  id: index + 1,
  nome: `Usuário ${index + 1}`,
}));
</script>

<style scoped>

</style>
