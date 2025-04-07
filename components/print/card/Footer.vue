<script lang="ts" setup>
import type {Card} from "@prisma/client";
import {useStartCase} from "../../../.nuxt/imports";

const props = defineProps<{
  card: Card,
}>()

const isLandscape = props.card.layout === 'landscape';
</script>

<template>
  <div :class="['flex justify-between items-center', isLandscape && 'flex-col-reverse']">
    <p :class="['flex items-center gap-1 text-[7pt] text-gray-600', isLandscape && 'text-vertical']">
      {{ card.setId }}-{{ card.id }} &middot; {{ useStartCase(card.rarity) }}
    </p>
    <p :class="['text-[6pt] text-gray-600', isLandscape && 'text-vertical']">
      For personal use only
    </p>
  </div>
</template>
