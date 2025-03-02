<script lang="ts" setup>
defineProps<{ hideTCG?: boolean }>()
</script>

<template>
  <em>Disney Lorcana</em>
  <template v-if="!hideTCG">TCG</template>
</template>
