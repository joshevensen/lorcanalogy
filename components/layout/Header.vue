<script lang="ts" setup="">
const menuItems = [
  {label: 'Home', to: '/'},
  {label: 'Articles', to: '/articles'},
  {label: 'Cards', to: '/cards'},
  {label: 'Collection', to: '/collection'},
  {label: 'Proxies', to: '/proxies'},
  {label: 'Resources', to: '/resources'},
  {label: 'Glossary', to: '/glossary'}
]

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
      ref="menu"
      id="overlay_menu"
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
