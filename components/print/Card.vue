<script lang="ts" setup>
import type {CARD} from "~/data/data.types";

defineProps<{
  card: CARD
}>()
</script>

<template>
  <div class="w-[2.5in] h-[3.5in] flex justify-center items-center border-[0.5px] border-gray-400">
    {{ card.name }}
  </div>
</template>
