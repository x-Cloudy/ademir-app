<template>
  <div class="column q-mr-lg" style="width: 40%; height: 100%;">
    <q-card class="flex items-end q-mb-md"
      style="background-color: lightgrey; width: 100%; border-radius: 5px; min-height: 100px; height: auto;">
      <div class="q-ml-md flex items-center" style="justify-content: space-between; width: 100%;">
        <q-img :src="coper_medal" height="100px" width="100px" class="q-my-md" />

        <div class="column" style="width: 50%;">
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

      <GradBtn :title="'Ativar'" />
    </q-card>

    <q-card class="flex items-end q-mb-md"
      style="background-color: lightgrey; width: 100%; border-radius: 5px; min-height: 100px; height: auto;">
      <div class="q-ml-md flex items-center" style="justify-content: space-between; width: 100%;">
        <q-img :src="silver_medal" height="100px" width="100px" class="q-my-md" />

        <div class="column" style="width: 50%;">
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

      <GradBtn :title="'Ativar'" :disable="true" />
    </q-card>
    <q-card class="flex items-end q-mb-md"
      style="background-color: lightgrey; width: 100%; border-radius: 5px; min-height: 100px; height: auto;">
      <div class="q-ml-md flex items-center" style="justify-content: space-between; width: 100%;">
        <q-img :src="gold_medal" height="100px" width="100px" class="q-my-md" />

        <div class="column" style="width: 50%;">
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

      <GradBtn :title="'Ativar'" :disable="true" />
    </q-card>
  </div>

</template>

<script setup lang="ts">
import GradBtn from 'src/components/Buttons/GradBtn.vue';
import coper_medal from 'assets/coperMedalSemFundo.png'
import silver_medal from 'assets/silverMedalSemFundo.png'
import gold_medal from 'assets/goldMedalSemFundo.png'
</script>

<style scoped>
.p-custom {
  font-weight: 600;
  font-family: Poppins;
  color: rgb(46, 46, 46);
}
</style>
