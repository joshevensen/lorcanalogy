<script lang="ts" setup>
import Select from 'primevue/select';
import InputGroup from "primevue/inputgroup";
import InputGroupAddon from "primevue/inputgroupaddon";
import MultiSelect from "primevue/multiselect";

export interface OPTION {
  label: string;
  value: string | number | undefined;
}

const model = defineModel();

withDefaults(defineProps<{
  options: OPTION[];
  multiple?: boolean;
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
      v-if="multiple"
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

    <Select
      v-else
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
