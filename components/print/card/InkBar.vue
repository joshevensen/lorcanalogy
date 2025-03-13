<script lang="ts" setup>
import type {MAPPED_CARD} from "~/data/data.types";

const props = defineProps<{
  card: MAPPED_CARD,
}>()

const firstInk = props.card.firstInk;
const secondInk = props.card.secondInk;

const firstInkDark = computed(() => {
  if (firstInk === 'Amber') return 'bg-lorcana-amber';
  if (firstInk === 'Amethyst') return 'bg-lorcana-amethyst';
  if (firstInk === 'Emerald') return 'bg-lorcana-emerald';
  if (firstInk === 'Ruby') return 'bg-lorcana-ruby';
  if (firstInk === 'Sapphire') return 'bg-lorcana-sapphire';
  if (firstInk === 'Steel') return 'bg-lorcana-steel';

  return 'bg-gray-300';
})

const secondInkDark = computed(() => {
  if (secondInk === 'Amber') return 'bg-lorcana-amber';
  if (secondInk === 'Amethyst') return 'bg-lorcana-amethyst';
  if (secondInk === 'Emerald') return 'bg-lorcana-emerald';
  if (secondInk === 'Ruby') return 'bg-lorcana-ruby';
  if (secondInk === 'Sapphire') return 'bg-lorcana-sapphire';
  if (secondInk === 'Steel') return 'bg-lorcana-steel';

  return 'bg-gray-300';
})
</script>

<template>
  <div class="shrink-0 relative h-[0.3in] flex justify-between items-center px-[0.1in] text-white bg-white border-t-4 border-white">
    <div class="absolute inset-0 flex justify-stretch">
      <div :class="`w-full ${firstInkDark}`"></div>
      <div v-if="card.isDualInk" :class="`w-full ${secondInkDark}`"></div>
    </div>

    <div class="absolute -top-1.5 left-[0.0625in] z-10 flex items-center">
      <PrintCardIcon
        :value="card.moveCost"
        alt="Move Cost"
        heightClass="h-[0.4in]"
        image="/icons/card-parts/move-cost.png"
        widthClass="w-[0.3in]"
      />
    </div>

    <p class="relative z-10 w-full text-[0.1375in]">{{ card.inks }}</p>

    <div class="absolute -top-1.5 right-[0.0625in] z-10 flex items-center">
      <PrintCardIcon
        :value="card.strength"
        alt="Strength"
        heightClass="h-[0.4in]"
        image="/icons/card-parts/strength.png"
        widthClass="w-[0.4in]"
      />
      <PrintCardIcon
        :value="card.willpower"
        alt="Willpower"
        heightClass="h-[0.4in]"
        image="/icons/card-parts/willpower.png"
        widthClass="w-[0.33in]"
      />
    </div>
  </div>
</template>
