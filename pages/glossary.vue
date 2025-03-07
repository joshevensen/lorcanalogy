<script lang="ts" setup>
import Logo from "~/components/Logo.vue";

const {data: terms} = await useAsyncData('terms', () => {
  return queryCollection('terms').all()
})
</script>

<template>
  <LayoutHeader/>

  <main class="content-width page-padding">
    <Logo small/>
    <h1 class="content-title">Glossary</h1>

    <div v-if="terms" class="mt-12 mb-8 space-y-4">
      <UiPanel
        v-for="(item, index) in terms"
        :key="item.label + index"
        :header="item.label"
      >
        <p>{{ item.definition }}</p>
      </UiPanel>
    </div>

    <Disclaimer/>
  </main>
</template>
