<script lang="ts" setup>
const slots = useSlots();
</script>

<template>
  <div class="mb-4 print:hidden">
    <div v-if="slots.top" class="content-width page-padding">
      <slot name="top"/>
    </div>

    <div class="flex gap-12 justify-center">
      <div>
        <slot/>
      </div>
    </div>
  </div>

  <div class="hidden print:flex flex-col items-center">
    <slot name="printable"/>
  </div>
</template>
