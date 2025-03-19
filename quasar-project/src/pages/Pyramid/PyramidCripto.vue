<template>
  <!-- <div v-if="hasAccess(['Cripto', 'admin'])" id="app">
    <UserPyramid style="scale: 0.8;" :userIds="users"
    :depth="isMobile() ? 2 : 3"/>
  </div>

  <RestrictPage v-else /> -->
  <BinaryTree :treeData="tree"/>
</template>

<script setup lang="ts">
import UserPyramid from 'src/components/Pyramid/UserPyramid.vue'
import RestrictPage from 'src/components/RestrictPage/RestrictPage.vue';
import { hasAccess } from 'src/utils/can-access';
import isMobile from 'src/utils/isMobile';
import BinaryTree from 'src/components/BinaryTree/BinaryTree.vue';

const users = Array.from({ length: 100 }, (_, index) => ({
  id: index + 1,
  nome: `Usuário ${index + 1}`,
}));

const tree = {
  id: 1,
  name: "Juan",
  sidePreference: "right",
  left: {
    id: 2,
    name: "Maria",
    sidePreference: "left",
    left: null,
    right: null
  },
  right: {
    id: 3,
    name: "Carlos",
    sidePreference: "right",
    left: {},
    right: {
      id: 4,
      name: "Ana",
      sidePreference: "left",
      left: null,
      right: null
    }
  }
};
</script>

<style scoped>

</style>
