<template>
  <div v-if="hasAccess(['Cripto', 'admin'])"
    class="q-mt-lg q-pa-sm flex column items-center justify-center text-black" style="border-radius: 5px; background-color: lightgrey;">
    <label style="font-size: 18px; font-weight: bold;">Preferência de lado na matriz</label>
    <div class="flex no-wrap items-center justify-center">
      <p style="margin: 0; font-weight: bold;">Esquerda</p>
      <ToggleBtn :value="getSidePreference(authStore.user.sidePreference)"
        @click="(value: any) => changeSidePreference(value())" />
      <p style="margin: 0; font-weight: bold;">Direita</p>
    </div>
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

const changeSidePreference = async (value: boolean) => {
  console.log('value', value)
  const side = value ? 'right' : 'left'

  try {
    await api.put(`/user/${authStore.user.id}`, {
      sidePreference: side
    })
    notify({
      type: 'positive',
      msg: 'Preferência de lado alterada'
    })
    await authStore.getUserInfo()
    emit('sideSelect')
  } catch (error) {
    notify({
      type: 'negative',
      msg: 'Erro ao adicionar carteira'
    })
  }
}
</script>
