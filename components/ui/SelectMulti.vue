<script lang="ts" setup>
import MultiSelect from 'primevue/multiselect';
import InputGroup from "primevue/inputgroup";
import InputGroupAddon from "primevue/inputgroupaddon";

const model = defineModel();

withDefaults(defineProps<{
  options: any[];
  placeholder?: string;
  allLabel?: string;
}>(), {
  allLabel: 'All'
})
</script>

<template>
  <InputGroup>
    <InputGroupAddon>
      <p class="text-sm">Include</p>
    </InputGroupAddon>

    <MultiSelect
      v-model="model"
      :maxSelectedLabels="options.length - 1"
      :options
      :placeholder
      :selectedItemsLabel="allLabel"
      option-label="label"
      option-value="value"
      pt:root:class="flex!"
      size="small"
    />
  </InputGroup>
</template>
