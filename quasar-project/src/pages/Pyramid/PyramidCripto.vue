<template>
  <div class="flex justify-center items-center" v-if="tree.id">
    <BinaryTree :treeData="tree"/>
    <WppBtn />
  </div>
</template>

<script setup lang="ts">
import BinaryTree from 'src/components/BinaryTree/BinaryTree.vue';
import { api } from 'src/boot/axios';
import { useAuthStore } from 'src/stores/authStore';
import { onBeforeMount, ref } from 'vue';
import WppBtn from 'src/components/Buttons/WppBtn.vue';

const authStore = useAuthStore()
const tree = ref<any>({})

const getTreeData = async () => {
  try {
    const response = await api.get(`/tree/${authStore.user.id}`);
    const children = response.data.children
    tree.value = children
    console.log(tree.value)
  } catch (error) {
    console.log(error)
  }
}

// const tree = {
//   id: 1,
//   name: "Juan",
//   sidePreference: "right",
//   left: {},
//   right: {}
// };

onBeforeMount(async () => {
  await getTreeData()
})
</script>

<style scoped>

</style>
