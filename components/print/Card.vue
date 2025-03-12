<script lang="ts" setup>
import type {MAPPED_CARD} from "~/data/data.types";

const props = defineProps<{
  card: MAPPED_CARD,
}>()

const {convertTextToHTML} = useCards();

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

const background = computed(() => {
  let classes = '';

  if (firstInk === 'Amber') {
    if (secondInk) {
      if (secondInk === 'Amethyst') classes += 'bg-[url(/icons/ink/watermarks/amber-amethyst.png)]';
      if (secondInk === 'Emerald') classes += 'bg-[url(/icons/ink/watermarks/amber-emerald.png)]';
      if (secondInk === 'Ruby') classes += 'bg-[url(/icons/ink/watermarks/amber-ruby.png)]';
      if (secondInk === 'Sapphire') classes += 'bg-[url(/icons/ink/watermarks/amber-sapphire.png)]';
      if (secondInk === 'Steel') classes += 'bg-[url(/icons/ink/watermarks/amber-steel.png)]';
    } else {
      classes += 'bg-[url(/icons/ink/watermarks/amber.png)]';
    }
  }

  if (firstInk === 'Amethyst') {
    if (secondInk) {
      if (secondInk === 'Emerald') classes += 'bg-[url(/icons/ink/watermarks/amethyst-emerald.png)]';
      if (secondInk === 'Ruby') classes += 'bg-[url(/icons/ink/watermarks/amethyst-ruby.png)]';
      if (secondInk === 'Sapphire') classes += 'bg-[url(/icons/ink/watermarks/amethyst-sapphire.png)]';
      if (secondInk === 'Steel') classes += 'bg-[url(/icons/ink/watermarks/amethyst-steel.png)]';

    } else {
      classes += 'bg-[url(/icons/ink/watermarks/amethyst.png)]';
    }
  }

  if (firstInk === 'Emerald') {
    if (secondInk) {
      if (secondInk === 'Ruby') classes += 'bg-[url(/icons/ink/watermarks/emerald-ruby.png)]';
      if (secondInk === 'Sapphire') classes += 'bg-[url(/icons/ink/watermarks/emerald-sapphire.png)]';
      if (secondInk === 'Steel') classes += 'bg-[url(/icons/ink/watermarks/emerald-steel.png)]';

    } else {
      classes += 'bg-[url(/icons/ink/watermarks/emerald.png)]';
    }
  }

  if (firstInk === 'Ruby') {
    if (secondInk) {
      if (secondInk === 'Sapphire') classes += 'bg-[url(/icons/ink/watermarks/ruby-sapphire.png)]';
      if (secondInk === 'Steel') classes += 'bg-[url(/icons/ink/watermarks/ruby-steel.png)]';

    } else {
      classes += 'bg-[url(/icons/ink/watermarks/ruby.png)]';
    }
  }

  if (firstInk === 'Sapphire') {
    if (secondInk) {
      if (secondInk === 'Steel') classes += 'bg-[url(/icons/ink/watermarks/sapphire-steel.png)]';

    } else {
      classes += 'bg-[url(/icons/ink/watermarks/sapphire.png)]';
    }
  }

  if (firstInk === 'Steel') {
    classes += 'bg-[url(/icons/ink/watermarks/steel.png)]';
  }

  classes += ' bg-center bg-contain bg-no-repeat';
  return classes
})

// TODO: Create Location card
</script>

<template>
  <div :class="`w-[2.5in] h-[3.5in] relative px-px pb-[.25in] flex flex-col overflow-hidden border-[0.5px] border-gray-400 ${background}`">
    <!--    Header-->
    <div class="h-[0.5in] shrink-0 flex justify-between items-center pr-[0.1in]">
      <div class="flex items-center gap-2">
        <PrintCardIcon
          v-if="card.inkable"
          :value="card.cost"
          alt="Inkable Cost"
          image="/icons/card-parts/inkable.png"
        />
        <PrintCardIcon
          v-else
          :value="card.cost"
          alt="Uninkable Cost"
          heightClass="h-[0.4in]"
          image="/icons/card-parts/uninkable.png"
          widthClass="w-[0.4in]"
        />

        <div class="flex gap-2">
          <div class="w-[0.125in] h-[0.125in] border border-gray-400"></div>
          <div class="w-[0.125in] h-[0.125in] border border-gray-400"></div>
          <div class="w-[0.125in] h-[0.125in] border border-gray-400"></div>
          <div class="w-[0.125in] h-[0.125in] border border-gray-400"></div>
        </div>
      </div>

      <p class="text-xs text-right uppercase font-bold">{{ card.type }}</p>
    </div>

    <!--    Name -->
    <div class="h-[1.25in] flex flex-col items-center justify-center px-[0.1in]">
      <p class="text-3xl font-bold leading-none text-center">{{ card.name }}</p>
      <p class="text-sm text-center font-semibold">{{ card.version }}</p>
    </div>

    <!--    Ink Bar-->
    <div class="shrink-0 relative h-[0.3in] flex justify-between items-center px-[0.1in] text-white bg-white border-t-4 border-white">
      <div class="absolute inset-0 flex justify-stretch">
        <div :class="`w-full ${firstInkDark}`"></div>
        <div v-if="card.isDualInk" :class="`w-full ${secondInkDark}`"></div>
      </div>

      <p class="relative z-10 text-[0.1375in]">{{ card.inks }}</p>

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
        <PrintCardIcon
          :value="card.moveCost"
          alt="Move Cost"
          heightClass="h-[0.4in]"
          image="/icons/card-parts/move-cost.png"
          widthClass="w-[0.3in]"
        />
      </div>
    </div>

    <!--    Classification-->
    <div class="shrink-0 relative basis-[0.125in] flex items-center px-[0.1in] bg-white border-b-4 border-white">
      <div class="absolute inset-0 flex justify-stretch">
        <div :class="`w-full ${firstInkLight}`"></div>
        <div v-if="card.isDualInk" :class="`w-full ${secondInkLight}`"></div>
      </div>

      <p class="relative z-10 font-semibold text-[6pt]">{{ card.classifications }}</p>
    </div>

    <!--    Text-->
    <div class="grow relative py-[0.0625in] pl-[0.1in] pr-[0.25in]">
      <div class="space-y-2 text-[6.5pt]" v-html="convertTextToHTML(card.text)"></div>
      <div class="absolute inset-y-0 right-0 w-[0.25in] flex flex-col justify-center gap-1 items-center">
        <img
          v-for="index in Number(card.lore)"
          :key="index"
          alt="Lore"
          class="w-[0.125in]"
          src="/icons/card-parts/lore.png"
        />
      </div>
    </div>

    <!--    Footer-->
    <div class="absolute bottom-0 inset-x-0 p-[0.0625in] flex justify-between items-center">
      <p class="flex items-center gap-1 text-[7pt] text-gray-600">{{ card.id }} - {{ card.rarity }}</p>
      <p class="text-[6pt] text-gray-600">For personal use only</p>
    </div>
  </div>
</template>
