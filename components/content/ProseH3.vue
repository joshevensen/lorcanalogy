<script setup lang="ts">
defineProps<{ id?: string }>()
</script>

<template>
  <h3 :id class="mt-6 mb-4 text-2xl">
    <a :href="`#${id}`"><slot /></a>
  </h3>
</template>
