<script lang="ts" setup>
import type {OPTION} from '~/app.types'

const props = defineProps<{
  label: string;
  options: OPTION[];
}>()

const model = defineModel();

function selectAll() {
  model.value = props.options.map(option => option.value);
}

function unselectAll() {
  model.value = []
}
</script>

<template>
  <div>
    <div class="flex justify-between items-center mb-1 pb-0.5 pr-2 border-b border-gray-300">
      <p class="font-bold">{{ label }}</p>

      <div class="flex items-center gap-2">
        <button class="text-xs hover:text-primary cursor-pointer" @click="selectAll">select all</button>
        <button class="text-xs hover:text-primary cursor-pointer" @click="unselectAll">unselect all</button>
      </div>
    </div>

    <div class="pl-3">
      <label v-for="option in options" class="flex gap-2 items-center hover:text-primary cursor-pointer">
        <Checkbox v-model="model" :value="option.value" size="small"/>
        {{ option.label }}
      </label>
    </div>
  </div>
</template>
