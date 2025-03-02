<script setup lang="ts">
defineProps<{ id?: string }>()
</script>

<template>
  <h4 :id class="my-4 text-xl">
    <a :href="`#${id}`"><slot /></a>
  </h4>
</template>
