<script lang="ts" setup>
import type {CARD} from "~/data/data.types";

const props = defineProps<{
  header: string,
  cards: CARD[],
}>()

const counts = computed(() => {
  return calculateCardCounts(props.cards)
})
</script>

<template>
  <UiPanel :header toggleable>
    <p class="mb-4 text-xl bold">Total: {{ counts.total }}</p>
    <div class="flex flex-col items-center gap-8 md:flex-row md:gap-4">
      <UiChart :data="Object.values(counts.types)" :labels="Object.keys(counts.types)"/>
      <UiChart :data="Object.values(counts.rarities)" :labels="Object.keys(counts.rarities)"/>
      <UiChart
        :data="Object.values(counts.costs)"
        :labels="['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '10+']"
      />
    </div>
  </UiPanel>
</template>
