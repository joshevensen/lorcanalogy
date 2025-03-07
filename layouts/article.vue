<script lang="ts" setup>
const route = useRoute()

const {data: siblings, refresh} = await useAsyncData('surround', () => {
  return queryCollectionItemSurroundings('articles', route.path)
})

watch(() => route.path, () => {
  refresh();
})
</script>

<template>
  <LayoutHeader/>

  <main class="pt-10 pb-12">
    <slot/>
  </main>

  <footer class="header-footer bottom-0 h-12 flex items-center px-4 border-t">
    <div class="content-width w-full grid grid-cols-2 gap-2">
      <div class="flex items-center text-sm">
        <UiLink v-if="siblings?.[0]" :to="siblings[0].path">← {{ siblings[0].title }}</UiLink>
      </div>

      <div class="flex justify-end items-center text-sm">
        <UiLink v-if="siblings?.[1]" :to="siblings[1].path">{{ siblings[1].title }} →</UiLink>
      </div>
    </div>
  </footer>
</template>
