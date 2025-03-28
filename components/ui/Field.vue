<script lang="ts" setup>
defineProps<{
  label?: string
}>()
</script>

<template>
  <label class="flex items-center gap-2">
    <slot/>
    <span class="text-xs">{{ label }}</span>
  </label>
</template>
