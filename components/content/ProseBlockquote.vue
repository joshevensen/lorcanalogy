<script lang="ts" setup>
defineProps<{
  from?: string
}>()
</script>

<template>
  <blockquote class="mb-4 py-2 border-l-4 border-lorcana-parchment-400 italic">
    <slot/>
    <p v-if="from" class="-mt-2 text-right text-sm">-- {{ from }}</p>
  </blockquote>
</template>
