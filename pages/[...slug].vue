<script lang="ts" setup>
import type {MenuItem} from "primevue/menuitem";

const route = useRoute()
const router = useRouter()

/**
 * Get Content
 */
const {data: navigation} = await useAsyncData('navigation', () => {
  return queryCollectionNavigation('content')
})

const {data: page} = await useAsyncData(route.path, () => {
  return queryCollection('content').path(route.path).first()
})

const {data: siblings} = await useAsyncData('surround', () => {
  return queryCollectionItemSurroundings('content', route.path)
})

/**
 * SEO
 */
if (page.value) {
  page.value.seo.title = page.value.title + ' | Lorcanalogy'
  useSeoMeta(page.value.seo)
}

/**
 * Variables
 */
const menu = ref();
const updatedAt = new Date(String(page.value?.meta.updated)).toLocaleDateString('en-US', {
  year: "numeric",
  month: "short",
  day: "numeric",
})

/**
 * Computed
 */
const menuItems = computed<MenuItem[]>(() => {
  if (navigation.value) {
    return navigation.value.map((item) => {
      return {
        label: item.title,
        to: item.path,
      }
    })
  }

  return []
});


/**
 * Functions
 */
function goHome() {
  router.push('/');
}

const toggle = (event: any) => {
  menu.value.toggle(event);
};
</script>

<template>
  <!--  Header -->
  <LayoutHeader/>

  <main class="content-width pt-32 pb-20 px-6">
    <!--    Article -->
    <article v-if="page" class="mb-10">
      <h1 class="text-5xl text-primary-600 font-bold text-center">{{ page.title }}</h1>

      <p v-if="page.meta.updated" class="mt-2 text-sm px-2 text-center">Last updated {{ updatedAt }}</p>

      <p v-if="page.description" class="mt-8 -mb-4 text-lg px-2">{{ page.description }}</p>

      <UiPanel class="mt-12 -mb-8" collapsed header="Table of Contents" toggleable>
        <nav>
          <ul v-if="page.body?.toc?.links">
            <li v-for="item in page.body.toc.links" :key="item.id">
              <NuxtLink :to="`#${item.id}`">{{ item.text }}</NuxtLink>

              <ul v-if="item.children" class="pl-4">
                <li v-for="child in item.children" :key="child.id">
                  <NuxtLink :to="`#${child.id}`">{{ child.text }}</NuxtLink>
                </li>
              </ul>
            </li>
          </ul>
        </nav>
      </UiPanel>

      <ContentRenderer :value="page"/>

      <Disclaimer class="mt-12" toggleable/>
    </article>

    <!--    Empty-->
    <template v-else>
      <h1 class="mt-10 text-5xl text-primary-600 text-center">Page Not Found</h1>
      <p class="max-w-lg mt-4 mx-auto text-2xl text-center leading-normal">Oops! The content you're looking for doesn't
        exist. But there is plenty of other content :)</p>

      <div class="flex justify-center mt-12">
        <Button label="Go Back Home" @click="goHome"/>
      </div>
    </template>
  </main>

  <!--Footer-->
  <footer class="header-footer bottom-0 py-4 px-4 md:px-0 border-t">
    <div class="content-width grid grid-cols-5 gap-2">
      <div class="col-span-2 flex items-center text-sm">
        <UiLink v-if="siblings?.[0]" :to="siblings[0].path">← {{ siblings[0].title }}</UiLink>
      </div>

      <div class="flex justify-center items-center">
        <p
          aria-controls="overlay_menu"
          aria-haspopup="true"
          class="text-primary-600 hover:text-primary-400 text-xs font-bold uppercase cursor-pointer"
          @click="toggle"
        >Pages</p>
      </div>

      <div class="col-span-2 flex justify-end items-center text-sm">
        <UiLink v-if="siblings?.[1]" :to="siblings[1].path">{{ siblings[1].title }} →</UiLink>
      </div>
    </div>
  </footer>

  <!--  Page Menu-->
  <Menu
    v-if="menuItems"
    id="overlay_menu"
    ref="menu"
    :model="menuItems"
    :popup="true"
    pt:root:class="bg-lorcana-parchment-0!"
    pt:root:style="transform: translateX(-40%)"
  >
    <template #item="{ item, props }">
      <router-link v-slot="{ href, navigate }" :to="item.to" custom>
        <a :href="href" v-bind="props.action" @click="navigate">
          <span class="ml-2">{{ item.label }}</span>
        </a>
      </router-link>
    </template>
  </Menu>
</template>
