<template>
  <div id="app">
    <UserPyramid :userIds="users"
    :depth="3"/>
  </div>
</template>

<script setup lang="ts">
import UserPyramid from 'src/components/Pyramid/UserPyramid.vue'

const users = Array.from({ length: 100 }, (_, index) => ({
  id: index + 1,
  nome: `Usuário ${index + 1}`,
}));
</script>

<style scoped>

</style>
