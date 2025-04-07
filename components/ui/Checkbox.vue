<script lang="ts" setup>
import Checkbox from 'primevue/checkbox';

const model = defineModel();
</script>

<template>
  <Checkbox v-model="model" binary size="small"/>
</template>
