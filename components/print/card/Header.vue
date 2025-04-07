<script lang="ts" setup>
import type {Card} from "@prisma/client";

const props = defineProps<{
  card: Card,
}>()

const isLandscape = props.card.layout === 'landscape';
</script>

<template>
  <div :class="['flex justify-end items-center', isLandscape && 'flex-col']">
    <p :class="['text-xs uppercase font-bold', isLandscape && 'text-vertical']">
      {{ card.type }}
    </p>
  </div>
</template>
