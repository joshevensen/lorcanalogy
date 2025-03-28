<script lang="ts" setup>
defineProps<{
  items: any;
}>()

</script>

<template>
  <DataView :rows="34" :value="items" dataKey="id" paginator>
    <template #header>
      <slot name="header"/>
    </template>

    <template #list="{ items }: any">
      <div class="flex flex-col divide-y divide-surface-200">
        <div v-for="item in items" :key="item.id">
          <slot :item="item" name="listItem"></slot>
        </div>
      </div>
    </template>
  </DataView>
</template>
