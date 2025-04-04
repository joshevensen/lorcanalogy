<script lang="ts" setup>
const props = withDefaults(defineProps<{
  label?: string,
  description?: string;
  position?: 'top' | 'left' | 'right',
}>(), {
  position: 'top'
})

let classes = 'flex'

if (props.position === 'top') classes += ' flex-col gap-1'
if (props.position === 'left') classes += ' items-center gap-2'
if (props.position === 'right') classes += ' flex-row-reverse items-center justify-end gap-2'
</script>

<template>
  <div>
    <label :class="classes">
      <span class="font-semibold text-sm">{{ label }}</span>
      <slot/>
    </label>
    <p v-if="description" class="text-xs mt-1">{{ description }}</p>
  </div>
</template>
