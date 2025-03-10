<script lang="ts" setup>
import Select from 'primevue/select';
import InputGroup from "primevue/inputgroup";
import InputGroupAddon from "primevue/inputgroupaddon";

const model = defineModel();

defineProps<{
  options: any[];
  placeholder?: string;
}>()
</script>

<template>
  <InputGroup>
    <InputGroupAddon>
      <p class="text-sm">Include</p>
    </InputGroupAddon>

    <Select
      v-model="model"
      :options
      :placeholder
      checkmark
      option-label="label"
      option-value="value"
      pt:root:class="flex!"
      size="small"
    />
  </InputGroup>
</template>
