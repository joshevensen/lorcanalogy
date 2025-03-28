<script lang="ts" setup>
const visible = defineModel('visible', {required: true, default: false});

const props = defineProps<{
  filters: any
  includeSort?: boolean,
}>()

const options = await useOptions();
</script>

<template>
  <Drawer v-model:visible="visible" blockScroll class="w-[90%]! max-w-80!" header="Filters" position="right">
    <div class="flex flex-col gap-8">
      <UiSelect
        v-if="includeSort"
        v-model="filters.sort"
        :options="options.sort"
        prefix="Sort by"
      />

      <div class="flex flex-col gap-4">
        <UiCheckboxes v-model="filters.inks" :options="options.ink" label="Inks"/>
        <UiCheckboxes v-model="filters.types" :options="options.type" label="Types"/>
        <UiCheckboxes v-model="filters.rarities" :options="options.rarity" label="Rarities"/>
        <UiCheckboxes v-model="filters.sets" :options="options.set" label="Sets"/>
        <UiCheckboxes v-model="filters.inkable" :options="options.inkable" label="Inkable"/>
        <UiCheckboxes v-model="filters.dualSingle" :options="options.dualSingle" label="Dual or Single Ink"/>
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
