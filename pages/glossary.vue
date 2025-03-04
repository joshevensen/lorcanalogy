<script lang="ts" setup>
const {data: terms} = await useAsyncData('terms', () => {
  return queryCollection('terms').all()
})
</script>

<template>
  <LayoutHeader/>

  <main class="content-width page-padding">
    <h1 class="content-title mt-10">Glossary</h1>

    <div v-if="terms" class="mt-12 space-y-4">
      <UiPanel
        v-for="(item, index) in terms"
        :key="item.label + index"
        :header="item.label"
      >
        <p>{{ item.definition }}</p>
      </UiPanel>
    </div>
  </main>
</template>
