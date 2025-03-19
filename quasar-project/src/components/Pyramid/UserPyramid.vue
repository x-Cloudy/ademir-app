<template>
  <div class="tree" ref="treeContainer">
    <ul v-if="treeRoot">
      <TreeNode :node="treeRoot" />
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, defineProps, onMounted, nextTick } from 'vue'
import TreeNode from './TreeNode.vue'

const props = defineProps({
  userIds: {
    type: Array,
    default: () => []
  },
  depth: {
    type: Number,
    default: 3
  }
})

const treeContainer = ref<HTMLElement | null>(null);

function generateSternBrocotTree(depth: any, leftBound = { n: 0, d: 1 }, rightBound = { n: 1, d: 0 }) {
  const mediant = { n: leftBound.n + rightBound.n, d: leftBound.d + rightBound.d }

  const node = {
    fraction: mediant,
    left: null,
    right: null,
    userId: null
  } as any

  // Se ainda não atingiu a profundidade, gera filhos recursivamente
  if (depth > 0) {
    node.left = generateSternBrocotTree(depth - 1, leftBound, mediant)
    node.right = generateSternBrocotTree(depth - 1, mediant, rightBound)
  }
  return node
}

// Atribui os IDs de usuário aos nós em ordem (travessia em largura - BFS)
function assignUserIds(root: any, userIds: any) {
  let index = 0
  const queue = [root]
  while (queue.length > 0 && index < userIds.length) {
    const current = queue.shift()
    current.userId = userIds[index]
    index++
    if (current.left) queue.push(current.left)
    if (current.right) queue.push(current.right)
  }
}

const treeRoot = ref(null)

// Monta ou reconstrói a árvore quando as props mudam
function buildTree() {
  // Gera a árvore até a profundidade informada
  treeRoot.value = generateSternBrocotTree(props.depth)
  // Atribui IDs de usuário (se existirem)
  assignUserIds(treeRoot.value, props.userIds)
}

onMounted(async () => {
  await nextTick(() => {
    if (treeContainer.value) {
      treeContainer.value.scrollLeft = (treeContainer.value.scrollWidth - treeContainer.value.clientWidth) / 2;
    }
  });
});

// Observa mudanças em userIds e depth, e reconstrói a árvore
watch(() => [props.userIds, props.depth], () => {
  buildTree()
}, { immediate: true })
</script>

<style>
.tree {
  margin: 0;
  padding: 0;
  overflow-x: scroll;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.tree::-webkit-scrollbar {
  display: none;
}

.tree ul {
  position: relative;
  padding: 1em 0;
  white-space: nowrap;
  margin: 0 auto;
  text-align: center;
}

.tree ul::after {
  content: '';
  display: table;
  clear: both;
}

.tree li {
  display: inline-block;
  vertical-align: top;
  text-align: center;
  list-style-type: none;
  position: relative;
  padding: 1em .5em 0 .5em;
}

.tree li::after {
  right: auto;
  left: 50%;
  border-left: 1px solid #ccc;
}

/* Se o nó for filho único, não desenha as linhas de divisão */
.tree li:only-child::after,
.tree li:only-child::before {
  display: none;
}

.tree li:only-child {
  padding-top: 0;
}

/* Ajustes para o primeiro e último filho de cada nível */
.tree li:first-child::after,
.tree li:last-child::before {
  border: 0 none;
}

.tree li:last-child::before {
  border-right: 1px solid #ccc;
  border-radius: 0 5px 0 0;
}

.tree li:first-child::after {
  border-radius: 5px 0 0 0;
}

/* O conteúdo do nó em si (div) */
.tree li div {
  border: 1px solid #ccc;
  padding: .5em 1em;
  display: inline-block;
  border-radius: 10px;
  width: 100px;
  height: 50px;
  /* deixa o nó arredondado */
  min-width: 2em;
  min-height: 2em;
  line-height: 2em;
  background: #fff;
  position: relative;
  top: 1em;
}
</style>
