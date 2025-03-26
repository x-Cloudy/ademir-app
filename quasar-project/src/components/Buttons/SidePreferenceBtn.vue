<template>
  <div v-if="hasAccess(['INTELECTUS', 'admin'])"
    class=" flex column items-center justify-center" style="border-radius: 5px; background-color: lightgrey; width: 100%;">
    <div class="flex no-wrap items-center justify-center">
      <p class="text-black"
      :class="{active: getSidePreferencePt(authStore.user.sidePreference) === 'Esquerdo'}"
      style="margin: 0; font-weight: bold;" >Esquerda</p>
      <ToggleBtn :value="getSidePreference(authStore.user.sidePreference)"
        @click="(value: any) => changeSidePreference(value())" />
      <p class="text-black"
      :class="{active: getSidePreferencePt(authStore.user.sidePreference) === 'Direito'}"
      style="margin: 0; font-weight: bold;">Direita</p>
    </div>
    <p class="text-bold">Lado selecionado: {{ getSidePreferencePt(authStore.user.sidePreference).toLocaleUpperCase() }}</p>
  </div>
</template>

<script setup lang="ts">
import { hasAccess } from 'src/utils/can-access';
import { useAuthStore } from 'src/stores/authStore';
import { api } from 'src/boot/axios';
import ToggleBtn from './ToggleBtn.vue';
import notify from 'src/utils/Notify';

const authStore = useAuthStore()
const emit = defineEmits(['sideSelect'])

const getSidePreference = (side: string | null) => {
  const value = side === 'right' ? true : false;
  return value
}

const getSidePreferencePt = (side: string | null) => {
  const value = side === 'right' ? 'Direito' : 'Esquerdo';
  return value
}

const changeSidePreference = async (value: boolean) => {
  console.log('value', value)
  const side = value ? 'right' : 'left'

  try {
    await api.put(`/user/${authStore.user.id}`, {
      sidePreference: side
    })
    notify({
      type: 'positive',
      msg: `Preferência de lado alterada para ${getSidePreferencePt(side)}`
    })
    await authStore.getUserInfo()
    emit('sideSelect')
  } catch (error) {
    notify({
      type: 'negative',
      msg: 'Erro ao alterar lado'
    })
  }
}
</script>

<style scoped>
.active {
  border-bottom: 1px solid green;
}
</style>
