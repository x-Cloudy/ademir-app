<template>
  <q-page class="flex justify-center items-center" style="
      background: linear-gradient(186.9deg, rgba(255, 252, 252, 0.4) 48.73%, rgba(141, 167, 206, 0.2) 78.74%);
    ">
    <div class="login-container">
      <div class="text-center q-mb-lg">
        <div class="text-center q-pt-lg q-mb-lg">
          <h5 class="q-mb-none text-dark" style="
              font-weight: bold; 
              font-family: Poppins;
              font-size: 33px;
            ">
            Seja bem vindo
          </h5>
          <p class="text-grey-7 q-mt-sm" style="font-size: 18px; font-weight: 500;">
            Comece sua jornada conosco. <br /> Juntos, vamos mais longe
          </p>
        </div>

      </div>
      <MobileRegisterComponent />
    </div>
  </q-page>
</template>

<script setup lang="ts">
import MobileRegisterComponent from 'src/components/Register/MobileRegisterComponent.vue';
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