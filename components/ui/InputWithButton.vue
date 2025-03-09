<script lang="ts" setup>
import InputText from 'primevue/inputtext';
import InputGroup from 'primevue/inputgroup';
import InputGroupAddon from 'primevue/inputgroupaddon';

const emits = defineEmits('click')

const model = defineModel()

defineProps<{
  icon: string;
  label?: string;
  placeholder?: string;
}>()

</script>

<template>
  <InputGroup>
    <InputText v-model="model" :placeholder/>
    <InputGroupAddon>
      <Button :icon="`pi pi-${icon}`" :label severity="secondary" size="small" variant="text" @click="emits.click()"/>
    </InputGroupAddon>
  </InputGroup>
</template>
