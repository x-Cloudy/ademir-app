<template>
  <li>
    <!-- Nó atual -->
    <div @click="($this: any) => console.log($this.target.className)"
      :class="`${node.userId.id}`"
      :style="{ backgroundImage: `url(${Logo})` }"
      style="background-position: center center; background-size: cover; background-repeat: no-repeat; background-color: rgb(42, 42, 42);">
      <!-- Exibe a fração (n/d) -->
      <!-- {{ node.fraction.n }}/{{ node.fraction.d }} -->
      <!-- Exibe o ID do usuário, se houver -->
      <p style="transform: translate(0, 40px); font-weight: 600;" v-if="node.userId">{{ node.userId.nome }}</p>
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
import Logo from 'assets/LogoDourada.png'

const props = defineProps({
  node: {
    type: Object,
    required: true
  }
})
</script>
