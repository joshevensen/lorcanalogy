<script lang="ts" setup>
import {Ink} from "@prisma/client";

const collection = await useCollection();

const props = defineProps<{
  card: any
}>()

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

  return classes
})

const plainCount = ref(props.card.Collection.length ? props.card.Collection[0].plain : 0)
const foilCount = ref(props.card.Collection.length ? props.card.Collection[0].foil : 0)

watch(plainCount, (newValue) => {
  collection.updateItem(props.card.id, newValue, foilCount.value, null)
})
watch(foilCount, (newValue) => {
  collection.updateItem(props.card.id, plainCount.value, newValue, null)
})
</script>

<template>
  <div class="relative p-2 overflow-hidden hover:bg-slate-50">
    <div :class="`absolute inset-2 bg-center sm:bg-left sm:inset-0 sm:-left-10 bg-[auto_120px] bg-no-repeat ${background}`"></div>

    <div class="grow flex items-center justify-between sm:pl-20">
      <div class="grow">
        <p class="text-xs mb-1 italic text-slate-500">{{ card.type }} &middot; Set {{ card.setId }} &middot;
          <small>#</small>{{ card.number }}</p>
        <div class="sm:flex sm:items-baseline sm:gap-1">
          <p class="text-lg leading-none font-bold">{{ card.name }}<span
            v-if="card.version"
            class="hidden sm:inline"
          >,</span></p>
          <p class="text-xs md:text-sm leading-none">{{ card.version }}</p>
        </div>
      </div>

      <div class="flex flex-col sm:flex-row items-center justify-between gap-2">
        <InputNumber
          v-model="plainCount"
          :max="20"
          :min="0"
          :step="1"
          buttonLayout="horizontal"
          class="bg-white"
          decrementIcon="pi pi-minus"
          incrementIcon="pi pi-plus"
          inputClass="w-7 text-center"
          showButtons
          size="small"
        />

        <InputNumber
          v-model="foilCount"
          :max="20"
          :min="0"
          :step="1"
          buttonLayout="horizontal"
          class="gradient"
          decrementIcon="pi pi-minus"
          incrementIcon="pi pi-plus"
          inputClass="w-7 text-center bg-transparent!"
          showButtons
          size="small"
        />
      </div>
    </div>
  </div>
</template>

<style>
.p-inputnumber-input {
  border-left: none !important;
  border-right: none !important;
  padding: 2px 4px !important;
}

.gradient {
  background: linear-gradient(45deg, rgba(243, 177, 35, 0.2) 10%, rgba(123, 65, 129, 0.2) 25%, rgba(50, 143, 68, 0.2) 40%, rgba(212, 0, 55, 0.2) 60%, rgba(0, 147, 200, 0.2) 75%, rgba(151, 163, 174, 0.2) 90%)
}
</style>
