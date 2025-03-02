<script setup lang="ts">
defineProps<{ id?: string }>()
</script>

<template>
  <h2
    :id
    class="mt-24 mb-8 pb-4 border-b border-lorcana-parchment-800 text-3xl font-bold text-center text-lorcana-parchment-900 uppercase tracking-wide"
  >
    <a :href="`#${id}`"><slot /></a>
  </h2>
</template>
