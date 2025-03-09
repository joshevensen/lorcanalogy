<script lang="ts" setup>
import Button from 'primevue/button';

defineProps<{
  icon: string;
}>()
</script>

<template>
  <Button :icon="`pi pi-${icon}`" outlined/>
</template>
