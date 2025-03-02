<script setup lang="ts">
defineProps<{ id?: string }>()
</script>

<template>
  <h2 :id class="mt-8 mb-4 text-3xl">
    <a :href="`#${id}`"><slot /></a>
  </h2>
</template>
