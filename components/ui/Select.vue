<script lang="ts" setup>
import Select from 'primevue/select';
import InputGroup from "primevue/inputgroup";
import InputGroupAddon from "primevue/inputgroupaddon";
import MultiSelect from "primevue/multiselect";
import type {OPTION} from "~/app.types";

const model = defineModel();

withDefaults(defineProps<{
  options: OPTION[];
  multiple?: boolean;
  placeholder?: string;
  prefix?: string;
  allLabel?: string;
}>(), {
  allLabel: 'All'
})
</script>

<template>
  <InputGroup>
    <InputGroupAddon v-if="prefix">
      <p class="text-sm">{{ prefix }}</p>
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
      filter
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
    />
  </InputGroup>
</template>
