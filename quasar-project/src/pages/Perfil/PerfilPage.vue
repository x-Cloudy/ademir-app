<template v-if="user.id">
  <div :class="isMobile() ? 'column' : ''" class="q-pa-md flex no-wrap" style="width: 100%; height: auto">
    <q-card class="q-pa-md flex no-wrap" :style="isMobile() ? { width: '100%' } : { width: '70%' }"
      style="height: 100%; margin-right: 1rem; min-height: 87vh;">
      <div class="q-pa-sm flex no-wrap" :class="isMobile() ? 'column reverse' : ''"
        style="width: 100%; height: 100%; border-radius: 5px;">
        <ActivationBtn />

        <div :style="isMobile() ? { width: '100%', marginBottom: '2rem' } :
          { width: '48%', marginLeft: '1rem' }" style="padding: 0 1rem; border-radius: 5px;">
          <label style="font-size: 20px;">Contato do Pratrocinador</label>
          <q-input filled v-model="user_invited_info.nick" class="bg-white q-mb-md" label="Login" disable />
          <q-input filled v-model="user_invited_info.whatsapp" class="bg-white q-mb-md" label="Whatsapp" disable />
          <q-input filled v-model="user_invited_info.link" class="bg-white q-mb-md" label="Link" disable />

          <label style="font-size: 20px;">Meu Dados</label>
          <q-input filled v-model="user.nick" class="bg-white q-mb-md" label="Login" :disable="true" />
          <q-input filled v-model="user.name" class="bg-white q-mb-md" label="Nome" :disable="editingUser" />
          <q-input filled v-model="user.email" class="bg-white q-mb-md" label="Email" :disable="editingUser" />
          <q-input filled v-model="user.whatsapp" class="bg-white q-mb-md" label="Wpp" :disable="editingUser" />

          <div class="q-gutter-sm">
            <q-btn v-if="editingUser" @click="editingUser = false" class="bg-warning"
              style="height: auto; font-weight: 600; font-size: 14px; font-family: Poppins;">
              Editar perfil
            </q-btn>
            <q-btn v-if="!editingUser" @click="changeUserInfos" class="bg-positive text-white"
              style="height: auto; font-weight: 600; font-size: 14px; font-family: Poppins;">
              Salvar
            </q-btn>
            <q-btn v-if="!editingUser" @click="editingUser = true" class="bg-negative text-white"
              style="height: auto; font-weight: 600; font-size: 14px; font-family: Poppins;">
              Cancelar
            </q-btn>
          </div>

          <q-form @submit="addLink" class="q-mt-lg">
            <q-input :readonly="!!authStore.user.link" outlined color="black" v-model="user.link"
              class="bg-white q-mb-md" :label="`Link ${authStore.user.roles?.length ? authStore.user.roles[0] : 'Plataforma'}`" />
            <q-btn v-if="!authStore.user.link"
              style="height: auto; font-weight: 600; font-size: 14px; font-family: Poppins;" class="bg-warning"
              type="submit">Adicionar Link</q-btn>
          </q-form>
          <q-form @submit="addWallet" class="q-mt-lg">
            <q-input :readonly="!!authStore.user.wallet" outlined color="black" v-model="user.wallet"
              class="bg-white q-mb-md" label="Carteira Descentralizada" />
            <q-btn v-if="!authStore.user.wallet"
              style="height: auto; font-weight: 600; font-size: 14px; font-family: Poppins;" class="bg-warning"
              type="submit">Adicionar Carteira</q-btn>
          </q-form>
        </div>
      </div>
    </q-card>

    <q-card class="q-pa-sm column" :style="isMobile() ? { width: '100%', marginTop: '1rem' } : { width: '30%' }"
      style="height: 100%; min-height: 87vh; justify-content: space-between;">
      <q-table :title="`Usuários Convidados (${user_invites.length})`" :rows="user_invites" :columns="columns"
        hide-pagination :pagination="{ rowsPerPage: 0 }" style="height: 50%; max-height: 550px">

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

        <template v-slot:body-cell-status="props">
          <q-td class="flex justify-end items-center">
            <q-icon name="circle" :color="props.row.status ? 'teal-4' : 'red-5'" />
          </q-td>
        </template>
      </q-table>

      <div style="width: 100%; height: 50%; border-radius: 5px;">
        <label style="font-size: 20px;">Convidar</label>
        <div style="background-color: lightgrey; border-radius: 5px; padding-bottom: 0.1rem;">
          <p class="q-pa-sm">
            Convide uma pessoa para a plataforma.
          </p>
          <q-input v-if="hasAccess(['INTELECTUS', 'admin'])" filled outlined bg-color="white" v-model="inviteIntelectus"
            color="black" class="q-mb-md q-px-sm" label="Link Intelectus" />
          <q-input v-if="hasAccess(['Invistribe', 'admin'])" filled outlined bg-color="white" v-model="inviteInvistribe"
            color="black" class="q-mb-md q-px-sm" label="Link Invisitribe" />
        </div>
      </div>
    </q-card>
  </div>
