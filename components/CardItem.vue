<script lang="ts" setup="">
import type {CARD} from "~/data/data.types";

const props = defineProps<{
  card: CARD;
}>()

const inkIcon = computed(() => {
  if (props.card.ink === 'Amber') return '/icons/ink/amber.png';
  if (props.card.ink === 'Amethyst') return '/icons/ink/amethyst.png';
  if (props.card.ink === 'Emerald') return '/icons/ink/emerald.png';
  if (props.card.ink === 'Ruby') return '/icons/ink/ruby.png';
  if (props.card.ink === 'Sapphire') return '/icons/ink/sapphire.png';
  if (props.card.ink === 'Steel') return '/icons/ink/steel.png';

  return null;
})

const type = computed(() => {
  return props.card.type.join(' ')
})

const classifications = computed(() => {
  return props.card.classifications?.join(', ')
})

const rarityIcon = computed(() => {
  if (props.card.rarity === 'Common') return '/icons/rarity/common.svg';
  if (props.card.rarity === 'Uncommon') return '/icons/rarity/uncommon.svg';
  if (props.card.rarity === 'Rare') return '/icons/rarity/super-rare.svg';
  if (props.card.rarity === 'Super_rare') return '/icons/rarity/super-rare.svg';
  if (props.card.rarity === 'Legendary') return '/icons/rarity/legendary.svg';
  if (props.card.rarity === 'Enchanted') return '/icons/rarity/enchanted.svg';

  return null;
})
</script>

<template>
  <div class="flex items-center gap-4 py-4 px-1">
    <div class="flex items-center gap-1">
      <!--      Ink -->
      <div v-if="inkIcon">
        <NuxtImg :src="inkIcon" width="50px"/>
      </div>

      <!--      Inkwell-->
      <div class="h-10 w-10 relative flex items-center justify-center">
        <div v-if="card.inkwell" class="absolute -inset-2 w-14 h-14 flex items-center justify-center">
          <NuxtImg src="/icons/inkwell.svg" width="56px"/>
        </div>
        <div v-else class="absolute inset-0 w-10 flex items-center justify-center">
          <NuxtImg src="/icons/inkcost.svg" width="36px"/>
        </div>
        <p class="relative z-10 text-lorcana-parchment-100">{{ card.cost }}</p>
      </div>
    </div>

    <div>
      <p class="text-2xl m-0 leading-none"><strong>{{ card.name }}</strong> <span v-if="card.version">| {{
          card.version
        }}</span></p>
      <p class="italic">
        <span class="uppercase">{{ type }}</span>
        <template v-if="classifications"> &middot; {{ classifications }}</template>
      </p>
    </div>

    <div class="ml-auto">
      <NuxtImg v-if="rarityIcon" :src="rarityIcon" width="20px"/>
    </div>
  </div>
</template>
