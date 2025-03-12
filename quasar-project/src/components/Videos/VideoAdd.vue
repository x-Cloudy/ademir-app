<template>
  <div class="flex column q-mr-md" style="width: 400px; height: 100%;">
    <HeaderCard :title="'ADICIONAR VIDEOS'">
      <q-input color="black" bg-color="white" class="full-width" outlined label="URL DO YOUTUBE" v-model="form" />
      <q-btn @click="handleSave"
      class="q-mt-sm full-width text-black" style="font-weight: 600;" color="warning">
        Salvar
      </q-btn>
    </HeaderCard>

    <HeaderCard :title="'VIDEOS'" style="height: 75%; margin-top: 1rem;">
      <div style="overflow-y: scroll;">
        <div class="flex q-mb-md" v-for="(item, index) of videos" :key="index">
          <iframe width="350" height="150" :src="`https://www.youtube.com/embed/${item.url}?si=vGK9wXF7Sqxrhc8s`"
            title="YouTube video player" frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerpolicy="strict-origin-when-cross-origin"></iframe>
            <q-btn @click="handleDelete(item)" icon="close" dense color="red" />
        </div>
      </div>
    </HeaderCard>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import HeaderCard from '../HeaderCard/HeaderCard.vue';
import { api } from 'src/boot/axios';

const form = ref<any>('')
const videos = ref<any>([])

const handleSave = async () => {
  console.log(form.value.split('=')[1])
  try {
    await api.post('/table-text', form.value.split('=')[1]);
    await getVideos();
  } catch (error) {
    console.log(error)
  }
}

const getVideos = async () => {
  const response = await api.get('/table-text')
  console.log('res', response)
  if (response.status === 200) {
    videos.value = response.data
  }
}

const handleDelete = (id: any) => {
  console.log('dd', id)
  const response = await api.delete(`/table-text/${id}`)
  console.log('res del', response)
}

onMounted(async () => {
  await getVideos()
})
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
