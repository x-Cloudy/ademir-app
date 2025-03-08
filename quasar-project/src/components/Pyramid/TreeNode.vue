<template>
  <li>
    <!-- Nó atual -->
    <div>
      <!-- Exibe a fração (n/d) -->
      {{ node.fraction.n }}/{{ node.fraction.d }}
      <!-- Exibe o ID do usuário, se houver -->
      <span v-if="node.userId">{{ node.userId }}</span>
    </div>

    <!-- Filhos (esquerdo e direito) -->
    <ul v-if="node.left || node.right">
      <TreeNode v-if="node.left" :node="node.left" />
      <TreeNode v-if="node.right" :node="node.right" />
    </ul>
  </li>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps({
  node: {
    type: Object,
    required: true
  }
})
</script>
