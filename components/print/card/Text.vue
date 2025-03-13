<script lang="ts" setup>
import type {MAPPED_CARD} from "~/data/data.types";

defineProps<{
  card: MAPPED_CARD,
}>()

const {convertTextToHTML} = useCards();
</script>

<template>
  <div class="grow-1 relative py-[0.0625in] pl-[0.1in] pr-[0.25in]">
    <div class="space-y-1 text-[6.5pt]" v-html="convertTextToHTML(card.text)"></div>
    <div class="absolute inset-y-0 right-0 w-[0.25in] flex flex-col justify-center gap-1 items-center">
      <img
        v-for="index in Number(card.lore)"
        :key="index"
        alt="Lore"
        class="w-[0.125in]"
        src="/icons/card-parts/lore.png"
      />
    </div>
  </div>
</template>
