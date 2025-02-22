<template>
  <q-page v-if="isMobile()" class="flex justify-center items-center" style="
      background: linear-gradient(186.9deg, rgba(255, 252, 252, 0.4) 48.73%, rgba(141, 167, 206, 0.4) 78.74%);
      touch-action: none;
      overflow-y: hidden;
    ">
    <div class="login-container">
      <div class="text-center q-mb-lg">
        <h4 class="text-grey-8" style="font-family: Poppins; font-weight: 600;">
          Bem vindo de volta
        </h4>

        <!-- Login/Register tabs -->
        <div class="row justify-center">
          <q-tabs v-model="tab" class="text-grey q-mb-sm" active-color="grey-7" indicator-color="primary" dense>
            <q-tab name="login" label="Entrar" style="
                width: 110px; 
                font-family: Poppins;
                " />
            <q-tab name="register" label="Cadastrar" style="font-family: Poppins;" />
          </q-tabs>
        </div>
      </div>

      <q-form v-if="tab === 'login'" @submit="onSubmit">
        <q-input v-model="email" type="email" label="Email" outlined :rules="[val => !!val || 'Email é obrigatório']">
          <template v-slot:append>
            <q-icon name="mail" />
          </template>
        </q-input>

        <q-input v-model="password" :type="isPwd ? 'password' : 'text'" 
        label="Senha" outlined
          :rules="[val => !!val || 'Senha é obrigatória']">
          <template v-slot:append>
            <q-icon :name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer" @click="isPwd = !isPwd" />
          </template>
        </q-input>

        <div class="q-mt-lg">
          <GradBtn :title="'login'" :type="'submit'" />
        </div>

        <div class="text-center q-gutter-y-sm">
          <q-btn flat color="primary" label="Esqueci a senha" class="text-weight-medium" size="md" no-caps />

          <div class="text-grey-7 q-mt-md" style="margin-bottom: 150px;">
            Não tem uma conta?
            <q-btn flat color="primary" label="Inscreva-se" class="text-weight-medium q-px-xs" size="md" no-caps
            @click="tab = 'register'" padding="none" />
          </div>
        </div>
      </q-form>

      <q-form v-if="tab === 'register'" @submit="onSubmit">

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
        <q-input v-model="registerForm.tel" type="tel" label="Telefone" outlined 
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

        <div class="q-mt-lg">
          <GradBtn :title="'Registrar'" :type="'submit'" />
        </div>

        <div class="text-center q-gutter-y-sm">
          <div class="text-grey-7 q-mt-md" style="margin-bottom: 150px;">
            Já tem uma conta?
            <q-btn flat color="primary" label="Login" class="text-weight-medium q-px-xs" size="md" no-caps
            @click="tab = 'login'" padding="none" />
          </div>
        </div>
      </q-form>
    </div>
  </q-page>

  <q-page v-else class="flex flex-center" style="overflow-y: hidden;">
    <q-card class="login-card row">
      <!-- Left side with illustration -->
      <div class="col-6" style="
        background: linear-gradient(205.88deg, rgba(141, 167, 206, 0.34) 0.3%, rgba(250, 252, 255, 0.34) 94.16%);
        border-radius: 0;
      ">
        <div class="column items-center justify-center full-height q-pa-md">
          <h5 class="text-weight-semibold text-grey-8" style="text-align: center; font-family: Poppins;">
            Tenha a sua <br />
            <span style="font-size: 25px; font-weight: bold;">
              Liberdade financeira
            </span>
          </h5>
          <img :src="image" alt="Financial Freedom Illustration"
            style="max-width: 90%; position: relative; z-index: 100;">
          <div style="
            position: absolute;
            width: 50%; 
            bottom: 0;
            height: 196px; 
            background: rgba(217, 217, 217, 0.48);
          "></div>
        </div>
      </div>

      <!-- Right side with login form -->
      <div class="col-6 q-pa-md">
        <div class="column q-gutter-y-md">
          <div class="text-center q-pt-lg">
            <h5 class="text-primary q-mb-none" style="font-weight: bold; font-family: Poppins;">
              Seja bem vindo de volta
            </h5>
            <p class="text-grey-7 q-mt-sm" style="font-size: 17px;">
              Continue sua jornada conosco. Juntos, vamos <br /> mais longe
            </p>
          </div>

          <q-form @submit="onSubmit" class="q-gutter-y-md q-px-lg">
            <q-input v-model="email" type="email" label="Email" outlined
              :rules="[val => !!val || 'Email é obrigatório']">
              <template v-slot:append>
                <q-icon name="mail" />
              </template>
            </q-input>

            <q-input v-model="password" :type="isPwd ? 'password' : 'text'" label="Senha" outlined
              :rules="[val => !!val || 'Senha é obrigatória']">
              <template v-slot:append>
                <q-icon :name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer"
                  @click="isPwd = !isPwd" />
              </template>
            </q-input>

            <GradBtn :title="'Entrar'" :type="'submit'" />

            <div class="text-center q-gutter-y-sm">
              <q-btn flat color="primary" label="Esqueci a senha" class="full-width" no-caps />
              <p class="text-grey-7 q-mb-none">
                Não tem uma conta?
                <q-btn flat color="primary" label="Inscreva-se" no-caps class="q-px-sm" padding="none"
                  @click="router.push('/register')" />
              </p>
            </div>
          </q-form>
        </div>
      </div>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import image from 'assets/desktopLogin.png'
import isMobile from 'src/utils/isMobile'
import GradBtn from 'src/components/MobileButton/GradBtn.vue'

const tab = ref('login')
const email = ref('')
const password = ref('')
const registerForm = ref({
  name: '',
  email: '',
  tel: '',
  password: ''
})
const isPwd = ref(true)
const router = useRouter()

const onSubmit = () => {
  console.log('Login attempt:', { email: email.value, password: password.value })
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

.login-container {
  width: 100%;
  max-width: 400px;
  padding: 20px;
  border-radius: 16px;
}

.mobile-input {
  :deep(.q-field__control) {
    height: 60px;
    background: #f8f9fa;
    border-radius: 10px;
  }

  :deep(.q-field__marginal) {
    height: 50px;
  }
}

// Add a subtle gradient background to the page
:deep(.q-page) {
  background: linear-gradient(180deg, #f5f7ff 0%, #ffffff 100%);
}
</style>