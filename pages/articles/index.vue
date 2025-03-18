<script lang="ts" setup>
const router = useRouter();

definePageMeta({title: "Articles"})

const {data: articles} = await useAsyncData('articles', () => {
  return queryCollection('articles').all();
})

function goToPage(path: string) {
  router.push(path);
}
</script>

<template>

  <div class="mt-16 space-y-10">
    <div v-if="articles" class="space-y-4">
      <UiCard
        v-for="item in articles"
        :key="item.path"
        class="group cursor-pointer"
        @click="goToPage(item.path)"
      >
        <div class="flex items-center justify-between gap-4">
          <h2>{{ item.title }}</h2>
          <p class="shrink-0 text-primary-600 group-hover:text-primary-400 text-right">Read Article →</p>
        </div>
      </UiCard>
    </div>
  </div>
</template>
