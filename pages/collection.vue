<script lang="ts" setup>
definePageMeta({title: 'Collection'})

const visible = ref(false);
const collection = await useCollection();

</script>

<template>
  <div class="flex gap-10 mt-8 max-w-7xl mx-auto">
    <div class="hidden md:flex flex-col gap-8 basis-56 max-w-56">
      <CollectionFilters :filters="collection.filters.value"/>
    </div>

    <UiList v-if="!collection.loading" :items="collection.filtered.value" class="grow">
      <template #header>
        <div class="flex items-center justify-between">
          <p class="italic text-gray-400">{{ collection.filtered.value.length }} of {{ collection.all.length }}
            cards</p>
          <UiButton class="md:hidden!" icon="filter" label="Filters" @click="visible = true"/>
        </div>
      </template>

      <template #listItem="{ item }">
        <CollectionItem :item="item"/>
      </template>
    </UiList>
  </div>

  <UiDrawer v-model:visible="visible" header="Filters" position="right">
    <div class="flex flex-col gap-8">
      <CollectionFilters :filters="collection.filters.value"/>
    </div>
  </UiDrawer>
</template>
