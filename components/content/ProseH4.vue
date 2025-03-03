<script setup lang="ts">
defineProps<{ id?: string }>()
</script>

<template>
  <h4 :id class="mt-4 mb-2 pl-2 text-lg text-lorcana-parchment-900 font-semibold">
    <a :href="`#${id}`"><slot /></a>
  </h4>
</template>
