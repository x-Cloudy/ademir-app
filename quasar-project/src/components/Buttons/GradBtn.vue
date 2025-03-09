<template>
  <q-btn
    :loading="props.loading"
    :disable="props.disable"
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
  icon: String,
  disable: Boolean,
  loading: Boolean
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
  border-radius: 5px;
  height: 50px;
  background: linear-gradient(120deg, #000000 5%, #6b6b6b 100%);
  color: rgb(255, 208, 0);
}
</style>
