<script lang="ts" setup>
import type {MAPPED_CARD} from "~/data/data.types";

const props = defineProps<{
  card: MAPPED_CARD,
}>()

const {convertTextToHTML} = useCards();

const htmlText = computed(() => {
  return convertTextToHTML(props.card.text)
})

const firstInkDark = computed(() => {
  if(props.card.firstInk === 'Amber') return 'bg-amber-600';
  if(props.card.firstInk === 'Amethyst') return 'bg-purple-900';
  if(props.card.firstInk === 'Emerald') return 'bg-emerald-700';
  if(props.card.firstInk === 'Ruby') return 'bg-red-700';
  if(props.card.firstInk === 'Sapphire') return 'bg-blue-600';
  if(props.card.firstInk === 'Steel') return 'bg-gray-500';

  return 'bg-gray-300';
})

const secondInkDark = computed(() => {
  if(props.card.secondInk === 'Amber') return 'bg-amber-600';
  if(props.card.secondInk === 'Amethyst') return 'bg-purple-900';
  if(props.card.secondInk === 'Emerald') return 'bg-emerald-700';
  if(props.card.secondInk === 'Ruby') return 'bg-red-700';
  if(props.card.secondInk === 'Sapphire') return 'bg-blue-600';
  if(props.card.secondInk === 'Steel') return 'bg-gray-500';

  return 'bg-gray-300';
})

const firstInkLight = computed(() => {
  if(props.card.firstInk === 'Amber') return 'bg-amber-300';
  if(props.card.firstInk === 'Amethyst') return 'bg-purple-200';
  if(props.card.firstInk === 'Emerald') return 'bg-emerald-200';
  if(props.card.firstInk === 'Ruby') return 'bg-red-200';
  if(props.card.firstInk === 'Sapphire') return 'bg-blue-200';
  if(props.card.firstInk === 'Steel') return 'bg-gray-300';

  return 'bg-gray-100';
})

const secondInkLight = computed(() => {
  if(props.card.secondInk === 'Amber') return 'bg-amber-200';
  if(props.card.secondInk === 'Amethyst') return 'bg-purple-300';
  if(props.card.secondInk === 'Emerald') return 'bg-emerald-200';
  if(props.card.secondInk === 'Ruby') return 'bg-red-300';
  if(props.card.secondInk === 'Sapphire') return 'bg-blue-200';
  if(props.card.secondInk === 'Steel') return 'bg-gray-300';

  return 'bg-gray-100';
})


// TODO: Create Location card
// TODO: Fix icons
</script>

<template>
  <div class="w-[2.5in] h-[3.5in] relative pt-[0.125in] px-px pb-[.25in] flex flex-col overflow-hidden border-[0.5px] border-gray-400">
<!--    Ink-->
    <div class="absolute -top-1 -left-1 w-[0.5in] h-[0.5in] flex justify-center items-center">
      <PrintCardIcon class="absolute z-0 top-0 left-0" :value="card.cost" :image="card.inkable ? '/icons/card-parts/inkable.svg' : '/icons/card-parts/uninkable.svg'" alt=""/>
    </div>

<!--    Type and Name -->
    <div class="h-[1.25in] flex flex-col items-center px-[0.125in]">
      <p class="mt-1 mb-4 text-xs uppercase">{{ card.type }}</p>
      <p class="text-xl font-bold leading-none text-center">{{ card.name }}</p>
      <p class="text-sm">{{ card.version }}</p>
    </div>

<!--    Ink & Stat Bar-->
    <div class="shrink-0 relative h-[0.3125in] flex justify-between items-center px-[0.125in] text-white">
      <div :class="`absolute inset-0 flex justify-end ${firstInkDark}`">
        <div v-if="card.isDualInk" :class="`w-1/2 ${secondInkDark}`"></div>
      </div>

      <p class="relative z-10 text-sm">{{ card.inks }}</p>

      <div class="absolute -top-3 right-4 z-10 flex items-center">
        <PrintCardIcon :value="card.strength" image="/icons/card-parts/strength.svg" alt=""/>
        <PrintCardIcon :value="card.willpower" image="/icons/card-parts/willpower.svg" alt=""/>
        <PrintCardIcon :value="card.moveCost" image="/icons/card-parts/move.svg" alt=""/>
      </div>
    </div>

<!--    Classification-->
    <div class="relative shrink-0 basis-[0.2in] flex items-center px-[0.125in]">
      <div :class="`absolute inset-0 flex justify-end ${firstInkLight}`">
        <div v-if="card.isDualInk" :class="`w-1/2 ${secondInkLight}`"></div>
      </div>

      <p class="relative z-10 font-semibold text-[8pt]">{{ card.classifications }}</p>
    </div>

<!--    Text-->
    <div class="relative py-[0.125in] pl-[0.0625in] pr-[0.25in] flex-grow">
        <div class="space-y-2 text-[7pt]" v-html="htmlText"></div>
      <div class="absolute inset-y-0 right-0 w-[0.25in] flex flex-col justify-center gap-2 items-center">
        <img v-for="index in Number(card.lore)" :key="index" src="/icons/card-parts/lore.svg" alt="Lore"/>
      </div>
    </div>

<!--    Footer-->
    <div class="absolute bottom-0 inset-x-0 p-[0.0625in] flex justify-between">
      <p class="flex items-center gap-1 text-[7pt]" style="color: #999">{{ card.id }} - {{ card.rarity }}</p>
      <p class="text-[7pt]" style="color: #999">For personal use only</p>
    </div>
  </div>
</template>
