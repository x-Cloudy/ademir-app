<template>
  <q-page class="flex justify-center items-center" style="
      background: linear-gradient(186.9deg, rgba(255, 252, 252, 0.4) 48.73%, rgba(141, 167, 206, 0.2) 78.74%);
    ">
    <div class="login-container">
      <div class="text-center q-mb-lg">
        <div v-if="tab === 'login'" class="text-center q-pt-lg q-mb-lg">
          <h5 class="q-mb-none" style="
              font-weight: bold; 
              font-family: Poppins;
              font-size: 28px;
              color: rgb(255, 208, 0);;
            ">
            Bem vindo de volta
          </h5>
          <p class="text-grey-7 q-mt-sm" style="font-size: 18px; font-weight: 500;">
            Continue sua jornada conosco. <br /> Juntos, vamos mais longe
          </p>
        </div>

        <div v-if="tab === 'register'" class="text-center q-pt-lg q-mb-lg">
          <h5 class="q-mb-none" style="
              font-weight: bold; 
              font-family: Poppins;
              font-size: 33px;
              color:rgb(255, 208, 0);
            ">
            Seja bem vindo
          </h5>
          <p class="text-grey-7 q-mt-sm" style="font-size: 18px; font-weight: 500;">
            Comece sua jornada conosco. <br /> Juntos, vamos mais longe
          </p>
        </div>

        <!-- Login/Register tabs -->
        <div class="row justify-center">
          <q-tabs v-model="tab" class="text-grey q-mb-sm" active-color="grey-7" indicator-color="black" dense>
            <q-tab name="login" label="Entrar" style="
                width: 110px; 
                font-family: Poppins;
                " />
            <q-tab name="register" label="Cadastrar" style="
                font-family: Poppins;" />
          </q-tabs>
        </div>
      </div>

      <q-tab-panels v-model="tab" animated style="background-color: transparent;">
        <q-tab-panel name="login" >
          <q-form>
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

            <div class="q-mt-lg">
              <GradBtn :title="'login'" :type="'button'" @btn-click="emit('onLogin', loginForm)" />
            </div>

            <div class="text-center q-mt-md">
              <q-btn flat color="primary" label="Esqueci a senha" class="text-weight-medium" size="md" no-caps  @click="router.push('/recuperar-senha')"/>

              <div class="text-grey-7 q-mt-md" style="margin-bottom: 150px;">
                Não tem uma conta?
                <q-btn flat color="primary" label="Inscreva-se" class="text-weight-medium q-px-xs" size="md" no-caps
                  @click="tab = 'register'" padding="none" />
              </div>
            </div>
          </q-form>

        </q-tab-panel>

        <q-tab-panel name="register">
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
              <GradBtn :title="'Registrar'" :type="'button'" @btn-click="emit('onRegister', registerForm)" />
            </div>

            <div class="text-center q-mt-md">
              <div class="text-grey-7 q-mt-md" style="margin-bottom: 150px;">
                Já tem uma conta?
                <q-btn flat color="primary" label="Login" class="text-weight-medium q-px-xs" size="md" no-caps
                  @click="tab = 'login'" padding="none" />
              </div>
            </div>
          </q-form>
        </q-tab-panel>
      </q-tab-panels>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import GradBtn from 'src/components/Buttons/GradBtn.vue';

const emit = defineEmits(['onLogin', 'onRegister'])

const router = useRouter()
const tab = ref<any>('login')
const isPwd = ref(true)
const loginForm = ref<any>({
  email: '',
  password: ''
})
const registerForm = ref<any>({
  name: '',
  email: '',
  tel: '',
  password: ''
})

</script>


<style scoped lang="scss">
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