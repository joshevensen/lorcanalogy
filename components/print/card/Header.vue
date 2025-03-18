<script lang="ts" setup>
import type {MAPPED_CARD} from "~/app.types";

const props = defineProps<{
  card: MAPPED_CARD,
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
