<template>
  <MobileComponent v-if="isMobile()" />
  <DesktopLogin v-else />
</template>

<script setup lang="ts">
import MobileComponent from './components/MobileComponent.vue'
import DesktopLogin from './components/DesktopLogin.vue'
import isMobile from 'src/utils/isMobile'
import { useAuthStore } from 'src/stores/authStore'
import { watch } from 'vue'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

watch(
  () => authStore.isLogged,
  async (value) => {
    if (value) {
      await router.push("/home")
    }
  }
)
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