</template>

<script setup lang="ts">
import ActivationBtn from 'src/components/Buttons/ActivationBtn.vue';
import { useAuthStore } from 'src/stores/authStore';
import { columns } from './ColumnSchema';
import { onMounted, ref } from 'vue';
import isMobile from 'src/utils/isMobile';
import { hasAccess } from 'src/utils/can-access';
import SidePreferenceBtn from 'src/components/Buttons/SidePreferenceBtn.vue';
import notify from 'src/utils/Notify';
import { api } from 'src/boot/axios';

type Col = { cols: { value: unknown; name: string; label: string }[] }
const cols = (props: Col) => props.cols

const authStore = useAuthStore()
const userInviteCode = ref('')
const user = ref<any>(authStore.user || {});
const user_invites = ref<any[]>([]);
const user_invited_info = ref({
  nick: '',
  whatsapp: '',
  link: ''
})
const editingUser = ref(true)

const inviteInvistribe = ref<string>(`https://vipclubbusiness.com/register?plat=INTELECTUS&code=${authStore.user.nick}`)
const inviteIntelectus = ref<string>(`https://vipclubbusiness.com/register?plat=Invistribe&code=${authStore.user.nick}`)


const addLink = async () => {
  try {
    await api.put(`/user/${user.value.id}`, {
      link: user.value.link
    })
    await authStore.getUserInfo()
    notify({
      type: 'positive',
      msg: 'Carteira adicionada'
    })
  } catch (error) {
    notify({
      type: 'negative',
      msg: 'Erro ao adicionar carteira'
    })
  }
}

const addWallet = async () => {
  try {
    await api.put(`/user/${user.value.id}`, {
      wallet: user.value.wallet
    })
    await authStore.getUserInfo()
    notify({
      type: 'positive',
      msg: 'Carteira adicionada'
    })
  } catch (error) {
    notify({
      type: 'negative',
      msg: 'Erro ao adicionar carteira'
    })
  }
}

const changeUserInfos = async () => {
  try {
    await api.put(`/user/${user.value.id}`,
      user.value
    )
    editingUser.value = true
    notify({
      type: 'positive',
      msg: 'Dados alterados'
    })
  } catch (error) {
    notify({
      type: 'negative',
      msg: 'Erro ao alterar dados'
    })
  }
}

onMounted(async () => {
  try {
    await authStore.getUserInfo()
    const response = await api.get(`/indications/${userInviteCode.value}`)
    if (response.status === 200) {
      user_invites.value = response.data
    }
  } catch (error) {
    console.log(error)
  }

  try {
    const indicated = await api.get(`/indication/${user.value.id}`)
    user_invited_info.value = indicated.data
  } catch (error) {
    console.log(error)
  }
})
</script>

<style scoped>
p {
  font-family: Poppins;
}
</style>
