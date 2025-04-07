<script lang="ts" setup>
import {type Card, Ink} from "@prisma/client";

const props = defineProps<{
  card: Card,
}>()

const isLandscape = props.card.layout === 'landscape';

const firstInkClasses = computed(() => {
  const ink = props.card.ink1;

  if (ink === Ink.amber) return 'bg-lorcana-amber/40';
  if (ink === Ink.amethyst) return 'bg-lorcana-amethyst/40';
  if (ink === Ink.emerald) return 'bg-lorcana-emerald/40';
  if (ink === Ink.ruby) return 'bg-lorcana-ruby/40';
  if (ink === Ink.sapphire) return 'bg-lorcana-sapphire/40';
  if (ink === Ink.steel) return 'bg-lorcana-steel/50';

  return 'bg-gray-100';
})

const secondInkClasses = computed(() => {
  const ink = props.card.ink2;

  if (ink === Ink.amber) return 'bg-lorcana-amber/40';
  if (ink === Ink.amethyst) return 'bg-lorcana-amethyst/40';
  if (ink === Ink.emerald) return 'bg-lorcana-emerald/40';
  if (ink === Ink.ruby) return 'bg-lorcana-ruby/40';
  if (ink === Ink.sapphire) return 'bg-lorcana-sapphire/40';
  if (ink === Ink.steel) return 'bg-lorcana-steel/50';

  return 'bg-gray-100';
})
</script>

<template>
  <div class="relative flex items-center bg-white">
    <div class="absolute inset-0 flex justify-stretch">
      <div :class="`w-full ${firstInkClasses}`"></div>
      <div v-if="card.ink2" :class="`w-full ${secondInkClasses}`"></div>
    </div>

    <p :class="['relative z-10 font-semibold text-[6pt]', isLandscape && 'text-vertical']">{{
        card.classifications.join(', ')
      }}</p>
  </div>
</template>
