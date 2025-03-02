<script lang="ts" setup>
import 'primeicons/primeicons.css'

const {siteDescription} = useAppConfig();

useHead({
  title: 'Lorcanalogy',
  meta: [
    {name: 'description', content: siteDescription}
  ],
  htmlAttrs: {
    class: 'bg-lorcana-parchment-100 text-lorcana-kelp'
  }
})
</script>

<template>
  <NuxtRouteAnnouncer/>
  <NuxtPage/>
</template>
