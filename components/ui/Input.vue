<script lang="ts" setup>
import InputText from 'primevue/inputtext';

const model = defineModel<string>()

defineProps<{
  placeholder?: string;
}>()
</script>

<template>
  <InputText v-model="model" :placeholder/>
</template>
