<script lang="ts" setup>
import 'primeicons/primeicons.css'

useHead({
  title: 'Lorcanalogy',
  meta: [
    {name: 'description', content: 'An unofficial guide to Disney Lorcana TCG'}
  ],
})

const visible = ref(false)
</script>

<template>
  <NuxtRouteAnnouncer/>
  <NuxtPage/>

  <Drawer v-model="visible" position="bottom" style="height: auto">
    Lorcanalogy uses trademarks and/or copyrights associated with Disney Lorcana TCG, used under
    <a href="https://cdn.ravensburger.com/lorcana/community-code-en" target="_blank">Ravensburger’s Community Code
      Policy</a>. We are expressly prohibited from charging you to use or access this content. Lorcanalogy is not
    published, endorsed, or specifically approved by Disney or Ravensburger. For more information about Disney Lorcana
    TCG, visit <a href="https://www.disneylorcana.com/en-US/" target="_blank">https://www.disneylorcana.com/en-US/</a>.
  </Drawer>
</template>
