<script setup lang="ts">
defineProps<{ id?: string }>()
</script>

<template>
  <h3 :id class="mt-8 mb-4 text-2xl text-lorcana-parchment-900 font-bold">
    <a :href="`#${id}`"><slot /></a>
  </h3>
</template>
