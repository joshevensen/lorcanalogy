<script lang="ts" setup>
defineProps<{
  small?: boolean;
}>()
</script>

<template>
  <div class="flex justify-center">
    <NuxtImg :class="{'md:h-24': small }" alt="Lorcanalogy Logo" src="/logo.png"/>
  </div>
</template>
