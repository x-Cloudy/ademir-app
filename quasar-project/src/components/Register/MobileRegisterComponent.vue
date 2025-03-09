<template>
  <q-form>
    <q-input v-model="registerForm.name" type="text" label="Nome" outlined
      :rules="[val => !!val || 'Nome é obrigatório']">
      <template v-slot:append>
        <q-icon name="person" color="grey-6" size="xs" class="q-mt-sm" />
      </template>
    </q-input>
    <q-input v-model="registerForm.email" type="email" label="Email" outlined
      :rules="[val => !!val || 'Email é obrigatório']">
      <template v-slot:append>
        <q-icon name="mail" color="grey-6" size="xs" class="q-mt-sm" />
      </template>
    </q-input>
    <q-input v-model="registerForm.whatsapp" type="tel" label="Telefone" outlined
      :rules="[val => !!val || 'Telefone é obrigatório']">
      <template v-slot:append>
        <q-icon name="phone" color="grey-6" size="xs" class="q-mt-sm" />
      </template>
    </q-input>
    <q-input v-model="registerForm.password" type="password" label="Senha" outlined
      :rules="[val => !!val || 'Senha é obrigatório']">
      <template v-slot:append>
        <q-icon name="password" color="grey-6" size="xs" class="q-mt-sm" />
      </template>
    </q-input>
    <q-input class="q-mb-md" v-model="registerForm.wallet" type="tel" label="Carteira" outlined>
      <template v-slot:append>
        <q-icon name="wallet" color="grey-6" size="xs" class="q-mt-sm" />
      </template>
    </q-input>
    <q-input v-model="registerForm.indication" type="tel" label="Código de convite" outlined>
      <template v-slot:append>
        <q-icon name="phone" color="grey-6" size="xs" class="q-mt-sm" />
      </template>
    </q-input>


    <div class="q-mt-lg">
      <GradBtn :title="'Registrar'" :type="'button'" @btn-click="onRegister" />
    </div>

    <div class="text-center q-mt-md">
      <div class="text-grey-7 q-mt-md" style="margin-bottom: 150px;">
        Já tem uma conta?
        <q-btn flat color="primary" label="Login" class="text-weight-medium q-px-xs" size="md" no-caps
          @click="() => {
            if (isRegisterPage || hasId) {
              router.push('/');
              return
            }
            emit('tab', 'login')
            }"
            padding="none" />
      </div>
    </div>
  </q-form>
</template>

<script setup lang="ts">
import GradBtn from '../Buttons/GradBtn.vue';
import { ref, computed, onMounted } from 'vue';
import { useAuthStore } from 'src/stores/authStore';
import { useRoute, useRouter } from 'vue-router';

const emit = defineEmits(['tab'])

const hasId = computed(() => typeof route.params.id === 'string' && route.params.id.length > 0 ? route.params.id : null)
const isRegisterPage = computed(() => route.path === '/register')

const authStore = useAuthStore()
const router = useRouter()
const route = useRoute()
const registerForm = ref<any>({
  name: '',
  email: '',
  whatsapp: '',
  password: '',
  indication: '',
  wallet: ''
})
const onRegister = async () => {
  const status = await authStore.register(registerForm.value)
  if (status) {
    setTimeout(() => {
      document.location.reload()
    }, 1000)
  }
}

onMounted(() => {
  if (hasId.value) {
    registerForm.value.indication = hasId.value
  }
})
</script>
