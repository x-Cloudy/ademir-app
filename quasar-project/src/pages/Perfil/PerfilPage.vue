<template>
  <div class="q-pa-md flex no-wrap" style="width: 100%; height: 91vh">
    <q-card class="q-pa-md flex no-wrap" style="width: 70%; height: 100%; margin-right: 1rem;">
      <div class="q-pa-sm flex" style="width: 100%; height: 100%; border-radius: 5px;">
        <ActivationBtn />

        <div style="width: 48%; background-color: lightgrey; padding: 1rem; border-radius: 5px; margin-left: 1rem;">
          <q-input filled outlined v-model="teste" class="bg-white q-mb-md" label="Nome" disable />
          <q-input filled outlined v-model="teste" class="bg-white q-mb-md" label="Email" disable />
          <q-input filled outlined v-model="teste" class="bg-white q-mb-md" label="Wpp" disable />

          <q-form @submit="onSubmit">
            <q-input filled outlined v-model="teste" class="bg-white q-mb-md" label="Carteira" />
            <q-btn class="bg-warning" type="submit">Adicionar Carteira</q-btn>
          </q-form>
        </div>
      </div>
    </q-card>

    <q-card class="q-pa-sm" style="width: 30%; height: 100%;">
      <q-table :title="`Usuários Convidados (${rows.length})`" :rows="rows" :columns="columns" hide-pagination>
        <template v-slot:body-cell-status="props">
          <q-td class="flex justify-end items-center">
            <q-icon name="circle" :color="props.row.status ? 'teal-4' : 'red-5'" />
          </q-td>
        </template>
      </q-table>
    </q-card>
  </div>
</template>

<script setup lang="ts">
import ActivationBtn from 'src/components/Buttons/ActivationBtn.vue';
import { columns } from './ColumnSchema';
import { ref } from 'vue';

const onSubmit = () => {
  console.log('fdff')
}

const teste = ref<any>('teste')
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
  }
]
</script>