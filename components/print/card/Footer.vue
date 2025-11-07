<script lang="ts" setup>
import type {Card} from "@prisma/client";
import {useStartCase} from "../../../.nuxt/imports";

const props = defineProps<{
  card: Card & {
    Rarity?: { id: number; name: string };
    Types?: Array<{ id: number; name: string }>;
  },
}>()

const isLandscape = computed(() => {
  return props.card.Types?.some(type => type.name.toLowerCase() === 'location') ?? false;
});
</script>

<template>
  <div :class="['flex justify-between items-center', isLandscape && 'flex-col-reverse']">
    <p :class="['flex items-center gap-1 text-[7pt] text-gray-600', isLandscape && 'text-vertical']">
      {{ card.setNumber }}-{{ card.number }} &middot; {{ card.Rarity?.name ? useStartCase(card.Rarity.name) : '' }}
    </p>
    <p :class="['text-[6pt] text-gray-600', isLandscape && 'text-vertical']">
      For personal use only
    </p>
  </div>
</template>
