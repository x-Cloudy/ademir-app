<template>
  <div v-if="hasAccess(['admin'])" style="width: 100%; height: auto;" class="q-px-md">
    <q-card class="bg-white q-pa-lg q-mt-md flex no-wrap" :class="isMobile() ? 'column' : ''" style="width: 100%; height: auto;">
      <VideoAdd />

      <div style="width: 100%; height: 100%;">
        <HeaderCard :title="'GERAL'" style="height: 100%;">
          <div class="flex justify-start" style="height: 100%; width: 100%;">
            <div style="height: 100%; width: 250px;">
              <div class="column q-pa-sm" style="border: 2px solid gray; border-radius: 5px; width: 100%;">
                <label style="font-weight: 600;">CARTEIRA DE RECEBIMENTO</label>
                <div class="flex justify-center" style="margin: 0; padding: 0; border-radius: 5px; width: 100%;">
                  <Toggle :value="options.paymentWallet" @click="(value) => options.paymentWallet = value()"/>
                </div>
              </div>
            </div>
          </div>
        </HeaderCard>
      </div>
    </q-card>
  </div>
</template>

<script setup lang="ts">
import VideoAdd from 'src/components/Videos/VideoAdd.vue';
import HeaderCard from 'src/components/HeaderCard/HeaderCard.vue';
import Toggle from 'src/components/Buttons/ToggleBtn.vue';
import { ref } from 'vue';
import isMobile from 'src/utils/isMobile';
import { hasAccess } from 'src/utils/can-access';

const options = ref({
  paymentWallet: false
})

</script>

<style scoped>
* {
  font-family: Poppins;
}
</style>
