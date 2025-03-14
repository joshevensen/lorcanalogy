<script lang="ts" setup>
import type {MAPPED_CARD} from "~/app.types";

const props = defineProps<{
  card: MAPPED_CARD,
}>()

const isLandscape = props.card.layout === 'landscape';
</script>

<template>
  <div class="relative">
    <div
      :class="['space-y-1 text-[6.5pt]', isLandscape && 'text-vertical']"
      v-html="card.text"
    ></div>

    <div :class="['absolute flex justify-center items-center', isLandscape ? 'inset-x-0 top-0 h-[0.25in] gap-2' : 'inset-y-0 right-0 w-[0.25in] flex-col gap-1']">
      <NuxtImg
        v-for="index in Number(card.lore)"
        :key="index"
        alt="Lore"
        class="w-[0.125in] transform-[rotate(-90deg)]"
        src="/icons/card-parts/lore.png"
      />
    </div>
  </div>
</template>
