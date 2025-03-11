<script lang="ts" setup>
const route = useRoute();
const heading = ref(route.meta.title)

watch(() => route.meta.title, (newTitle) => {
  heading.value = newTitle;
});
</script>

<template>
  <div>
    <Logo small/>
    <h1 v-if="heading === 'Lorcanalogy'" class="text-5xl md:text-7xl text-center">
      <Lorcanaology/>
    </h1>
    <h1 v-else class="text-5xl text-primary-600 font-bold text-center">{{ heading }}</h1>
  </div>
</template>
