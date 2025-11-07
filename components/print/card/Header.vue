<script lang="ts" setup>
import type {Card} from "@prisma/client";

const props = defineProps<{
  card: Card & {
    Types?: Array<{ id: number; name: string }>;
  },
}>()

const isLandscape = computed(() => {
  return props.card.Types?.some(type => type.name.toLowerCase() === 'location') ?? false;
});
</script>

<template>
  <div :class="['flex justify-end items-center', isLandscape && 'flex-col']">
    <p :class="['text-xs uppercase font-bold', isLandscape && 'text-vertical']">
      {{ card.Types?.[0]?.name || '' }}
    </p>
  </div>
</template>
