<script lang="ts" setup>
import type {FILTERS} from "~/app.types";
import {
  dualSingleOptions,
  inkableOptions,
  inkOptions,
  rarityOptions,
  setOptions,
  sortOptions,
  typeOptions
} from "~/app.options";

const visible = defineModel('visible', {required: true, default: false});

defineProps<{
  filters: FILTERS
  includeSort?: boolean,
}>()
</script>

<template>
  <Drawer v-model:visible="visible" blockScroll class="w-[90%]! max-w-80!" header="Filters" position="right">
    <div class="flex flex-col gap-8">
      <UiSelect
        v-if="includeSort"
        v-model="filters.sort"
        :options="sortOptions"
        prefix="Sort by"
      />

      <div class="flex flex-col gap-4">
        <UiCheckboxes v-model="filters.inks" :options="inkOptions" label="Inks"/>
        <UiCheckboxes v-model="filters.types" :options="typeOptions" label="Types"/>
        <UiCheckboxes v-model="filters.rarities" :options="rarityOptions" label="Rarities"/>
        <UiCheckboxes v-model="filters.sets" :options="setOptions" label="Sets"/>
        <UiCheckboxes v-model="filters.inkable" :options="inkableOptions" label="Inkable"/>
        <UiCheckboxes v-model="filters.dualSingle" :options="dualSingleOptions" label="Dual or Single Ink"/>
      </div>
    </div>

    <template #footer>
      <!--      <div class="flex justify-between items-center gap-2">-->
      <!--        <UiButton label="Cancel"/>-->
      <!--        <UiButton label="Apply"/>-->
      <!--      </div>-->
    </template>
  </Drawer>
</template>
