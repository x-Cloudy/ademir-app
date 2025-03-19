<template>
  <div :class="isMobile() ? 'column' : ''" class="q-pa-md flex no-wrap" style="width: 100%; height: auto">
    <q-card class="q-pa-md flex no-wrap"
    :style="isMobile() ? {width: '100%'} : {width: '70%'}"
    style="height: 100%; margin-right: 1rem; min-height: 87vh;">
      <div class="q-pa-sm flex no-wrap" :class="isMobile() ? 'column reverse' : ''" style="width: 100%; height: 100%; border-radius: 5px;">
        <ActivationBtn />

        <div :style="isMobile() ? {width: '100%', marginBottom: '2rem'} :
          {width: '48%', marginLeft: '1rem'}"
          style="padding: 0 1rem; border-radius: 5px;">
          <label style="font-size: 20px;">Meu Dados</label>
          <q-input filled v-model="user.name" class="bg-white q-mb-md" label="Nome" disable />
          <q-input filled v-model="user.email" class="bg-white q-mb-md" label="Email" disable />
          <q-input filled v-model="user.whatsapp" class="bg-white q-mb-md" label="Wpp" disable />

          <q-form @submit="onSubmit">
            <q-input outlined color="black" v-model="user.wallet" class="bg-white q-mb-md" label="Carteira Descentralizada" />
            <q-btn style="height: auto; font-weight: 600; font-size: 14px; font-family: Poppins;" class="bg-warning"
              type="submit">Adicionar Carteira</q-btn>
          </q-form>

          <div class="q-mt-lg flex items-center justify-center">
            <div class="flex no-wrap items-center justify-center">
              <p style="margin: 0; font-weight: bold;">Esquerda</p>
              <ToggleBtn @click="(value: any) => console.log(value())"/>
              <p style="margin: 0; font-weight: bold;">Direita</p>
            </div>
          </div>

        </div>
      </div>
    </q-card>

    <q-card class="q-pa-sm column"
    :style="isMobile() ? {width: '100%', marginTop: '1rem'} : {width: '30%'}"
    style="height: 100%; min-height: 87vh; justify-content: space-between;">
      <q-table :title="`Usuários Convidados (${rows.length})`" :rows="rows" :columns="columns" hide-pagination
        :pagination="{ rowsPerPage: 0 }" style="height: 50%; max-height: 550px;">
        <template v-slot:header="props">
          <q-tr :props="props">
            <q-th v-for="col in cols(props)" :key="col.name" :props="props" class="text-white"
              style="background-color: rgb(43, 42, 42); border-radius: 5px;">
              {{
                col.label
              }}
            </q-th>
          </q-tr>
        </template>


        <template v-slot:body-cell-status="props">
          <q-td class="flex justify-end items-center">
            <q-icon name="circle" :color="props.row.status ? 'teal-4' : 'red-5'" />
          </q-td>
        </template>
      </q-table>

      <div style="width: 100%; height: 50%; border-radius: 5px;">
        <label style="font-size: 20px;">Convidar</label>
        <div style="background-color: lightgrey; border-radius: 5px;">
          <p class="q-pa-sm">
            Convide apenas pessoas que possuem a mesma quantia que você.
          </p>
          <q-input filled outlined bg-color="white" v-model="invite" color="black" class="q-mb-md q-px-sm"
            label="Email" />

          <GradBtn :title="'Convidar'" />
        </div>
      </div>
    </q-card>
  </div>
</template>

<script setup lang="ts">
import ActivationBtn from 'src/components/Buttons/ActivationBtn.vue';
import GradBtn from 'src/components/Buttons/GradBtn.vue';
import { useAuthStore } from 'src/stores/authStore';
import { columns } from './ColumnSchema';
import { onBeforeMount, ref } from 'vue';
import isMobile from 'src/utils/isMobile';
import ToggleBtn from 'src/components/Buttons/ToggleBtn.vue';

type Col = { cols: { value: unknown; name: string; label: string }[] }
const cols = (props: Col) => props.cols

const onSubmit = () => {
  console.log('fdff')
}

const authStore = useAuthStore()
const user = ref<any>()
const rows = [
  {
    id: 1,
    nome: "João Silva",
    status: true
  },
  {
    id: 2,
    nome: "Maria Oliveira",
    status: false
  },
  {
    id: 3,
    nome: "Pedro Souza",
    status: true
  },
  {
    id: 4,
    nome: "Ana Costa",
    status: true
  },
  {
    id: 5,
    nome: "Carlos Mendes",
    status: false
  },
  {
    id: 6,
    nome: "Carlos Mendes",
    status: false
  },
  {
    id: 7,
    nome: "Carlos Mendes",
    status: false
  },
  {
    id: 8,
    nome: "Carlos Mendes",
    status: false
  },
  {
    id: 9,
    nome: "Carlos Mendes",
    status: false
  },
  {
    id: 10,
    nome: "Carlos Mendes",
    status: false
  },
  {
    id: 11,
    nome: "Carlos Mendes",
    status: false
  },
]
const invite = ref<string>('')

onBeforeMount(() => {
  console.log(authStore.user)
  if (authStore.isLogged) {
    user.value = authStore.user
  }
})
</script>

<style scoped>
p {
  font-family: Poppins;
}
</style>
