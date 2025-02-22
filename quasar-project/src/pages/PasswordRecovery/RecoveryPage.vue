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
          <img :src="image" alt="password recovery"
            style="max-width: 100%; position: relative; z-index: 100;">
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
              Esqueceu sua senha?
            </h5>
            <p class="text-grey-7 q-mt-sm" style="font-size: 17px;">
              Ensira seu email <br /> para recuperar sua senha
            </p>
          </div>

          <q-form class="q-gutter-y-md q-px-lg">
            <q-input v-model="email" type="email" label="Digite seu e-mail" outlined
              :rules="[val => !!val || 'Email é obrigatório']">
              <template v-slot:append>
                <q-icon name="mail" />
              </template>
            </q-input>

            <GradBtn 
              :title="'Enviar'" 
              :type="'button'" 
              @btn-click="console.log('teste')" 
            />

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
import image from 'assets/password-recovery.png'
import GradBtn from 'src/components/MobileButton/GradBtn.vue';

const router = useRouter()
const email = ref('')
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