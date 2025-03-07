<script lang="ts" setup>
definePageMeta({title: "Glossary"})

const {data: terms} = await useAsyncData('terms', () => {
  return queryCollection('terms').all()
})
</script>

<template>
  <div v-if="terms" class="mt-12 space-y-4">
    <UiPanel
      v-for="(item, index) in terms"
      :key="item.label + index"
      :header="item.label"
    >
      <p>{{ item.definition }}</p>
    </UiPanel>
  </div>
</template>
