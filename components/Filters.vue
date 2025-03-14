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
}>()
</script>

<template>
  <Drawer v-model:visible="visible" class="w-[90%]! max-w-xl!" header="Filters" position="right">
    <div class="flex flex-col gap-8">
      <UiSelect
        v-model="filters.sort"
        :options="sortOptions"
        prefix="Sort by"
      />

      <!--        <UiInputWithButton-->
      <!--          v-model="searchTerm"-->
      <!--          icon="search"-->
      <!--          label="Search"-->
      <!--          placeholder="search by card name..."-->
      <!--        />-->

      <div class="flex flex-col gap-4">
        <UiSelect
          v-model="filters.inks"
          :options="inkOptions"
          allLabel="All inks"
          multiple
          placeholder="choose ink..."
          prefix="Include"
        />
        <UiSelect
          v-model="filters.types"
          :options="typeOptions"
          allLabel="All types"
          multiple
          placeholder="choose type..."
          prefix="Include"
        />
        <UiSelect
          v-model="filters.rarities"
          :options="rarityOptions"
          allLabel="All rarities"
          multiple
          placeholder="choose rarity..."
          prefix="Include"
        />
        <UiSelect
          v-model="filters.sets"
          :options="setOptions"
          allLabel="All sets"
          multiple
          placeholder="choose set..."
          prefix="Include"
        />
        <UiSelect v-model="filters.inkable" :options="inkableOptions" prefix="Include"/>
        <UiSelect v-model="filters.dualSingle" :options="dualSingleOptions" prefix="Include"/>
      </div>
    </div>
  </Drawer>
</template>
