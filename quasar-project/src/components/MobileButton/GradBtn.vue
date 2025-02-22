<template>
  <q-btn 
    @click="emit('btn-click', $event)"
    class="button"
    :type="props.type"
    >
    {{ props.title }}
  </q-btn>
</template>

<script setup lang="ts">
const props = defineProps({
  title: String,
  type: String
})

const emit = defineEmits(['btn-click'])
</script>

<style scoped>
.button {
  width: 100%;
  border-radius: 10px;
  height: 50px;
  background: linear-gradient(90deg, #6EA2F0 0%, #0A6AFB 100%);
  color: white;
}
</style>