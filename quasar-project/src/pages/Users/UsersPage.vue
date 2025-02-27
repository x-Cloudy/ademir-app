<template>
  <div class="q-pa-md q-mt-xl flex justify-center">
    <q-card style="width: 100%; height: 65px; margin-bottom: 1rem; justify-content: space-between;" class="q-pa-sm flex items-center text-grey-8">
      <h6  
        style="margin: 0; font-weight: 600; text-transform: uppercase; margin-left: 1rem;" class="text-header-gradient"
      >Editar e remover usuarios
      </h6>

      <div class="flex">
        <q-input 
          dense 
          label="Pesquisar usuário" 
          outlined 
          v-model="search" 
          type="text"
          />
        <q-btn icon="search" dense size="md" class="search-btn"/>
      </div>
    </q-card>

    <q-table :rows="mock" :columns="tableColumn" style="width: 100%;">
      <template v-slot:header="props">
        <q-tr :props="props">
          <q-th v-for="col in cols(props)" :key="col.name" :props="props" class="text-white"
            style="background: #0A6AEB">
            {{
              col.label
            }}
          </q-th>
        </q-tr>
      </template>

      <template v-slot:body-cell-actions="props">
        <q-td :props="props" style="display: flex; justify-content: center;">
          <q-btn 
            @click="showEdit = true"
            icon="edit" 
            dense 
            class="bg-grey-8 text-white q-mr-sm action-btn" />
          <q-btn icon="delete" dense class="bg-red-10 text-white action-btn" 
            @click="notify({
              type: 'positive',
              msg: 'Usuário excluído'
            })" />
        </q-td>
      </template>
    </q-table>

    <q-dialog v-model="showEdit">
      <q-card style="width: 1000px; height: auto;" class="q-pa-lg q-gutter-sm">
        <q-input v-model="editForm.email" type="text" label="Nome" outlined />
        <q-input v-model="editForm.email" type="email" label="Email" outlined />
        <q-input v-model="editForm.email" type="tel" label="cel" outlined /> 

        <q-card-section style="display: flex; justify-content: end;" 
          class="q-gutter-md q-pr-none">
          <q-btn color="green">Salvar</q-btn>
          <q-btn color="red" @click="showEdit = false">Cancelar</q-btn>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import tableColumn from './components/tableColumns';
import notify from 'src/utils/Notify';

type Col = { cols: { value: unknown; name: string; label: string }[] }
const cols = (props: Col) => props.cols

const search = ref('')
const editForm = ref({
  name: '',
  email: '',
  tel: '',
})
const showEdit = ref(false)

const mock = [
  {
    id: 1,
    name: 'user 1',
    wpp: '(12) 93213-1322',
    wallet: 'AdsdxxSDXsdafesff98908324fsdf'
  },
  {
    id: 2,
    name: 'user 2',
    wpp: '(12) 93213-1322',
    wallet: 'AdsdxxSDXsdafesff98908324fsdf'
  },
  {
    id: 3,
    name: 'user 3',
    wpp: '(12) 93213-1322',
    wallet: 'AdsdxxSDXsdafesff98908324fsdf'
  }
] as any

</script>

<style scoped>
* {
  font-family: Poppins;
}

.action-btn {
  width: 25px;
  height: 25px;
  font-size: 10px;
}

.text-header-gradient {
  background: linear-gradient(169.4deg, #3984f4 -6.01%, #0cd3ff 36.87%, #2f7cf0 78.04%, #0e65e8 103.77%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.search-btn {
  border: 1px solid rgba(211, 211, 211, 0.808);
  border-left: none;
}
</style>