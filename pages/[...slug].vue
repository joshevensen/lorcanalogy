<script lang="ts" setup>
const route = useRoute()

const { data: navigation } = await useAsyncData('navigation', () => {
  return queryCollectionNavigation('content')
})

const { data: page } = await useAsyncData(route.path, () => {
  return queryCollection('content').path(route.path).first()
})

if(page.value) {
  page.value.seo.title = page.value.title + ' | Lorcanalogy'
  useSeoMeta(page.value.seo)
}
</script>

<template>

  <div v-if="page" class="pt-8 pb-20 px-6">
    <NuxtLink to="/">Back</NuxtLink>

    <nav>
      <ul v-if="navigation">
        <li v-for="item in navigation" :key="item.path">
          <NuxtLink :to="item.path">{{ item.title }}</NuxtLink>
        </li>
      </ul>
    </nav>

    <ContentRenderer :value="page" />
  </div>

  <template v-else>
    <div class="empty-page">
      <h1>Page Not Found</h1>
      <p>Oops! The content you're looking for doesn't exist.</p>
      <NuxtLink to="/public">Go back home</NuxtLink>
    </div>
  </template>
</template>
