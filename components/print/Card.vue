<script lang="ts" setup>
import type {MAPPED_CARD} from "~/data/data.types";

const props = defineProps<{
  card: MAPPED_CARD,
}>()

const isLandscape = props.card.layout === 'landscape';

const firstInk = props.card.firstInk;
const secondInk = props.card.secondInk;

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
    <PrintCardHeader :card="card" class="h-[0.5in] shrink-0"/>

    <div class="h-[2.75in]">
      <div class="h-full flex flex-col">
        <PrintCardName :card="card"/>
        <PrintCardInkBar :card="card"/>
        <PrintCardClassifictions :card="card"/>
        <PrintCardText :card="card"/>
      </div>
    </div>

    <PrintCardFooter :card="card"/>
  </div>
</template>
