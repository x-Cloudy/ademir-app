<template>
  <MobileLogin v-if="isMobile()" 
    @onLogin="onSubmit"
    @onRegister="onRegister"
    />

  <DesktopLogin v-else />
</template>

<script setup lang="ts">
import MobileLogin from './components/MobileLogin.vue'
import DesktopLogin from './components/DesktopLogin.vue'
import isMobile from 'src/utils/isMobile'

const onRegister = (value: any) => {
  console.log('register attempt', value)
}

const onSubmit = (value: any) => {
  console.log('Login attempt:', value)
}

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