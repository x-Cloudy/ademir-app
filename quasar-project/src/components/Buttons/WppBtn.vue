<template>
  <q-page-sticky position="bottom-right" :offset="[30, 30]">
    <q-btn @click="openWhatsApp" fab icon="chat" style="color: black; background-color: #F2C037;" />
  </q-page-sticky>
</template>

<script setup lang="ts">
const phoneNumber = "5512982550450"; // Substitua pelo número desejado

const openWhatsApp = () => {
  const url = `https://wa.me/${phoneNumber}`;
  window.open(url, "_blank");
};
</script>
