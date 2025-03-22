<template>
  <q-page class="flex flex-center" style="overflow-y: hidden;">
    <q-card :class="isMobile() ? 'mobile-recovery-card' : 'recovery-card row'" :flat="isMobile()">
      <div v-if="!isMobile()" class="col-6" style="
        background-color: rgb(43, 42, 42);
        border-radius: 0;
      ">
        <div class="column items-center justify-center full-height q-pa-md">
          <h5 class="text-weight-semibold"
            style="text-align: center; font-family: Poppins; color: darkgrey !important;">
            Tenha a sua <br />
            <span class="text-warning" style="font-size: 25px; font-weight: bold;">
              Liberdade financeira
            </span>
          </h5>
          <img :src="image" alt="Financial Freedom Illustration"
            style="max-width: 90%; position: relative; z-index: 100;">
          <!-- <div style="
            position: absolute;
            width: 50%;
            bottom: 0;
            height: 196px;
            background: rgba(217, 217, 217, 0.48);
          "></div> -->
        </div>
      </div>

      <!-- Right side with login form -->
      <div :class="isMobile() ? '' : 'col-6 q-pa-md bg-grey-3'">

        <div v-if="email_sended">
          <div class="text-center q-pt-lg">
            <h5 class="q-mb-none text-dark" style="font-weight: bold; font-family: Poppins;">
              Esqueceu sua senha?
            </h5>
            <p class="text-grey-7 q-mb-lg" style="font-size: 17px;">
              Ensira o código <br /> que enviamos para o seu email
            </p>
          </div>

          <q-form class="q-gutter-y-md q-px-lg ">
            <q-input class="q-mt-md" filled color="black" v-model="code" type="email" label="Digite o código recebido"
              outlined :rules="[val => !!val || 'Código é obrigatório']">
              <template v-slot:append>
                <q-icon name="password" />
              </template>
            </q-input>

            <GradBtn :title="'Enviar'" :type="'button'" @btn-click="verify_code" />

            <div class="text-center q-gutter-y-sm">
              <p class="text-grey-7 q-mb-none">
                Voltar para login
                <q-btn flat color="primary" label="Entrar" no-caps class="q-px-sm" padding="none"
                  @click="router.push('/')" />
              </p>
            </div>
          </q-form>
        </div>

        <div v-else-if="code_verified" class="column q-gutter-y-md">
          <div class="text-center q-pt-lg">
            <h5 class="q-mb-none text-dark" style="font-weight: bold; font-family: Poppins;">
              Recuperar senha
            </h5>
            <p class="text-grey-7 q-mt-sm" style="font-size: 17px;">
              Insira sua nova senha
            </p>
          </div>

          <q-form class="q-gutter-y-md q-px-lg ">
            <q-input filled color="black" v-model="new_password.password" type="text" label="Digite sua nova senha"
              outlined :rules="[val => !!val || 'Senha é obrigatório']">
              <template v-slot:append>
                <q-icon name="password" />
              </template>
            </q-input>

            <q-input filled color="black" v-model="new_password.same_password" type="text"
              label="Digite a senha novamente" outlined
              :rules="[val => new_password.password === val || 'As senhas precisam ser iguais']">
              <template v-slot:append>
                <q-icon name="password" />
              </template>
            </q-input>

            <GradBtn :title="'Enviar'" :type="'button'" @btn-click="change_password" />

            <div class="text-center q-gutter-y-sm">
              <p class="text-grey-7 q-mb-none">
                Voltar para login
                <q-btn flat color="primary" label="Entrar" no-caps class="q-px-sm" padding="none"
                  @click="router.push('/')" />
              </p>
            </div>
          </q-form>
        </div>

        <div v-else class="column q-gutter-y-md">
          <div class="text-center q-pt-lg">
            <h5 class="q-mb-none text-dark" style="font-weight: bold; font-family: Poppins;">
              Esqueceu sua senha?
            </h5>
            <p class="text-grey-7 q-mt-sm" style="font-size: 17px;">
              Ensira seu email <br /> para recuperar sua senha
            </p>
          </div>

          <q-form class="q-gutter-y-md q-px-lg ">
            <q-input filled color="black" v-model="email" type="email" label="Digite seu e-mail" outlined
              :rules="[val => !!val || 'Email é obrigatório']">
              <template v-slot:append>
                <q-icon name="mail" />
              </template>
            </q-input>

            <GradBtn :title="'Enviar'" :type="'button'" @btn-click="sendEmailReset" />

            <div class="text-center q-gutter-y-sm">
              <p class="text-grey-7 q-mb-none">
                Voltar para login
                <q-btn flat color="primary" label="Entrar" no-caps class="q-px-sm" padding="none"
                  @click="router.push('/')" />
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
import { useRouter } from 'vue-router';
import isMobile from 'src/utils/isMobile';
import image from 'assets/LogoBrancasemfundo.png'
import GradBtn from 'src/components/Buttons/GradBtn.vue';
import notify from 'src/utils/Notify';
import passwordService from 'src/services/password-recovery.service';

const router = useRouter()
const user_id = ref<any>('')
const email = ref('')
const code = ref('')
const new_password = ref({
  password: '',
  same_password: ''
})
const email_sended = ref(false)
const code_verified = ref(false)

const change_password = async () => {
  const response = await passwordService.change_password({
    password: new_password.value.password,
    userId: user_id.value
  })

  if (response.status === 200) {
    user_id.value = '';
    await router.push('/')
    notify({
      type: 'positive',
      msg: 'Senha atualizada'
    })
  } else {
    notify({
      type: 'negative',
      msg: 'Erro ao atualizar senha'
    })
  }
}

const verify_code = async () => {
  const response = await passwordService.verify_email_code({
    email: email.value,
    code: code.value
  })

  if (response.status === 200) {
    code_verified.value = true;
    email_sended.value = false;
    user_id.value = response.data.id;

    notify({
      type: 'positive',
      msg: 'Código confirmado'
    })
  } else {
    notify({
      type: 'negative',
      msg: 'Erro ao confirmar código'
    })
  }
}

const sendEmailReset = async () => {
  const response = await passwordService.send_email_reset({ email: email.value })
  if (response.status === 200) {
    email_sended.value = true;
    notify({
      type: 'positive',
      msg: 'Email de verificação enviado'
    })
  } else {
    notify({
      type: 'negative',
      msg: `Erro: ${response.response.data.error}`
    })
  }
}
</script>

<style lang="scss" scoped>
.recovery-card {
  width: 900px;
  max-width: 90vw;
  border-radius: 8px;
  height: 650px;
  overflow: hidden;
}

.mobile-recovery-card {
  width: 900px;
  max-width: 90vw;
  border-radius: 8px;
  height: 650px;
  overflow: hidden;
  background-color: transparent;
}
</style>
