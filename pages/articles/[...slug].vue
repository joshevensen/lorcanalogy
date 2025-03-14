<script lang="ts" setup>
const route = useRoute()

definePageMeta({layout: 'article'})

const {data: page} = await useAsyncData(route.path, () => {
  return queryCollection('articles').path(route.path).first()
})

if (!page.value) throw new Error('Page not found');

if (page.value?.seo) {
  page.value.seo.title = page.value.title + ' | Lorcanalogy'
  useSeoMeta(page.value.seo)
}

const updatedAt = formatDate(page.value?.updated);

</script>

<template>
  <article v-if="page" class="content-width page-padding">
    <Logo small/>
    <h1 class="content-title">{{ page.title }}</h1>

    <p v-if="page.updated" class="mt-2 text-sm px-2 text-center">Last updated {{ updatedAt }}</p>
    <p v-if="page.description" class="mt-8 -mb-4 text-lg px-2 text-center">{{ page.description }}</p>

    <UiPanel class="md:hidden mt-12 -mb-8" collapsed header="Table of Contents" toggleable>
      <nav>
        <ul v-if="page.body?.toc?.links">
          <li v-for="item in page.body.toc.links" :key="item.id" class="mt-4">
            <NuxtLink
              :to="`#${item.id}`"
              class="block mb-1 text-lg text-lorcana-parchment-900 hover:text-primary-600"
            >{{ item.text }}
            </NuxtLink>

            <ul v-if="item.children" class="pl-4">
              <li v-for="child in item.children" :key="child.id">
                <NuxtLink
                  :to="`#${child.id}`"
                  class="block py-0.5 text-lorcana-parchment-900 hover:text-primary-600"
                >{{ child.text }}
                </NuxtLink>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    </UiPanel>

    <div class="flex gap-16">
      <div>
        <ContentRenderer :value="page"/>
        <LayoutDisclaimer class="mt-12" toggleable/>
      </div>

      <aside class="hidden md:block basis-60 shrink-0 pt-24">
        <h5 class="mb-4 font-bold">On This Page</h5>
        <nav>
          <ul v-if="page.body?.toc?.links">
            <li v-for="item in page.body.toc.links" :key="item.id" class="mt-4">
              <NuxtLink
                :to="`#${item.id}`"
                class="block mb-1 text-lg text-lorcana-parchment-900 hover:text-primary-600"
              >{{ item.text }}
              </NuxtLink>

              <ul v-if="item.children" class="pl-3">
                <li v-for="child in item.children" :key="child.id">
                  <NuxtLink
                    :to="`#${child.id}`"
                    class="block py-0.5 text-lorcana-parchment-900 hover:text-primary-600"
                  >{{ child.text }}
                  </NuxtLink>
                </li>
              </ul>
            </li>
          </ul>
        </nav>
      </aside>
    </div>
  </article>
</template>
