<template>
  <q-page style="display: flex; align-items: center;" class="column">
    <div class="q-pa-md flex no-wrap" style="width: 100%; height: 100vh;">
      <q-card class="q-pa-md column" style="width: 70%; height: 100%; margin-right: 1rem;">
        <q-card class="flex items-end q-mb-md"
          style="background-color: lightgrey; width: 100%; height: 180px; border-radius: 5px; max-width: 600px;">
          <div class="q-ml-md flex items-center q-px-md" style="justify-content: space-between; width: 100%;">
            <q-img :src="coper_medal" height="100px" width="100px" />

            <div class="column" style="min-width: 250px;">
              <h6 style="margin: 0;">Requisitos:</h6>
              <div class="flex items-center">
                <p style="margin: 0;">Possuir 30$</p>
              </div>
              <div class="flex items-center">
                <p style="margin: 0;">Convidar 2 pessoas</p>
                <q-icon class="q-ml-sm" name="radio_button_unchecked" size="sm" color="grey-7" />
              </div>
            </div>
          </div>

          <GradBtn :title="'Ativar'" />
        </q-card>
        <q-card class="flex items-end q-mb-md"
          style="background-color: lightgrey; width: 100%; height: 180px; border-radius: 5px; max-width: 600px;">
          <div class="q-ml-md flex items-center q-px-md" style="justify-content: space-between; width: 100%;">
            <q-img :src="silver_medal" height="100px" width="100px" />

            <div class="column" style="min-width: 250px;">
              <h6 style="margin: 0;">Requisitos:</h6>
              <div class="flex items-center">
                <p style="margin: 0;">Possuir 150$</p>
              </div>
              <div class="flex items-center">
                <p style="margin: 0;">Ter 2 pessoas na matriz Cobre</p>
                <q-icon class="q-ml-sm" name="close" size="sm" color="red-4" />
              </div>
              <div class="flex items-center">
                <p style="margin: 0;">Convidar 2 pessoas</p>
                <q-icon class="q-ml-sm" name="radio_button_unchecked" size="sm" color="grey-7" />
              </div>
            </div>
          </div>

          <GradBtn :title="'Ativar'" />
        </q-card>
        <q-card class="flex items-end q-mb-md"
          style="background-color: lightgrey; width: 100%; height: 180px; border-radius: 5px; max-width: 600px;">
          <div class="q-ml-md flex items-center q-px-md" style="justify-content: space-between; width: 100%;">
            <q-img :src="gold_medal" height="100px" width="100px" />

            <div class="column" style="min-width: 250px;">
              <h6 style="margin: 0;">Requisitos:</h6>
              <div class="flex items-center">
                <p style="margin: 0;">Possuir 1500$</p>
              </div>
              <div class="flex items-center">
                <p style="margin: 0;">Ter 2 pessoas na matriz Prata</p>
                <q-icon class="q-ml-sm" name="close" size="sm" color="red-4" />
              </div>
              <div class="flex items-center">
                <p style="margin: 0;">Convidar 2 pessoas</p>
                <q-icon class="q-ml-sm" name="radio_button_unchecked" size="sm" color="grey-7" />
              </div>
            </div>
          </div>

          <GradBtn :title="'Ativar'" />
        </q-card>

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
  </q-page>
</template>

<script setup lang="ts">
import GradBtn from 'src/components/MobileButton/GradBtn.vue';
import coper_medal from 'assets/coperMedalSemFundo.png'
import silver_medal from 'assets/silverMedalSemFundo.png'
import gold_medal from 'assets/goldMedalSemFundo.png'
import { columns } from './ColumnSchema';
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