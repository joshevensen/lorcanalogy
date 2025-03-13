<script lang="ts" setup>
import type {MAPPED_CARD} from "~/data/data.types";

defineProps<{
  card: MAPPED_CARD,
}>()
</script>

<template>
  <div class="flex justify-between items-center pr-[0.1in]">
    <div class="flex items-center gap-2">
      <div class="flex gap-2">
        <div class="w-[0.125in] h-[0.125in] border border-gray-400"></div>
        <div class="w-[0.125in] h-[0.125in] border border-gray-400"></div>
        <div class="w-[0.125in] h-[0.125in] border border-gray-400"></div>
        <div class="w-[0.125in] h-[0.125in] border border-gray-400"></div>
      </div>
    </div>

    <p class="text-xs text-right uppercase font-bold">{{ card.type }}</p>
  </div>
</template>
