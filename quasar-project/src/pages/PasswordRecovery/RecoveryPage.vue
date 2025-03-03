<template>
  <q-page class="flex flex-center" style="overflow-y: hidden;">
    <q-card :class="isMobile() ? 'mobile-recovery-card' : 'recovery-card row'"
      :flat="isMobile()">
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
        <div class="column q-gutter-y-md">
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
import isMobile from 'src/utils/isMobile';
import image from 'assets/LogoBrancasemfundo.png'
import GradBtn from 'src/components/Buttons/GradBtn.vue';

const router = useRouter()
const email = ref<any>('')
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