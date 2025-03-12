<script lang="ts" setup>
function printPage() {
  window.print();
}

const slots = useSlots();
</script>

<template>
  <div class="mb-4 print:hidden">
    <div v-if="slots.top" class="mt-12 content-width page-padding">
      <slot name="top"/>
    </div>

    <div class="mt-12 mb-8 flex justify-center">
      <UiButton :outlined="false" label="Print Pages" @click="printPage"/>
    </div>

    <div class="flex gap-12 justify-center">
      <div v-if="slots.side" class="w-64">
        <slot name="side"/>
      </div>
      <div>
        <slot/>
      </div>
    </div>
  </div>

  <div class="hidden print:flex flex-col items-center">
    <slot name="printable"/>
  </div>
</template>
