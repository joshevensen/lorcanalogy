<script setup lang="ts">
const { data: navigation } = await useAsyncData('navigation', () => {
  return queryCollectionNavigation('content')
})
</script>

<template>
  <div class="pt-18">
    <p class="mb-1 text-xl uppercase text-center">Welcome to</p>
    <h1 class="text-6xl text-center">Lorcanalogy</h1>
    <p class="mt-4 text-center">An Unofficial Guide to playing <em>Disney Lorcana</em> TCG</p>

    <div class="">
      <Panel class="mt-16 mx-auto w-96" header="Pages">
        <nav>
          <ul v-if="navigation" class="space-y-2">
            <li v-for="item in navigation" :key="item.path">
              <NuxtLink :to="item.path" class="hover:text-primary">{{ item.title }}</NuxtLink>
            </li>
          </ul>
        </nav>
      </Panel>
    </div>
  </div>
</template>
