<script lang="ts" setup>
import {type Card, Ink} from "@prisma/client";

const props = defineProps<{
  card: Card,
}>()

const isLandscape = props.card.layout === 'landscape';

const background = computed(() => {
  const firstInk = props.card.ink1;
  const secondInk = props.card.ink2;
  let classes = '';

  if (firstInk === Ink.amber) {
    if (secondInk) {
      if (secondInk === Ink.amethyst) classes += 'bg-[url(/icons/ink/watermarks/amber-amethyst.png)]';
      if (secondInk === Ink.emerald) classes += 'bg-[url(/icons/ink/watermarks/amber-emerald.png)]';
      if (secondInk === Ink.ruby) classes += 'bg-[url(/icons/ink/watermarks/amber-ruby.png)]';
      if (secondInk === Ink.sapphire) classes += 'bg-[url(/icons/ink/watermarks/amber-sapphire.png)]';
      if (secondInk === Ink.steel) classes += 'bg-[url(/icons/ink/watermarks/amber-steel.png)]';
    } else {
      classes += 'bg-[url(/icons/ink/watermarks/amber.png)]';
    }
  }

  if (firstInk === Ink.amethyst) {
    if (secondInk) {
      if (secondInk === Ink.emerald) classes += 'bg-[url(/icons/ink/watermarks/amethyst-emerald.png)]';
      if (secondInk === Ink.ruby) classes += 'bg-[url(/icons/ink/watermarks/amethyst-ruby.png)]';
      if (secondInk === Ink.sapphire) classes += 'bg-[url(/icons/ink/watermarks/amethyst-sapphire.png)]';
      if (secondInk === Ink.steel) classes += 'bg-[url(/icons/ink/watermarks/amethyst-steel.png)]';

    } else {
      classes += 'bg-[url(/icons/ink/watermarks/amethyst.png)]';
    }
  }

  if (firstInk === Ink.emerald) {
    if (secondInk) {
      if (secondInk === Ink.ruby) classes += 'bg-[url(/icons/ink/watermarks/emerald-ruby.png)]';
      if (secondInk === Ink.sapphire) classes += 'bg-[url(/icons/ink/watermarks/emerald-sapphire.png)]';
      if (secondInk === Ink.steel) classes += 'bg-[url(/icons/ink/watermarks/emerald-steel.png)]';

    } else {
      classes += 'bg-[url(/icons/ink/watermarks/emerald.png)]';
    }
  }

  if (firstInk === Ink.ruby) {
    if (secondInk) {
      if (secondInk === Ink.sapphire) classes += 'bg-[url(/icons/ink/watermarks/ruby-sapphire.png)]';
      if (secondInk === Ink.steel) classes += 'bg-[url(/icons/ink/watermarks/ruby-steel.png)]';

    } else {
      classes += 'bg-[url(/icons/ink/watermarks/ruby.png)]';
    }
  }

  if (firstInk === Ink.sapphire) {
    if (secondInk) {
      if (secondInk === Ink.steel) classes += 'bg-[url(/icons/ink/watermarks/sapphire-steel.png)]';

    } else {
      classes += 'bg-[url(/icons/ink/watermarks/sapphire.png)]';
    }
  }

  if (firstInk === Ink.steel) {
    classes += 'bg-[url(/icons/ink/watermarks/steel.png)]';
  }

  classes += ' bg-center bg-contain bg-no-repeat';
  return classes
})
</script>

<template>
  <div class="w-[2.5in] h-[3.5in] relative border-[0.5px] border-gray-400">
    <!-- Background -->
    <div :class="[`absolute inset-2  ${background}`, isLandscape && 'transform-[rotate(-90deg)]']"></div>

    <!-- Ink Cost-->
    <div class="absolute top-0 left-0">
      <PrintCardIcon
        v-if="card.inkable"
        :value="card.cost"
        alt="Inkable Cost"
        heightClass="h-[0.4in]"
        image="/icons/card-parts/inkable.png"
        widthClass="w-[0.4in]"
      />
      <PrintCardIcon
        v-else
        :value="card.cost"
        alt="Uninkable Cost"
        class="m-[0.05in]"
        heightClass="h-[0.3in]"
        image="/icons/card-parts/uninkable.png"
        widthClass="w-[0.3in]"
      />
    </div>

    <!-- Card -->
    <div :class="['h-full w-full flex', isLandscape ? 'py-px' : 'flex-col px-px']">
      <PrintCardHeader
        :card="card"
        :class="['shrink-0', isLandscape ? 'w-[0.4in] pb-[0.1in] pt-[0.5in]' : 'h-[0.4in] pr-[0.1in] pl-[0.5in]']"
      />
      <PrintCardName
        :card="card"
        :class="['shrink', isLandscape ? 'w-[0.75in]' : 'h-[1in] px-[0.1in]']"
      />
      <PrintCardInkBar
        :card="card"
        :class="['shrink-0 border-white', isLandscape ? 'w-[0.3in] py-[0.1in] border-l-4' : 'h-[0.3in] px-[0.1in] border-t-4']"
      />
      <PrintCardClassifications
        :card="card"
        :class="['shrink-0 border-white', isLandscape ? 'w-[0.15in] py-[0.1in] border-r-4' : 'h-[0.15in] px-[0.1in] border-b-4']"
      />
      <PrintCardText
        :card="card"
        :class="['grow-1', isLandscape ? 'px-[0.0625in] pb-[0.1in] pt-[0.25in]' : 'py-[0.0625in] pl-[0.1in] pr-[0.25in]']"
      />
      <PrintCardFooter
        :card="card"
        :class="['shrink-0', isLandscape ? 'w-[0.25in] py-[0.1in]' : 'h-[0.25in] px-[0.1in]']"
      />
    </div>
  </div>
</template>
