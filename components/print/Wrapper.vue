<script lang="ts" setup>
function printPage() {
  window.print();
}
</script>

<template>
  <div class="mb-4 print:hidden">
    <slot name="top"/>

    <div class="mt-12 mb-8 flex justify-center">
      <UiButton :outlined="false" label="Print Pages" @click="printPage"/>
    </div>

    <slot/>
  </div>

  <div class="hidden print:flex flex-col items-center">
    <slot name="printable"/>
  </div>
</template>
