<script lang="ts" setup>
import Panel from 'primevue/panel';

defineProps<{
  header: string,
  toggleable?: boolean,
  collapsed?: boolean,
  titleClasses?: string,
}>()
</script>

<template>
  <Panel
    :collapsed
    :header
    :pt:title:class="titleClasses"
    :toggleable
    pt:header:class="text-lg pb-2!"
    pt:root:class="bg-lorcana-parchment-0!"
  >
    <slot/>
  </Panel>
</template>
