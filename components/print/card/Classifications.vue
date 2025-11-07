<script lang="ts" setup>
import {type Card} from "@prisma/client";

const props = defineProps<{
  card: Card & {
    Inks?: Array<{ id: number; name: string }>;
    Classifications?: Array<{ id: number; name: string }>;
    Types?: Array<{ id: number; name: string }>;
  },
}>()

const isLandscape = computed(() => {
  return props.card.Types?.some(type => type.name.toLowerCase() === 'location') ?? false;
});

const firstInkClasses = computed(() => {
  const ink = props.card.Inks?.[0]?.name;

  if (ink === 'amber') return 'bg-lorcana-amber/40';
  if (ink === 'amethyst') return 'bg-lorcana-amethyst/40';
  if (ink === 'emerald') return 'bg-lorcana-emerald/40';
  if (ink === 'ruby') return 'bg-lorcana-ruby/40';
  if (ink === 'sapphire') return 'bg-lorcana-sapphire/40';
  if (ink === 'steel') return 'bg-lorcana-steel/50';

  return 'bg-gray-100';
})

const secondInkClasses = computed(() => {
  const ink = props.card.Inks?.[1]?.name;

  if (ink === 'amber') return 'bg-lorcana-amber/40';
  if (ink === 'amethyst') return 'bg-lorcana-amethyst/40';
  if (ink === 'emerald') return 'bg-lorcana-emerald/40';
  if (ink === 'ruby') return 'bg-lorcana-ruby/40';
  if (ink === 'sapphire') return 'bg-lorcana-sapphire/40';
  if (ink === 'steel') return 'bg-lorcana-steel/50';

  return 'bg-gray-100';
})
</script>

<template>
  <div class="relative flex items-center bg-white">
    <div class="absolute inset-0 flex justify-stretch">
      <div :class="`w-full ${firstInkClasses}`"></div>
      <div v-if="card.Inks && card.Inks.length > 1" :class="`w-full ${secondInkClasses}`"></div>
    </div>

    <p :class="['relative z-10 font-semibold text-[6pt]', isLandscape && 'text-vertical']">{{
        card.Classifications?.map(c => c.name).join(', ') || ''
      }}</p>
  </div>
</template>
