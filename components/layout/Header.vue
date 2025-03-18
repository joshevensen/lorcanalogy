<script lang="ts" setup="">
import type {MenuItem} from "primevue/menuitem";

const {data: articles} = await useAsyncData('navArticles', () => {
  return queryCollectionNavigation('articles')
})

const menuItems = computed<MenuItem[]>(() => {
  const items: MenuItem[] = [{label: 'Home', to: '/'}];

  if (articles.value) {
    const articleChildren = articles.value[0].children || []
    const articleItems: MenuItem[] = []

    articleChildren.forEach((item) => {
      articleItems.push({label: item.title, to: item.path})
    })

    items.push({
      items: articleItems
    })
  }

  items.push({
    items: [
      {label: 'Card Table', to: '/card-table'},
      {label: 'Proxies', to: '/proxies'},
      {label: 'Resources', to: '/resources'},
      {label: 'Glossary', to: '/glossary'}
    ]
  })

  return items;
});

const menu = ref();
const toggle = (event: any) => {
  menu.value.toggle(event);
};
</script>

<template>
  <header class="header-footer top-0 h-10 flex items-center border-b">
    <div class="content-width w-full flex items-center justify-between pl-4">
      <NuxtLink class="flex gap-2 items-center text-lg" to="/">
        <NuxtImg class="h-6" height="20px" src="/favicon.png"/>
        <Lorcanaology/>
      </NuxtLink>

      <Button
        aria-controls="overlay_menu"
        aria-haspopup="true"
        icon="pi pi-bars"
        variant="text"
        @click="toggle"
      />
    </div>

    <!--  Page Menu-->
    <Menu
      v-if="menuItems"
      id="overlay_menu"
      ref="menu"
      :model="menuItems"
      :popup="true"
      pt:root:class="bg-lorcana-parchment-0!"
      pt:submenuLabel:class="p-0! border-b border-lorcana-parchment-500!"
    >
      <template #item="{ item }">
        <NuxtLink v-if="item.to" :to="item.to" class="block py-1 px-2">{{ item.label }}</NuxtLink>
      </template>
    </Menu>
  </header>
</template>
