<script lang="ts" setup>
import type {SET} from "~/data/data.types";

const cards = useCards();

const props = defineProps<{
  set: SET
}>()

const setCards = cards.getFilteredCards(props.set.code);
const counts = calculateCardCounts(setCards)
</script>

<template>
  <div>
    <div class="flex justify-between items-end mb-4">
      <h2 class="text-3xl bold">{{ set.name }}</h2>
      <p v-if="set.counts" class="text-xl">{{ set.counts.total }}</p>
    </div>

    <div class="space-y-3 pl-4">
      <div class="flex gap-4">
        <UiChart :data="Object.values(counts.types)" :labels="Object.keys(counts.types)"/>
        <UiChart :data="Object.values(counts.rarities)" :labels="Object.keys(counts.rarities)"/>
        <UiChart
          :data="Object.values(counts.costs)"
          :labels="['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '10+']"
        />
      </div>

      <UiPanel collapsed header="Counts" toggleable>
          <pre>
            {{ counts }}
          </pre>
      </UiPanel>

      <UiPanel collapsed header="Cards" toggleable>
        <div class="space-y-2">
          <CardItem v-for="card in setCards" :key="card.id" :card="card"/>
        </div>
      </UiPanel>
    </div>
  </div>
</template>
