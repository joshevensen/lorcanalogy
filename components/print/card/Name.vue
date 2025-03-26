<script lang="ts" setup>
import type {Card} from "@prisma/client";

const props = defineProps<{
  card: Card,
}>()

const isLandscape = props.card.layout === 'landscape';
</script>

<template>
  <div :class="['flex items-center justify-center', !isLandscape && 'flex-col']">
    <p :class="['text-3xl font-bold leading-none text-center', isLandscape && 'text-vertical']">
      {{ card.name }}
    </p>
    <p :class="['text-sm text-center font-semibold', isLandscape && 'text-vertical']">
      {{ card.version }}
    </p>
  </div>
</template>
