<script lang="ts" setup>
import Button from 'primevue/button';

withDefaults(defineProps<{
  label: string;
  outlined?: boolean;
  icon?: string;
  fluid?: boolean;
  size?: 'small' | 'large' | 'medium'
}>(), {
  outlined: true,
  size: 'small'
})
</script>

<template>
  <Button :fluid :icon="icon ? `pi pi-${icon}` : undefined" :label :outlined :size/>
</template>
