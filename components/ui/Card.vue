<script lang="ts" setup>
import Card from 'primevue/card';

defineProps<{
  heading?: string;
}>()
</script>

<template>
  <Card pt:root:class="bg-lorcana-parchment-0!">
    <template v-if="heading" #title>
      <h2 class="text-lg">{{ heading }}</h2>
    </template>
    <template #content>
      <slot/>
    </template>
  </Card>
</template>
