<template>
    <q-card-section class="card-section">
      <div class="bg-dark text-white absolute full-width q-pa-md flex items-center section-header">
        <p style="margin: 0; font-weight: 600; color: #F2C037;">{{ props.title }}</p>
      </div>
      <slot></slot>
    </q-card-section>
</template>

<script setup lang="ts">
const props = defineProps({
  title: String
})
</script>

<style scoped>
* {
  font-family: Poppins;
}

.card-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  background-color: lightgray;
  padding-top: 60px;
}

.section-header {
  left: 0;
  top: 0;
  border-radius: 5px 5px 0 0;
  height: 50px;
}
</style>