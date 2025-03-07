<script setup lang="ts">
defineProps<{ id?: string }>()
</script>

<template>
  <h3 :id class="mt-8 mb-2 md:mb-4 text-xl md:text-2xl text-orange-600 font-bold">
    <a :href="`#${id}`"><slot /></a>
  </h3>
</template>
