<template>
  <div v-if="hasAccess(['admin', 'INTELECTUS'])" style="width: 100%; height: auto;" class="q-px-md">
    <q-card class="bg-white q-pa-lg q-mt-md flex no-wrap" :class="isMobile() ? 'column' : ''"
      style="width: 100%; height: auto;">
      <HeaderCard :title="'VíDEOS'" style="height: auto;  margin-top: 1rem;">
      <div v-if="videos.length > 0" class="flex q-gutter-sm justify-center" style="">
        <div class="flex q-mb-md" v-for="(item, index) of videos" :key="index">
          <iframe  width="350" height="200" :src="`https://www.youtube.com/embed/${item.text}?si=vGK9wXF7Sqxrhc8s`"
            title="YouTube video player" frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerpolicy="strict-origin-when-cross-origin"></iframe>
        </div>
      </div>
    </HeaderCard>
    </q-card>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { hasAccess } from 'src/utils/can-access';
import isMobile from 'src/utils/isMobile';
import { api } from 'src/boot/axios';
import HeaderCard from 'src/components/HeaderCard/HeaderCard.vue';

const videos = ref([])

const getVideos = async () => {
  const response = await api.get('/table-text')
  if (response.status === 200) {
    videos.value = response.data.data
  }
}

onMounted(async () => {
  await getVideos()
})
</script>
