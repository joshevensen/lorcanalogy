<script lang="ts" setup>
const route = useRoute()

const { data: navigation } = await useAsyncData('navigation', () => {
  return queryCollectionNavigation('content')
})

const { data: page } = await useAsyncData(route.path, () => {
  return queryCollection('content').path(route.path).first()
})

const {data: siblings} = await useAsyncData('surround', () => {
  return queryCollectionItemSurroundings('content', route.path)
})

if(page.value) {
  console.log('page', page.value);

  page.value.seo.title = page.value.title + ' | Lorcanalogy'
  useSeoMeta(page.value.seo)
}
</script>

<template>
  <header class="fixed top-0 left-0 right-0 py-2 bg-white border-b border-surface-200 text-center">
    <NuxtLink to="/">Lorcanalogy</NuxtLink>
  </header>

  <div v-if="page" class="pt-20 pb-16 px-6 max-w-2xl mx-auto">
    <article class="mb-10">
      <h1 class="text-5xl text-center">{{ page.title }}</h1>

      <Panel class="mt-8" collapsed header="Table of Contents" toggleable>
        <nav>
          <ul v-if="page.body?.toc?.links">
            <li v-for="item in page.body.toc.links" :key="item.id">
              <NuxtLink :to="`#${item.id}`">{{ item.text }}</NuxtLink>
            </li>
          </ul>
        </nav>
      </Panel>

      <ContentRenderer :value="page"/>
    </article>

    <footer class="fixed bottom-0 right-0 left-0 py-2 px-4 bg-white border-t border-surface-200 flex justify-between">
      <NuxtLink v-if="siblings?.[0]" :to="siblings[0].path">
        ← {{ siblings[0].title }}
      </NuxtLink>
      <NuxtLink v-if="siblings?.[1]" :to="siblings[1].path" class="ml-auto">
        {{ siblings[1].title }} →
      </NuxtLink>
    </footer>
  </div>

  <template v-else>
    <div class="empty-page">
      <h1>Page Not Found</h1>
      <p>Oops! The content you're looking for doesn't exist.</p>
      <NuxtLink to="/">Go back home</NuxtLink>
    </div>
  </template>
</template>
