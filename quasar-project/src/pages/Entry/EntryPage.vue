<template>
  <MobileComponent v-if="isMobile()" />
  <DesktopLogin v-else />
</template>

<script setup lang="ts">
import MobileComponent from './components/MobileComponent.vue'
import DesktopLogin from './components/DesktopLogin.vue'
import isMobile from 'src/utils/isMobile'

</script>

<style lang="scss" scoped>
.login-card {
  width: 900px;
  max-width: 90vw;
  border-radius: 8px;
  height: 650px;
  overflow: hidden;
}

</style>