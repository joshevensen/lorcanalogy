<script setup lang="ts">
defineProps<{ id?: string }>()
</script>

<template>
  <h1 :id class="mt-10 mb-6 text-5xl">
    <a :href="`#${id}`"><slot /></a>
  </h1>
</template>
