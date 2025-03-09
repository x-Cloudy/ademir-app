<template>
  <div class="text-center">
    <h5 class="q-mb-none q-mt-none text-dark" style="font-weight: bold; font-family: Poppins;">
      Seja bem vindo
    </h5>
    <p class="text-grey-7 q-mt-none" style="font-size: 17px;">
      Comece sua jornada conosco. Juntos, vamos <br /> mais longe
    </p>
  </div>

  <q-form class="q-px-lg">
    <q-input color="black" filled v-model="registerForm.name" type="text" label="Nome" outlined
      :rules="[val => !!val || 'Nome é obrigatório']">
      <template v-slot:append>
        <q-icon name="person" />
      </template>
    </q-input>

    <q-input color="black" filled v-model="registerForm.email" type="email" label="Email" outlined
      :rules="[val => !!val || 'Email é obrigatório']">
      <template v-slot:append>
        <q-icon name="mail" />
      </template>
    </q-input>

    <q-input color="black" filled v-model="registerForm.whatsapp" type="tel" label="Telefone" outlined
      :rules="[val => !!val || 'Telefone é obrigatório']">
      <template v-slot:append>
        <q-icon name="phone" />
      </template>
    </q-input>

    <q-input color="black" filled v-model="registerForm.password" :type="isPwd ? 'password' : 'text'" label="Senha"
      outlined :rules="[val => !!val || 'Senha é obrigatória']">
      <template v-slot:append>
        <q-icon :name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer" @click="isPwd = !isPwd" />
      </template>
    </q-input>

    <q-input color="black" filled v-model="registerForm.wallet" :type="'text'" label="Carteira"
      outlined :rules="[val => !!val || 'Carteira é obrigatória']">
      <template v-slot:append>
        <q-icon name="wallet" />
      </template>
    </q-input>

    <q-input color="black" class="q-mb-md" type="text" filled v-model="registerForm.indication" label="Código de indicação"
      outlined>
      <template v-slot:append>
        <q-icon name="vpn_key" class="cursor-pointer" />
      </template>
    </q-input>

    <GradBtn :title="'Registrar'" :type="'button'" @btn-click="onRegister" />

    <div class="text-center q-gutter-y-sm q-mt-md">
      <p class="text-grey-7 q-mb-none">
        Já tem uma conta?
        <q-btn flat color="primary" label="Entrar" no-caps class="q-px-sm" padding="none" @click="emit('tab', 'login')" />
      </p>
    </div>
  </q-form>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useAuthStore } from 'src/stores/authStore';
import GradBtn from 'src/components/Buttons/GradBtn.vue';

const emit = defineEmits(['tab'])
const authStore = useAuthStore()

const hasId = computed(() => typeof route.params.id === 'string' && route.params.id.length > 0 ? route.params.id : '')

const route = useRoute()
const isPwd = ref(true)
const registerForm = ref<any>({
  name: '',
  email: '',
  whatsapp: '',
  password: '',
  indication: '',
  wallet: ''
})


const onRegister = async () => {
  await authStore.register(registerForm.value)
}

onMounted(() => {
  if (hasId.value) {
    registerForm.value.indication = hasId;
  }
})
</script>
