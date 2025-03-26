<template>
  <div v-if="hasAccess(['INTELECTUS', 'admin']) && tree.id" class="flex justify-center items-center">
    <BinaryTree :key="treeKey" :treeData="tree" @userPosition="(value) => getTreeData({id: value})" />
    <WppBtn />
    <!-- <q-page-sticky position="top-right" :offset="[30, 150]">
      <q-btn @click="getTreeData({maxDepth: 500})" color="warning text-black" style="font-weight: bold;">
        Árvore completa
      </q-btn>
    </q-page-sticky> -->
    <q-page-sticky position="top-right" :offset="[30, 200]">
      <q-btn @click="getTreeData({id:authStore.user.id, maxDepth: 15})" color="warning text-black" style="font-weight: bold;">
        Topo da árvore
      </q-btn>
    </q-page-sticky>
  </div>
</template>

<script setup lang="ts">
import BinaryTree from 'src/components/BinaryTree/BinaryTree.vue';
import vars from 'src/utils/vars';
import { api } from 'src/boot/axios';
import { useAuthStore } from 'src/stores/authStore';
import { onBeforeMount, ref } from 'vue';
import { hasAccess } from 'src/utils/can-access';
import WppBtn from 'src/components/Buttons/WppBtn.vue';

const authStore = useAuthStore()
const tree = ref<any>({})
const treeKey = ref(0);

const getTreeData = async (
  { id = vars.admin_id, maxDepth = 15 }: { id?: number, maxDepth?: number }
) => {
  try {
    const response = await api.get(`/tree/${id ? id : authStore.user.id}/${maxDepth}`);
    const children = response.data.children
    tree.value = children
    treeKey.value++
  } catch (error) {
    console.log(error)
  }
}

onBeforeMount(async () => {
  await getTreeData({id: authStore.user.id})
})
</script>

<style scoped></style>
