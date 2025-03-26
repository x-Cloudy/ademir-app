<template>
  <div v-if="hasAccess(['admin', 'INTELECTUS'])" style="width: 100%;">
    <div v-if="hasTop" style="width: 100%;">
      <div style="width: 100%;" class="q-px-md">
        <q-card class="bg-dark q-my-md q-pa-md flex items-center justify-between"
          style="min-height: 70px; height: auto; width: 100%;">
          <h6 style="margin: 0; font-weight: 600; text-transform: uppercase; margin-left: 1rem;" class="text-warning">
            rank de usuário
          </h6>

          <div>
            <q-btn color="warning" label="Rank Geral" class="text-black" style="font-weight: bold;" />
            <q-btn color="warning" label="Rank da Semana" class="q-ml-md text-black" style="font-weight: bold;" />
          </div>
        </q-card>

      </div>

      <div style="width: 100%; height: 100%;" class="q-px-md">
        <div class="bg-dark q-pa-lg" style="width: 100%;">
          <div class="flex column justify-center items-center" style="width: 100%;">

            <div v-if="top_rank.length > 0" style=" margin-bottom: 4rem;" :style="{ scale: isMobile() ? '0.9' : 1 }"
              class="column justify-center items-center q-mb-lg">
              <div v-if="top_rank[0]" class="top-rank-circle gold" :style="{ marginBottom: isMobile() ? '2rem' : '' }">
                <div class="name-tag">{{ top_rank[0].nick.split(' ')[0] }}</div>
                <p class="tag-count">{{ top_rank[0].level }}</p>
              </div>
              <div class="flex">
                <div v-if="top_rank[1]" :style="{ marginRight: isMobile() ? '40px' : '180px' }" class="top-rank-circle silver">
                  <div class="name-tag">{{ top_rank[1].nick.split(' ')[0] }}</div>
                  <p class="tag-count">{{ top_rank[1].level }}</p>
                </div>
                <div v-if="top_rank[2]" class="top-rank-circle coper">
                  <div class="name-tag">{{ top_rank[2].nick.split(' ')[0] }}</div>
                  <p class="tag-count">{{ top_rank[2].level }}</p>
                </div>
              </div>
            </div>

            <div v-for="(item, index) of userRank" :key="index"
              style="width: 100%; max-width: 700px; min-width: 300px; height: auto;" class="columns">

              <div class="flex no-wrap justify-center items-center q-mt-md" style="width: 100%; height: 40px;">

                <span class="text-white flex justify-center list-item-num">
                  #{{ index + 3 }}
                </span>

                <div class="flex items-center justify-center list-item">
                  {{ item.name }}
                </div>

                <span class="text-white flex justify-center list-item-num">
                  {{ item.level }}
                </span>
              </div>

            </div>
          </div>
        </div>
      </div>

      <q-page-sticky position="bottom-right" :offset="[30, 30]">
        <q-btn fab icon="chat" style="color: black; background-color: #F2C037;" />
      </q-page-sticky>

    </div>

    <div v-else style="width: 100%; height: 100%;" class="q-px-md q-mt-md">
      <q-card class="bg-dark q-pa-lg" style="width: 100%; height: 87vh;">
        <div class="flex column justify-center items-center" style="width: 100%;">
          <h4 class="text-white" style="font-weight: 600;">
            Ainda não temos usuários no ranking
          </h4>
        </div>
      </q-card>
      <WppBtn />
    </div>
  </div>

  <RestrictPage v-else />
</template>


<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { api } from 'src/boot/axios';
import isMobile from 'src/utils/isMobile';
import { hasAccess } from 'src/utils/can-access';
import RestrictPage from 'src/components/RestrictPage/RestrictPage.vue';
import WppBtn from 'src/components/Buttons/WppBtn.vue';

const hasTop = ref<boolean>(true)
const userRank = ref<any[]>([])
const top_rank = ref<any[]>([])
onMounted(async () => {
  try {
    const response = await api.get('/top10tree')
    top_rank.value = response.data.splice('0', 3)
    userRank.value = response.data
  } catch (error) {
    hasTop.value = false;
  }
})


</script>

<style scoped lang="scss">
.top-rank-circle {
  display: flex;
  flex-direction: column;
  justify-content: end;
  align-items: center;
  width: 120px;
  height: 120px;
  border-radius: 50%;
}

.coper {
  background-image: url('src/assets/coperMedalSemFundo.png');
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
}

.silver {
  background-image: url('src/assets/silverMedalSemFundo.png');
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
}

.gold {
  background-image: url('src/assets/goldMedalSemFundo.png');
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
}

.name-tag {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 140px;
  height: 40px;
  background-color: $warning;
  transform: translate(0px, 20px);
  border-radius: 10px;
  font-size: 16px;
  font-weight: 600;
  text-wrap: nowrap;
  text-transform: uppercase;
}

.tag-count {
  width: 10%;
  font-weight: bold;
  font-size: 17px;
  color: white;
  transform: translate(-5px, 60px);
}

.list-item-num {
  width: 10%;
  font-weight: bold;
  font-size: 17px;
}

.list-item {
  height: 100%;
  width: 100%;
  border-radius: 20px;
  font-family: Poppins;
  font-size: 18px;
  font-weight: 600;
  background-color: white;
}
</style>
