<script lang="ts" setup>
defineProps<{
  filters: any
}>()

const options = await useOptions();
</script>

<template>
  <UiSelect
    v-model="filters.sort"
    :options="options.sort"
    prefix="Sort by"
  />

  <div class="flex flex-col gap-4">
    <UiField label="Sets">
      <UiSelect v-model="filters.sets" :options="options.set" multiple/>
    </UiField>

    <UiField label="Inks">
      <UiSelect v-model="filters.inks" :options="options.ink" multiple/>
    </UiField>

    <UiField label="Rarities">
      <UiSelect v-model="filters.rarities" :options="options.rarity" multiple/>
    </UiField>

    <UiField label="Types">
      <UiSelect v-model="filters.types" :options="options.type" multiple/>
    </UiField>
  </div>
</template>
