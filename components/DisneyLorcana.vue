<script lang="ts" setup>
defineProps<{ hideTCG?: boolean }>()
</script>

<template>
  <em>Disney Lorcana</em>&nbsp;<template v-if="!hideTCG">TCG</template>
</template>
