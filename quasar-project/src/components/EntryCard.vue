<template>
  <q-page class="flex flex-center" style="overflow-y: hidden;">
    <q-card class="login-card row">

      <div class="col-6 left-card">
        <div class="column items-center justify-center full-height q-pa-md">
          <h5 class="text-weight-semibold text-grey-8" 
            style="text-align: center; font-family: Poppins; color: darkgrey !important;">
            Tenha a sua <br />
            <span class="text-warning" style="font-size: 25px; font-weight: bold;">
              Liberdade financeira
            </span>
          </h5>
          <img :src="image" alt="Financial Freedom Illustration"
            style="max-width: 90%; position: relative; z-index: 100;">
        </div>
      </div>

      <div class="col-6 q-pa-md bg-grey-3">
        <div class="column q-gutter-y-md">
          <slot></slot>
        </div>
      </div>
     
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import image from 'assets/LogoBrancasemfundo.png'
</script>

<style lang="scss" scoped>
.login-card {
  width: 900px;
  max-width: 90vw;
  border-radius: 8px;
  height: auto;
  min-height: 650px;
  overflow: hidden;
}

.left-card {
  background-color: rgb(43, 42, 42);
  border-radius: 5px 0 0 5px !important;
}
</style>