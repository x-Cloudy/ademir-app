<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <div class="q-px-xl bg-white row" style="
          display: flex;
          width: 100%; 
          height: 85px;
          align-items: center;
        ">
        <div class="flex items-center col-8 no-wrap">
          <q-img :src="logo" style="width: 130px; margin-right: 4rem; min-width: 100px;" />
          <div style="display: flex; width: auto; gap: 3rem;">
            <p @click="router.push('/usuarios')">Usuários</p>
            <p @click="router.push('/grafico')">Gráfico
            </p>
            <!-- <p @click="router.push('/usuarios')">Usuários</p> -->
          </div>
        </div>

        <div class="flex items-center justify-end col-4" style="height: 85px;"> 
          <GradBtn :title="'Meu perfil'" icon="person" style="width: 150px; height: 45px;"/>
        </div>

      </div>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer>

    </q-footer>
  </q-layout>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import GradBtn from 'src/components/MobileButton/GradBtn.vue';
import logo from 'assets/mutualaid-logo.655e052.svg'
const router = useRouter()

</script>

<style scoped>
p {
  margin: 0;
  cursor: pointer;
  font-size: 16px;
  color: rgb(99, 99, 99);
  font-weight: 500;
}

p:hover {
  color: lightgray;
}
</style>
