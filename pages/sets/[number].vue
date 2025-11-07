<script lang="ts" setup>
definePageMeta({ title: "Set" });

const route = useRoute();
const setNumber = computed(() => (route.params.number as string) || "");

useHead({
  title: computed(() => `Set ${setNumber.value || ""}`),
});
</script>

<template>
  <h1>Set {{ setNumber }}</h1>
</template>
