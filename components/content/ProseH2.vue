<script setup lang="ts">
defineProps<{ id?: string }>()
</script>

<template>
  <h2
    :id
    class="mt-18 mb-8 pb-2 border-b border-b-orange-800 text-2xl md:text-3xl font-bold text-center text-orange-600 uppercase tracking-wide"
  >
    <a :href="`#${id}`"><slot /></a>
  </h2>
</template>
