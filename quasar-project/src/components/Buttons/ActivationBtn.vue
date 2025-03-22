<template>
  <div class="column q-mr-lg" :style="isMobile() ? {width: '100%'} : {width: '40%'}"
    style="height: 100%;">

    <q-card class="flex items-end q-mb-md card-custom q-pt-md">
      <div class="q-ml-md flex items-center" style="justify-content: space-between; width: 100%;">
        <div class="column">
          <h6 style="margin: 0;">Árvore cripto:</h6>
          <div class="flex items-center">
            <p class="p-custom" style="margin: 0;">Você será posicionado na árvore</p>
          </div>
        </div>
      </div>

      <GradBtn @btn-click="dialog = true" class="q-mt-md" :title="'Entrar'" />
    </q-card>

    <q-card v-if="hasAccess(['Invistribe', 'admin'])" class="flex items-end q-mb-md card-custom">
      <div class="q-ml-md flex items-center" style="justify-content: space-between; width: 100%;">
        <q-img :src="coper_medal" height="100px" width="100px" class="q-my-md" />

        <div class="column" :style="isMobile() ? {width: '100%'} : {width: '50%'}">
          <h6 style="margin: 0;">Requisitos:</h6>
          <div class="flex items-center">
            <p class="p-custom" style="margin: 0;">Possuir 30$</p>
          </div>
          <div class="flex items-center">
            <p class="p-custom" style="margin: 0;">Convidar 2 pessoas</p>
            <q-icon class="q-ml-sm" name="radio_button_unchecked" size="sm" color="grey-7" />
          </div>
        </div>
      </div>

      <GradBtn style="margin-top: 0.5rem;" :title="'Ativar'" />
    </q-card>
    <q-card v-if="hasAccess(['Invistribe', 'admin'])" class="flex items-end q-mb-md card-custom">
      <div class="q-ml-md flex items-center" style="justify-content: space-between; width: 100%;">
        <q-img :src="silver_medal" height="100px" width="100px" class="q-my-md" />

        <div class="column" :style="isMobile() ? {width: '100%'} : {width: '50%'}">
          <h6 style="margin: 0;">Requisitos:</h6>
          <div class="flex items-center">
            <p class="p-custom" style="margin: 0;">Possuir 150$</p>
          </div>
          <div class="flex items-center">
            <p class="p-custom" style="margin: 0;">Ter 2 pessoas na matriz Cobre</p>
            <q-icon class="q-ml-sm" name="close" size="sm" color="red-4" />
          </div>
          <div class="flex items-center">
            <p class="p-custom" style="margin: 0;">Convidar 2 pessoas</p>
            <q-icon class="q-ml-sm" name="radio_button_unchecked" size="sm" color="grey-7" />
          </div>
        </div>
      </div>

      <GradBtn style="margin-top: 0.5rem;"  :title="'Ativar'" :disable="true" />
    </q-card>
    <q-card v-if="hasAccess(['Invistribe', 'admin'])" class="flex items-end q-mb-md card-custom">
      <div class="q-ml-md flex items-center" style="justify-content: space-between; width: 100%;">
        <q-img :src="gold_medal" height="100px" width="100px" class="q-my-md" />

        <div class="column" :style="isMobile() ? {width: '100%'} : {width: '50%'}">
          <h6 style="margin: 0;">Requisitos:</h6>
          <div class="flex items-center">
            <p class="p-custom" style="margin: 0;">Possuir 1500$</p>
          </div>
          <div class="flex items-center">
            <p class="p-custom" style="margin: 0;">Ter 2 pessoas na matriz Prata</p>
            <q-icon class="q-ml-sm" name="close" size="sm" color="red-4" />
          </div>
          <div class="flex items-center">
            <p class="p-custom" style="margin: 0;">Convidar 2 pessoas</p>
            <q-icon class="q-ml-sm" name="radio_button_unchecked" size="sm" color="grey-7" />
          </div>
        </div>
      </div>

      <GradBtn style="margin-top: 0.5rem;" :title="'Ativar'" :disable="true" />
    </q-card>

    <q-dialog full v-model="dialog">
      <q-card class="q-pa-md flex column jusitfy-center text-center text-white no-wrap" style="width: 100%; height: 40%; background-color: #252525;">
        <h4 style="font-size: 22px; margin: 0; font-weight: bold;">
          FALTA POUCO PARA ENTRAR!
        </h4>
        <p style="margin: 0; font-size: 19px;">
          Para entrar na árvore, primeiro você deve selecionar um lado de Preferência
        </p>
        <SidePreferenceBtn @side-select="() => console.log('l')"/>

         <div v-if="authStore.user.sidePreference" class="flex items-end" style="width: 100%; height: 100%;">
           <GradBtn @btn-click="treeJoin" style="border: 1px solid gray;" :title="'Entrar'" />
         </div>
      </q-card>
    </q-dialog>
  </div>

</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from 'src/stores/authStore';
import GradBtn from 'src/components/Buttons/GradBtn.vue';
import coper_medal from 'assets/coperMedalSemFundo.png'
import silver_medal from 'assets/silverMedalSemFundo.png'
import gold_medal from 'assets/goldMedalSemFundo.png'
import isMobile from 'src/utils/isMobile';
import { api } from 'src/boot/axios';
import SidePreferenceBtn from './SidePreferenceBtn.vue';
import { hasAccess } from 'src/utils/can-access';

const authStore = useAuthStore()
const dialog = ref(false)

const treeJoin = async () => {
  const response = await api.post('/binary-tree/add', {
    code: authStore.user.codeInvite,
    indicate: authStore.user.id
  });
  if (response.status > 200 && response.status < 300) {
    dialog.value = false;
  }
  console.log('xx', response)
}
</script>

<style scoped>
.p-custom {
  font-weight: 600;
  font-family: Poppins;
  color: rgb(46, 46, 46);
  padding-right: 1rem;
}

.card-custom {
  background-color: lightgrey;
  width: 100%;
  min-width: 125px;
  border-radius: 5px;
  min-height: 100px;
  height: auto;
}
</style>
