<script lang="ts" setup>

import {useStartCase} from "#imports";
</script>

<template>
  <UiDrawer v-model:visible="showColumns" header="Toggle Columns">
    <div class="space-y-3">
      <UiField v-for="key in columnKeys" :key="key" :label="useStartCase(key)" position="right">
        <UiCheckbox v-model="columns[key as keyof typeof columns]"/>
      </UiField>
    </div>
  </UiDrawer>
</template>
