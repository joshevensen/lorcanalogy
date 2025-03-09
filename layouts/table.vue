<script lang="ts" setup>
const route = useRoute();
const heading = ref(route.meta.title)

watch(() => route.meta.title, (newTitle) => {
  heading.value = newTitle;
});
</script>

<template>
  <LayoutHeader/>

  <main class="max-w-8xl mx-auto page-padding">
    <Logo small/>
    <h1 v-if="heading === 'Lorcanalogy'" class="text-5xl md:text-7xl text-center">
      <Lorcanaology/>
    </h1>
    <h1 v-else class="text-5xl text-primary-600 font-bold text-center">{{ heading }}</h1>
    <slot/>
  </main>

  <footer class="content-width page-padding">
    <Disclaimer/>
    <p class="mt-3 text-sm text-center text-lorcana-parchment-900">&copy; 2025. All Rights Reserved</p>
  </footer>
</template>
