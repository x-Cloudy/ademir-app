<template>
  <MobileRegisterPage :id="hasId" v-if="isMobile()" />
  
  <EntryCard v-else>
    <RegisterComponent :id="hasId"/>
  </EntryCard>

</template>

<script setup lang="ts">
import EntryCard from 'src/components/EntryCard.vue';
import RegisterComponent from 'src/components/Register/RegisterComponent.vue';
import MobileRegisterPage from './MobileRegisterPage.vue';
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import isMobile from 'src/utils/isMobile';

const route = useRoute()
const hasId = computed(() => typeof route.params.id === 'string' && route.params.id.length > 0 ? route.params.id : '')
</script>