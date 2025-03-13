<script lang="ts" setup>
import type {MAPPED_CARD} from "~/data/data.types";

const props = defineProps<{
  card: MAPPED_CARD,
}>()

const firstInk = props.card.firstInk;
const secondInk = props.card.secondInk;

const firstInkLight = computed(() => {
  if (firstInk === 'Amber') return 'bg-lorcana-amber/40';
  if (firstInk === 'Amethyst') return 'bg-lorcana-amethyst/40';
  if (firstInk === 'Emerald') return 'bg-lorcana-emerald/40';
  if (firstInk === 'Ruby') return 'bg-lorcana-ruby/40';
  if (firstInk === 'Sapphire') return 'bg-lorcana-sapphire/40';
  if (firstInk === 'Steel') return 'bg-lorcana-steel/50';

  return 'bg-gray-100';
})

const secondInkLight = computed(() => {
  if (secondInk === 'Amber') return 'bg-lorcana-amber/40';
  if (secondInk === 'Amethyst') return 'bg-lorcana-amethyst/40';
  if (secondInk === 'Emerald') return 'bg-lorcana-emerald/40';
  if (secondInk === 'Ruby') return 'bg-lorcana-ruby/40';
  if (secondInk === 'Sapphire') return 'bg-lorcana-sapphire/40';
  if (secondInk === 'Steel') return 'bg-lorcana-steel/50';

  return 'bg-gray-100';
})
</script>

<template>
  <div class="shrink-0 relative h-[0.125in] flex items-center px-[0.1in] bg-white border-b-4 border-white">
    <div class="absolute inset-0 flex justify-stretch">
      <div :class="`w-full ${firstInkLight}`"></div>
      <div v-if="card.isDualInk" :class="`w-full ${secondInkLight}`"></div>
    </div>

    <p class="relative z-10 font-semibold text-[6pt]">{{ card.classifications }}</p>
  </div>
</template>
