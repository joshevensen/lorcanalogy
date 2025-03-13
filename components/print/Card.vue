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
</script>

<template>
  <div :class="`w-[2.5in] h-[3.5in] relative border-[0.5px] border-gray-400 ${background}`">
    <!-- Ink Cost-->
    <div class="absolute top-0 left-0">
      <PrintCardIcon
          v-if="card.inkable"
          :value="card.cost"
          alt="Inkable Cost"
          heightClass="h-[0.4in]"
          widthClass="w-[0.4in]"
          image="/icons/card-parts/inkable.png"
      />
      <PrintCardIcon
          v-else
          :value="card.cost"
          alt="Uninkable Cost"
          heightClass="h-[0.3in]"
          widthClass="w-[0.3in]"
          class="m-[0.05in]"
          image="/icons/card-parts/uninkable.png"
      />
    </div>

    <!-- Landscape -->
    <div v-if="isLandscape"
         class="h-[2.5in] w-[3.5in] p-px pr-[3px] absolute left-[100%] bottom-0 transform-[rotate(-90deg)] origin-bottom-left flex flex-col">
      <PrintCardHeader class="h-[0.4in] shrink-0 pr-[0.45in] pl-[0.1in]" :card="card"/>
      <PrintCardName class="h-[0.75in] shrink" :card="card"/>
      <PrintCardInkBar class="h-[0.3in] shrink-0" :card="card"/>
      <PrintCardClassifications class="h-[0.15in] shrink-0" :card="card"/>
      <PrintCardText class="grow-1" :card="card"/>
      <PrintCardFooter class="h-[0.25in] shrink-0" :card="card"/>
    </div>

    <!-- Portrait -->
    <div v-else class="h-full flex flex-col p-px">
      <PrintCardHeader class="h-[0.4in] shrink-0 pl-[0.5in]" :card="card"/>
      <PrintCardName class="h-[1.25in] shrink" :card="card"/>
      <PrintCardInkBar class="h-[0.3in] shrink-0" :card="card"/>
      <PrintCardClassifications class="h-[0.15in] shrink-0" :card="card"/>
      <PrintCardText class="grow-1" :card="card"/>
      <PrintCardFooter class="h-[0.25in] shrink-0" :card="card"/>
    </div>
  </div>
</template>
