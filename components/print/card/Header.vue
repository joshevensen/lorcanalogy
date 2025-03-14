<script lang="ts" setup>
import type {MAPPED_CARD} from "~/app.types";

const props = defineProps<{
  card: MAPPED_CARD,
}>()

const isLandscape = props.card.layout === 'landscape';
</script>

<template>
  <div :class="['flex justify-between items-center', isLandscape && 'flex-col']">
    <div :class="['flex gap-2', isLandscape && 'flex-col']">
        <div class="w-[0.125in] h-[0.125in] border border-gray-400"></div>
        <div class="w-[0.125in] h-[0.125in] border border-gray-400"></div>
        <div class="w-[0.125in] h-[0.125in] border border-gray-400"></div>
        <div class="w-[0.125in] h-[0.125in] border border-gray-400"></div>
      </div>

    <p :class="['text-xs text-right uppercase font-bold', isLandscape && 'text-vertical']">
      {{ card.type }}
    </p>
  </div>
</template>
