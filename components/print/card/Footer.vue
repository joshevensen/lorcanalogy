<script lang="ts" setup>
import type {MAPPED_CARD} from "~/app.types";

const props = defineProps<{
  card: MAPPED_CARD,
}>()

const isLandscape = props.card.layout === 'landscape';
</script>

<template>
  <div :class="['flex justify-between items-center', isLandscape && 'flex-col-reverse']">
    <p :class="['flex items-center gap-1 text-[7pt] text-gray-600', isLandscape && 'text-vertical']">
      {{ card.id }} - {{ card.rarity }}
    </p>
    <p :class="['text-[6pt] text-gray-600', isLandscape && 'text-vertical']">
      For personal use only
    </p>
  </div>
</template>
