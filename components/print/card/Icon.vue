<script setup lang="ts">
withDefaults(defineProps<{
  value: string | number | null;
  image: string;
  alt: string;
  widthClass?: string;
  heightClass?: string;
}>(), {
  widthClass: 'w-[0.5in]',
  heightClass: 'h-[0.5in]',
})
</script>

<template>
  <div v-if="value" :class="`relative ${widthClass} ${heightClass} flex justify-center items-center`">
    <img
      :class="`absolute z-0 ${widthClass} ${heightClass} top-0 left-1/2 -translate-x-1/2`"
        :src="image"
        :alt="alt"
    />
    <p class="relative z-10 text-[0.125in] text-gray-800 font-bold">{{ value }}</p>
  </div>
</template>
