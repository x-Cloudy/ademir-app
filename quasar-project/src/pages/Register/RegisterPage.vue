<template>
  <EntryCard>
    <RegisterComponent :id="hasId"/>
  </EntryCard>
</template>

<script setup lang="ts">
import EntryCard from 'src/components/EntryCard.vue';
import RegisterComponent from 'src/components/RegisterComponent.vue';
import { computed } from 'vue';
import { useRoute } from 'vue-router';
const route = useRoute()
const hasId = computed(() => typeof route.params.id === 'string' && route.params.id.length > 0 ? route.params.id : '')
</script>