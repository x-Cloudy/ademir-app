<template>
  <div style="width: 100%; height: 100%;" class="q-px-md">
    <q-card class="bg-white q-pa-lg q-mt-md" style="width: 100%; height: 840px;">
      <div class="flex column" style="width: 400px; height: 100%;">
        <q-card-section class="card-section" style="height: 25%;">
          <div class="bg-dark text-white absolute full-width q-pa-md flex items-center section-header">
            <p style="margin: 0; font-weight: 600; color: #F2C037;">ADICIONAR VIDEOS</p>
          </div>

          <q-input color="black" bg-color="white" class="full-width" outlined label="URL DO YOUTUBE" v-model="form" />
          <q-btn class="q-mt-sm full-width text-black" style="font-weight: 600;" color="warning">
            Salvar
          </q-btn>
        </q-card-section>

        <q-card-section class="card-section q-mt-md" style="height: 72%;">
          <div class="bg-dark text-white absolute full-width q-pa-md flex items-center section-header">
            <p style="margin: 0; font-weight: 600; color: #F2C037;">VIDEOS</p>
          </div>

          <div style="overflow-y: scroll;">
            <div v-for="(item, index) of videos" :key="index">
              <iframe width="350" height="150" :src="`https://www.youtube.com/embed/${item.url}?si=vGK9wXF7Sqxrhc8s`" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin"></iframe>
            </div>
          </div>
        </q-card-section>
      </div>
    </q-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';


const form = ref<any>('')

const videos = ref([
  {
    id: 1,
    url: 'yvWTNh185gw'
  },
  {
    id: 2,
    url: 'ao4ro-8igAQ'
  },
  {
    id: 3,
    url: 'yvWTNh185gw'
  },
  {
    id: 4,
    url: 'yvWTNh185gw'
  },
])
</script>

<style scoped>
* {
  font-family: Poppins;
}

.card-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  background-color: lightgray;
  padding-top: 60px;
}

.section-header {
  left: 0;
  top: 0;
  border-radius: 5px 5px 0 0;
  height: 50px;
}
</style>