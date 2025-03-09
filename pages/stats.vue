<script lang="ts" setup>
import StatsPanel from "~/components/StatsPanel.vue";

definePageMeta({title: "Stats"})
const cards = useCards();

const all = cards.getFilteredCards(null, {hideEnchanted: false})
const standard = cards.getFilteredCards(null)
const singleInk = cards.getFilteredCards(null, {hideDualInk: true})
const dualInk = cards.getFilteredCards(null, {isDualInkOnly: true})
</script>

<template>
  <div class="mt-12 space-y-8">
    <StatsPanel :cards="all" header="All Cards"/>
    <StatsPanel :cards="standard" header="Standard (Non Enchanted)"/>
    <StatsPanel :cards="singleInk" header="Single Ink Only"/>
    <StatsPanel :cards="dualInk" header="Dual Ink Only"/>
  </div>
</template>
