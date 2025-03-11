<script lang="ts" setup>
import Button from 'primevue/button';

withDefaults(defineProps<{
  label: string;
  outlined?: boolean;
  icon?: string;
}>(), {
  outlined: true,
})
</script>

<template>
  <Button :icon="icon ? `pi pi-${icon}` : undefined" :label :outlined size="small"/>
</template>
