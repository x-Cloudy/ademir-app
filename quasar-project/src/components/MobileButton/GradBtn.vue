<template>
  <q-btn 
    @click="emit('btn-click', $event)"
    class="button"    
    :type="props.type"
    >
    {{ props.title }}
    <q-icon :name="props.icon" v-if="props.icon" size="xs" class="q-mb-xs q-ml-sm" />
  </q-btn>
</template>

<script setup lang="ts">
const props = defineProps({
  title: String,
  type: String,
  icon: String
})

const emit = defineEmits(['btn-click'])
</script>

<style scoped>
.button {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: nowrap;
  width: 100%;
  border-radius: 10px;
  height: 50px;
  background: linear-gradient(90deg, #6EA2F0 0%, #0A6AFB 100%);
  color: white;
}
</style>