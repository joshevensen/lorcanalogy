<script lang="ts" setup>
defineProps<{
  to: string;
}>()
</script>

<template>
  <NuxtLink :to class="text-primary-600 hover:text-primary-400 font-bold">
    <slot/>
  </NuxtLink>
</template>
