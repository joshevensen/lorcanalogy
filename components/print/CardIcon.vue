<script setup lang="ts">
defineProps<{
  value: string | number | null;
  image: string;
  alt: string;
}>()
</script>

<template>
  <div v-if="value" class="relative w-[0.5in] h-[0.5in] flex justify-center items-center">
    <img
        class="absolute z-0 w-[0.5in] h-[0.5in] top-0 left-1/2 -translate-x-1/2"
        :src="image"
        :alt="alt"
    />
    <p class="relative z-10 text-[0.125in] text-gray-800 font-bold">{{ value }}</p>
  </div>
</template>

