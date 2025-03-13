<script lang="ts" setup>
import type {MAPPED_CARD} from "~/data/data.types";

defineProps<{
  card: MAPPED_CARD,
}>()
</script>

<template>
  <div class="flex flex-col items-center justify-center px-[0.1in]">
    <p class="text-3xl font-bold leading-none text-center">{{ card.name }}</p>
    <p class="text-sm text-center font-semibold">{{ card.version }}</p>
  </div>
</template>
