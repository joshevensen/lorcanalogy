<script lang="ts" setup>
const route = useRoute()
const router = useRouter()

/**
 * Get Article Info
 */
const {data: page} = await useAsyncData(route.path, () => {
  return queryCollection('articles').path(route.path).first()
})

const {data: siblings} = await useAsyncData('surround', () => {
  return queryCollectionItemSurroundings('articles', route.path)
})

/**
 * SEO
 */
if (page.value?.seo) {
  page.value.seo.title = page.value.title + ' | Lorcanalogy'
  useSeoMeta(page.value.seo)

  console.log(page.value)
}

/**
 * Variables
 */
const updatedAt = new Date(String(page.value?.updated)).toLocaleDateString('en-US', {
  year: "numeric",
  month: "short",
  day: "numeric",
})

/**
 * Functions
 */
function goHome() {
  router.push('/');
}
</script>

<template>
  <!--  Header -->
  <LayoutHeader/>

  <div class="fixed top-10 left-0 right-0 bottom-12 overflow-y-scroll">
    <main class="content-width flex gap-16 pt-18 md:pt-24 pb-8 md:pb-12 px-6">
      <template v-if="page">
        <!--    Article -->
        <article>
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

          <ContentRenderer :value="page"/>
          <Disclaimer class="mt-12" toggleable/>
        </article>

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
      </template>

      <!--    Empty-->
      <template v-else>
        <h1 class="mt-10 content-title">Page Not Found</h1>
        <p class="max-w-lg mt-4 mx-auto text-2xl text-center leading-normal">Oops! The content you're looking for
          doesn't exist. But there is plenty of other content :)</p>

        <div class="flex justify-center mt-12">
          <Button label="Go Back Home" @click="goHome"/>
        </div>
      </template>
    </main>
  </div>

  <!--Footer-->
  <footer class="header-footer bottom-0 py-4 px-4 border-t">
    <div class="content-width grid grid-cols-2 gap-2">
      <div class="flex items-center text-sm">
        <UiLink v-if="siblings?.[0]" :to="siblings[0].path">← {{ siblings[0].title }}</UiLink>
      </div>

      <div class="flex justify-end items-center text-sm">
        <UiLink v-if="siblings?.[1]" :to="siblings[1].path">{{ siblings[1].title }} →</UiLink>
      </div>
    </div>
  </footer>
</template>
