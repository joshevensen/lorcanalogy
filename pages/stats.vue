<script lang="ts" setup>
import StatsPanel from "~/components/StatsPanel.vue";

definePageMeta({title: "Stats"})
const {all} = useCards();
</script>

<template>
  <div class="mt-12 space-y-8">
    <StatsPanel :cards="all" header="All Cards"/>
  </div>
</template>
