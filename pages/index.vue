<script setup lang="ts">
const { data: navigation } = await useAsyncData('navigation', () => {
  return queryCollectionNavigation('content')
})
</script>

<template>
  <div class="pt-24 ">
    <p class="mb-1 text-xl uppercase text-center">Welcome to</p>
    <h1 class="text-6xl text-center">Lorcana-logy</h1>
    <p class="mt-4 text-center">An Unofficial Guide to playing <em>Disney Lorcana</em> TCG</p>

    <div class="mt-16 mx-auto w-96">
      <h3>Table of Contents</h3>
      <nav>
        <ul v-if="navigation">
          <li v-for="item in navigation" :key="item.path">
            <NuxtLink :to="item.path">{{ item.title }}</NuxtLink>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>
