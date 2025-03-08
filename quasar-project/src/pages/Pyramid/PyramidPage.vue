<template>
  <div id="app">
    <UserPyramid :userIds="['U1', 'U2', 'U3', 'U4', 'U5', 'U6']"
    :depth="4"/>
  </div>
</template>

<script setup lang="ts">
import UserPyramid from 'src/components/Pyramid/UserPyramid.vue'

const users = Array.from({ length: 100 }, (_, index) => ({
  id: index + 1,
  nome: `Usuário ${index + 1}`,
}));

console.log(users);

</script>

<style scoped>

</style>