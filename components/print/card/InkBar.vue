<script lang="ts" setup>
import type {MAPPED_CARD} from "~/app.types";

const props = defineProps<{
  card: MAPPED_CARD,
}>()

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
  <div class="relative flex justify-between items-center px-[0.1in] bg-white border-t-4 border-white text-white">
    <div class="absolute inset-0 flex justify-stretch">
      <div :class="`w-full ${firstInkClasses}`"></div>
      <div v-if="card.isDualInk" :class="`w-full ${secondInkClasses}`"></div>
    </div>

    <div v-if="card.moveCost" class="absolute -top-1.5 left-[0.0625in] z-10 flex items-center">
      <PrintCardIcon
        :value="card.moveCost"
        alt="Move Cost"
        heightClass="h-[0.4in]"
        image="/icons/card-parts/move-cost.png"
        widthClass="w-[0.3in]"
      />
    </div>

    <p :class="['relative z-10 w-full text-[0.1375in]', {'text-center': card.moveCost}]">
      {{ card.inks }}
    </p>

    <div class="absolute -top-1.5 right-[0.0625in] z-10 flex items-center">
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
