<template>
  <div v-if="hasAccess(['admin'])" class="q-px-md flex justify-center">
    <q-card
      style="width: 100%; min-height: 70px; margin-bottom: 1rem; justify-content: space-between; background-color: rgb(43, 42, 42);"
      class="q-pa-sm flex items-center text-white q-mt-md">
      <h6 style="margin: 0; font-weight: 600; text-transform: uppercase; margin-left: 1rem;" class="text-warning">
        Editar e remover usuarios
      </h6>

      <div class="flex q-ml-md">
        <q-input color="warning" label-color="black" class="q-pl-xs"
          style="background-color: white; border-radius: 3px;" dense label="Pesquisar usuário" v-model="state.search"
          type="text" />
        <q-btn @click="search" icon="search" flat dense size="md" class="q-ml-sm bg-warning text-black" />
        <q-btn @click="handleReset" icon="restart_alt" flat dense size="md" class="q-ml-sm bg-warning text-black" />
      </div>
    </q-card>

    <q-table :rows="users" :columns="tableColumn"
      :pagination="{ rowsPerPage: 50 }" style="width: 100%;">
      <template v-slot:header="props">
        <q-tr :props="props">
          <q-th v-for="col in cols(props)" :key="col.name" :props="props" class="text-white"
            style="background-color: rgb(43, 42, 42);">
            {{
              col.label
            }}
          </q-th>
        </q-tr>
      </template>

      <template v-slot:body-cell-actions="props">
        <q-td :props="props">
          <q-btn @click="() => {
            editForm.user = props.row
            editForm.id = props.row.id
            showEdit = true;
          }" icon="edit" dense class="bg-grey-8 text-white q-mr-sm action-btn" />

          <q-btn icon="delete" dense class="bg-red-10 text-white action-btn" @click="() => {
            deleteId = props.row.id;
            deleteDialog = true;
          }" />
        </q-td>
      </template>

      <template v-slot:body-cell-roles="props">
        <q-td :props="props">
          <q-select color="black" dropdown-icon="none" dense filled outlined v-model="props.row.roles" multiple />
        </q-td>
      </template>

    </q-table>
    <q-dialog v-model="deleteDialog">
      <q-card style="width: 1000px; height: auto;" class="q-pa-lg ">
        <q-card-section style="display: flex; justify-content: center; align-items: center;"
          class=" q-pr-none q-gutter-x-md">
          <p style="margin: 0;" class="flex items-center">Deseja deletar usuário?</p>
          <q-btn color="green" @click="handleDelete(deleteId)">Deletar</q-btn>
          <q-btn color="red" @click="deleteDialog = false">Cancelar</q-btn>
        </q-card-section>
      </q-card>
    </q-dialog>

    <q-dialog v-model="showEdit">
      <q-card style="width: 1000px; height: auto;" class="q-pa-lg q-gutter-sm">
        <q-input v-model="editForm.user.name" type="text" label="Nome" outlined />
        <q-input v-model="editForm.user.email" type="email" label="Email" outlined />
        <q-input v-model="editForm.user.whatsapp" type="tel" label="Whatsapp" outlined />
        <q-input v-model="editForm.user.wallet" label="Carteira" outlined />
        <q-input v-model="editForm.user.link" label="Link" outlined />
        <q-select color="black" multiple v-model="editForm.user.roles" :options="roles" label="Plataforma" outlined />

        <q-card-section style="display: flex; justify-content: end;" class="q-gutter-md q-pr-none">
          <q-btn color="green" @click="handleEdit">Salvar</q-btn>
          <q-btn color="red" @click="showEdit = false">Cancelar</q-btn>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>

  <RestrictPage v-else />
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue';
import { api } from 'src/boot/axios';
import { useUsersStore } from 'src/stores/userStore';
import tableColumn from './components/tableColumns';
import notify from 'src/utils/Notify';
import { roles } from 'src/types';
import { hasAccess } from 'src/utils/can-access';
import RestrictPage from 'src/components/RestrictPage/RestrictPage.vue';

type Col = { cols: { value: unknown; name: string; label: string }[] }
const cols = (props: Col) => props.cols
const state = reactive({
  search: '',
})
const usersStore = useUsersStore()
const deleteId = ref<number>(0)
const deleteDialog = ref(false)
const editForm = ref<any>({
  user: {
    name: '',
    nick: '',
    email: '',
    whatsapp: '',
    wallet: '',
    roles: []
  },
  id: ''
})
const showEdit = ref(false)

const users = computed(() => usersStore.users || [])

const stateFilter = reactive({
  filter: { ...usersStore.filter },
  pagination: { ...usersStore.pagination }
})

const request = async (payload: any) => {
  await usersStore.fetch({ ...payload, filter: state as any })
}

const search = async () => {
  await usersStore.search(state)
}

const handleEdit = async () => {
  try {
    await api.put(`/user/${editForm.value.id}`, editForm.value.user);
    notify({
      type: 'positive',
      msg: 'Usuário editado com sucesso'
    })
    showEdit.value = false
  } catch (error) {
    console.log(error)
    notify({
      type: 'negative',
      msg: 'Erro ao editar usuário'
    })
  }
}

const handleDelete = async (id: number) => {
  try {
    await api.delete(`/user/${id}`)
    notify({
      type: 'positive',
      msg: 'Usuário excluído'
    })
    await usersStore.fetch(stateFilter)
    deleteDialog.value = false;
  } catch (error) {
    notify({
      type: 'negative',
      msg: 'Erro ao excluir usuário'
    })
  }
}

const handleReset = async () => {
  state.search = ''
    await request(usersStore.resetFilter())
}

void request(stateFilter)
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
</style>
