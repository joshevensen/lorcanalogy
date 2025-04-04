<script lang="ts" setup>
const visible = defineModel('visible', {required: true, default: false});

withDefaults(defineProps<{
  header: string,
  position?: 'left' | 'right'
}>(), {
  position: 'right'
})
</script>

<template>
  <Drawer v-model:visible="visible" :header :position blockScroll class="w-[90%]! max-w-96!">
    <slot/>
  </Drawer>
</template>
