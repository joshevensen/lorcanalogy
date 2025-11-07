<script lang="ts" setup>
const visible = defineModel('visible', {required: true, default: false});

defineProps<{
  filters: any
  options: any
  includeSort?: boolean,
}>()
</script>

<template>
  <UiDrawer v-model:visible="visible" header="Filters" position="right">
    <div class="flex flex-col gap-8">
      <!--      <UiSelect-->
      <!--        v-if="includeSort"-->
      <!--        v-model="filters.sort"-->
      <!--        :options="options.sort"-->
      <!--        prefix="Sort by"-->
      <!--      />-->

      <div class="flex flex-col gap-4">
        <UiField label="Inks">
          <UiSelect v-model="filters.inks" :options="options.ink" multiple/>
        </UiField>

        <UiField label="Types">
          <UiSelect v-model="filters.types" :options="options.type" multiple/>
        </UiField>

        <UiField label="Rarities">
          <UiSelect v-model="filters.rarities" :options="options.rarity" multiple/>
        </UiField>

        <UiField label="Sets">
          <UiSelect v-model="filters.sets" :options="options.set" multiple/>
        </UiField>

        <UiField label="Inkable">
          <UiSelect v-model="filters.inkable" :options="options.inkable" multiple/>
        </UiField>

        <UiField label="Dual or Single Ink">
          <UiSelect v-model="filters.dualSingle" :options="options.dualSingle" multiple/>
        </UiField>

        <UiField
          description="Only show cards that has one of these keywords. If no keywords are selected, then all cards will be shown."
          label="Character Keywords"
        >
          <UiSelect
            v-model="filters.keywords"
            :options="options.keyword"
            multiple
          />
        </UiField>

        <UiField
          description="Only show cards that has one of these classifications. If no classifications are selected, then all cards will be shown."
          label="Character Classifications"
        >
          <UiSelect
            v-model="filters.classifications"
            :options="options.classification"
            multiple
          />
        </UiField>
      </div>
    </div>
  </UiDrawer>
</template>
