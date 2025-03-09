<template>
  <EntryCard>
    <div class="col-6 q-pa-md bg-grey-3">
      <div v-if="tab === 'login'" class="column q-gutter-y-md">
        <div class="text-center q-pt-lg">
          <h5 class="q-mb-none text-dark" style="font-weight: bold; font-family: Poppins;">
            Bem vindo de volta
          </h5>
          <p class="text-grey-8 q-mt-sm" style="font-size: 17px;">
            Continue sua jornada conosco. Juntos, vamos <br /> mais longe
          </p>
        </div>

        <q-form class="q-gutter-y-md q-px-lg">
          <q-input color="black" filled v-model="loginForm.email" type="email" label="Email" outlined
            :rules="[val => !!val || 'Email é obrigatório']">
            <template v-slot:append>
              <q-icon name="mail" />
            </template>
          </q-input>

          <q-input color="black" filled v-model="loginForm.password" :type="isPwd ? 'password' : 'text'" label="Senha"
            outlined :rules="[val => !!val || 'Senha é obrigatória']">
            <template v-slot:append>
              <q-icon :name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer" @click="isPwd = !isPwd" />
            </template>
          </q-input>

          <GradBtn :title="'Entrar'" :type="'button'" @btn-click="onSubmit" :loading="authStore.loading"/>

          <div class="text-center q-gutter-y-sm">
            <q-btn color="primary" flat label="Esqueci a senha" class="full-width" no-caps
              @click="router.push('/recuperar-senha')" />

            <p class="text-grey-7 q-mb-none" style="font-weight: 500;">
              Não tem uma conta?
              <q-btn color="primary" flat label="Inscreva-se" no-caps class="q-px-sm" padding="none"
                @click="tab = 'register'" />
            </p>
          </div>
        </q-form>
      </div>

      <div v-if="tab === 'register'" class="column q-gutter-y-sm">
        <RegisterComponent @tab="(value) => tab = value" />
      </div>
    </div>
  </EntryCard>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from 'src/stores/authStore';
import EntryCard from 'src/components/EntryCard.vue';
import GradBtn from 'src/components/Buttons/GradBtn.vue';
import RegisterComponent from 'src/components/Register/RegisterComponent.vue';

const authStore = useAuthStore()
const router = useRouter()
const tab = ref('login')
const isPwd = ref(true)
const loginForm = ref<any>({
  email: '',
  password: ''
})

const onSubmit = async () => {
  const status = await authStore.login(loginForm.value);
  if (status === 200) {
    setTimeout(() => {
      void router.push("/home")
    }, 1000)
  }
}
</script>

<style lang="scss" scoped>
.login-card {
  width: 900px;
  max-width: 90vw;
  border-radius: 8px;
  height: 650px;
  overflow: hidden;
}

.left-card {
  background-color: rgb(43, 42, 42);
  border-radius: 5px 0 0 5px !important;
}
</style>
