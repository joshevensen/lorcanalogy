<script lang="ts" setup="">
import type {MenuItem} from "primevue/menuitem";

const supabase = useSupabaseClient()
const router = useRouter();
const user = useSupabaseUser();

const menuItems = computed(() => {
  const items: MenuItem[] = [
    {label: 'Home', to: '/'},
    {label: 'Articles', to: '/articles'},
    {label: 'Cards', to: '/cards'},
    {label: 'Proxies', to: '/proxies'},
    {label: 'Resources', to: '/resources'},
    {label: 'Glossary', to: '/glossary'},
  ]

  if (user.value) {
    items.push({
      items: [
        {label: 'Collection', to: '/collection'},
      ]
    })
  }

  return items;
})

const menu = ref();
const toggle = (event: any) => {
  menu.value.toggle(event);
};

async function logout() {
  await supabase.auth.signOut()
  router.push('/')
}
</script>

<template>
  <header class="header-footer top-0 h-10 flex items-center border-b">
    <div class="content-width w-full flex items-center justify-between pl-4">
      <NuxtLink class="flex gap-2 items-center text-lg" to="/">
        <NuxtImg class="h-6" height="20px" src="/favicon.png"/>
        <Lorcanaology/>
      </NuxtLink>

      <div class="flex items-center gap-1">
        <UiButton v-if="user" label="logout" text @click="logout"/>

        <Button
          aria-controls="overlay_menu"
          aria-haspopup="true"
          icon="pi pi-bars"
          variant="text"
          @click="toggle"
        />
      </div>
    </div>

    <!--  Page Menu-->
    <Menu
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
