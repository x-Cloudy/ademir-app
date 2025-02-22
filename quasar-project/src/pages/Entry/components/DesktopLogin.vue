<template>
  <q-page class="flex flex-center" style="overflow-y: hidden;">
    <q-card class="login-card row">
     
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
        <div v-if="tab === 'login'" class="column q-gutter-y-md">
          <div class="text-center q-pt-lg">
            <h5 class="text-primary q-mb-none" style="font-weight: bold; font-family: Poppins;">
              Bem vindo de volta
            </h5>
            <p class="text-grey-7 q-mt-sm" style="font-size: 17px;">
              Continue sua jornada conosco. Juntos, vamos <br /> mais longe
            </p>
          </div>

          <q-form class="q-gutter-y-md q-px-lg">
            <q-input v-model="loginForm.email" type="email" label="Email" outlined
              :rules="[val => !!val || 'Email é obrigatório']">
              <template v-slot:append>
                <q-icon name="mail" />
              </template>
            </q-input>

            <q-input v-model="loginForm.password" :type="isPwd ? 'password' : 'text'" label="Senha" outlined
              :rules="[val => !!val || 'Senha é obrigatória']">
              <template v-slot:append>
                <q-icon :name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer"
                  @click="isPwd = !isPwd" />
              </template>
            </q-input>

            <GradBtn :title="'Entrar'" :type="'button'" 
              @btn-click="emit('onLogin', loginForm)" />

            <div class="text-center q-gutter-y-sm">
              <q-btn flat color="primary" label="Esqueci a senha" class="full-width" no-caps @click="router.push('/recuperar-senha')"/>

              <p class="text-grey-7 q-mb-none">
                Não tem uma conta?
                <q-btn flat color="primary" label="Inscreva-se" no-caps class="q-px-sm" padding="none"
                  @click="tab = 'register'" />
              </p>
            </div>
          </q-form>
        </div>

        <div v-if="tab === 'register'" class="column q-gutter-y-md">
          <div class="text-center q-pt-lg">
            <h5 class="text-primary q-mb-none" style="font-weight: bold; font-family: Poppins;">
              Seja bem vindo
            </h5>
            <p class="text-grey-7 q-mt-sm" style="font-size: 17px;">
              Comece sua jornada conosco. Juntos, vamos <br /> mais longe
            </p>
          </div>

          <q-form class="q-px-lg">
            <q-input v-model="registerForm.name" type="text" label="Nome" outlined
              :rules="[val => !!val || 'Nome é obrigatório']">
              <template v-slot:append>
                <q-icon name="person" />
              </template>
            </q-input>

            <q-input v-model="registerForm.email" type="email" label="Email" outlined
              :rules="[val => !!val || 'Email é obrigatório']">
              <template v-slot:append>
                <q-icon name="mail" />
              </template>
            </q-input>

            <q-input v-model="registerForm.tel" type="tel" label="Telefone" outlined
              :rules="[val => !!val || 'Telefone é obrigatório']">
              <template v-slot:append>
                <q-icon name="phone" />
              </template>
            </q-input>

            <q-input v-model="registerForm.password" :type="isPwd ? 'password' : 'text'" label="Senha" outlined
              :rules="[val => !!val || 'Senha é obrigatória']">
              <template v-slot:append>
                <q-icon :name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer"
                  @click="isPwd = !isPwd" />
              </template>
            </q-input>

            <GradBtn :title="'Registrar'" :type="'button'"
            @btn-click="emit('onRegister', registerForm)" />

            <div class="text-center q-gutter-y-sm q-mt-md">
              <p class="text-grey-7 q-mb-none">
                Já tem uma conta?
                <q-btn flat color="primary" label="Entrar" no-caps class="q-px-sm" padding="none"
                  @click="tab = 'login'" />
              </p>
            </div>
          </q-form>
        </div>
      </div>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import GradBtn from 'src/components/MobileButton/GradBtn.vue';
import image from 'assets/desktopLogin.png'
import { useRouter } from 'vue-router';

const emit = defineEmits(['onRegister', 'onLogin'])

const router = useRouter()
const tab = ref('login')
const isPwd = ref(true)
const loginForm = ref({
  email: '',
  password: ''
})
const registerForm = ref({
  name: '',
  email: '',
  tel: '',
  password: ''
})
</script>

<style lang="scss" scoped>
.login-card {
  width: 900px;
  max-width: 90vw;
  border-radius: 8px;
  height: 650px;
  overflow: hidden;
}
</style>