<script lang="ts" setup>
import Button from 'primevue/button';

defineProps<{
  label: string;
  icon?: string;
}>()
</script>

<template>
  <Button :icon="`pi pi-${icon}`" :label outlined size="small"/>
</template>
