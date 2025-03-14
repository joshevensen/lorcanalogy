<script lang="ts" setup>
import type {MAPPED_CARD} from "~/app.types";

const props = defineProps<{
  card: MAPPED_CARD,
}>()

const firstInkClasses = computed(() => {
  const ink = props.card.firstInk;
  if (ink === 'Amber') return 'bg-lorcana-amber/40';
  if (ink === 'Amethyst') return 'bg-lorcana-amethyst/40';
  if (ink === 'Emerald') return 'bg-lorcana-emerald/40';
  if (ink === 'Ruby') return 'bg-lorcana-ruby/40';
  if (ink === 'Sapphire') return 'bg-lorcana-sapphire/40';
  if (ink === 'Steel') return 'bg-lorcana-steel/50';

  return 'bg-gray-100';
})

const secondInkClasses = computed(() => {
  const ink = props.card.secondInk;

  if (ink === 'Amber') return 'bg-lorcana-amber/40';
  if (ink === 'Amethyst') return 'bg-lorcana-amethyst/40';
  if (ink === 'Emerald') return 'bg-lorcana-emerald/40';
  if (ink === 'Ruby') return 'bg-lorcana-ruby/40';
  if (ink === 'Sapphire') return 'bg-lorcana-sapphire/40';
  if (ink === 'Steel') return 'bg-lorcana-steel/50';

  return 'bg-gray-100';
})
</script>

<template>
  <div class="relative flex items-center px-[0.1in] bg-white border-b-4 border-white">
    <div class="absolute inset-0 flex justify-stretch">
      <div :class="`w-full ${firstInkClasses}`"></div>
      <div v-if="card.isDualInk" :class="`w-full ${secondInkClasses}`"></div>
    </div>

    <p class="relative z-10 font-semibold text-[6pt]">{{ card.classifications }}</p>
  </div>
</template>
