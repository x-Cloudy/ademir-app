<template>
  <div class="q-mt-xl">
    <h4 class="title">
      ACESSO NEGADO
    </h4>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter()

onMounted(() => {
  setTimeout(() => {
    router.back()
  }, 1000)
})
</script>

<style scoped>
* {
  font-family: Poppins;
}

.title {
  font-family: arial black;
  font-weight: 400;
  text-align: center;
  margin: 0;
  color: rgb(66, 66, 66) !important;
}

.action-btn {
  width: 25px;
  height: 25px;
  font-size: 10px;
}
</style>
