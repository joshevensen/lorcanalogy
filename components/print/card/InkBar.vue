<script lang="ts" setup>
import type {MAPPED_CARD} from "~/app.types";

const props = defineProps<{
  card: MAPPED_CARD,
}>()

const isLandscape = props.card.layout === 'landscape';

const firstInkClasses = computed(() => {
  const ink = props.card.firstInk;

  if (ink === 'Amber') return 'bg-lorcana-amber';
  if (ink === 'Amethyst') return 'bg-lorcana-amethyst';
  if (ink === 'Emerald') return 'bg-lorcana-emerald';
  if (ink === 'Ruby') return 'bg-lorcana-ruby';
  if (ink === 'Sapphire') return 'bg-lorcana-sapphire';
  if (ink === 'Steel') return 'bg-lorcana-steel';

  return 'bg-gray-300';
})

const secondInkClasses = computed(() => {
  const ink = props.card.secondInk;

  if (ink === 'Amber') return 'bg-lorcana-amber';
  if (ink === 'Amethyst') return 'bg-lorcana-amethyst';
  if (ink === 'Emerald') return 'bg-lorcana-emerald';
  if (ink === 'Ruby') return 'bg-lorcana-ruby';
  if (ink === 'Sapphire') return 'bg-lorcana-sapphire';
  if (ink === 'Steel') return 'bg-lorcana-steel';

  return 'bg-gray-300';
})
</script>

<template>
  <div class="relative flex justify-between items-center text-white">
    <div class="absolute inset-0 flex justify-stretch">
      <div :class="`w-full ${firstInkClasses}`"></div>
      <div v-if="card.isDualInk" :class="`w-full ${secondInkClasses}`"></div>
    </div>

    <p :class="['relative z-10 w-full text-[0.1375in]', {'text-center': card.moveCost}, isLandscape && 'text-vertical']">
      {{ card.inks }}
    </p>

    <div
      v-if="card.moveCost"
      :class="['absolute z-10 flex items-center', isLandscape ? '-left-1 bottom-[0.0625in] transform-[rotate(-90deg)]' : '-top-1.5 left-[0.0625in]']"
    >
      <PrintCardIcon
        :value="card.moveCost"
        alt="Move Cost"
        heightClass="h-[0.4in]"
        image="/icons/card-parts/move-cost.png"
        widthClass="w-[0.3in]"
      />
    </div>

    <div :class="['absolute z-10 flex items-center', isLandscape ? '-left-1 top-[0.0625in] transform-[rotate(-90deg)]' : '-top-1.5 right-[0.0625in]']">
      <PrintCardIcon
        v-if="card.strength"
        :value="card.strength"
        alt="Strength"
        heightClass="h-[0.4in]"
        image="/icons/card-parts/strength.png"
        widthClass="w-[0.4in]"
      />
      <PrintCardIcon
        v-if="card.willpower"
        :value="card.willpower"
        alt="Willpower"
        heightClass="h-[0.4in]"
        image="/icons/card-parts/willpower.png"
        widthClass="w-[0.33in]"
      />
    </div>
  </div>
</template>
