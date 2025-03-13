<script lang="ts" setup>
import type {MAPPED_CARD} from "~/data/data.types";

defineProps<{
  card: MAPPED_CARD,
}>()
</script>

<template>
  <div class="flex justify-between items-center px-[0.1in]">
    <p class="flex items-center gap-1 text-[7pt] text-gray-600">{{ card.id }} - {{ card.rarity }}</p>
    <p class="text-[6pt] text-gray-600">For personal use only</p>
  </div>
</template>
