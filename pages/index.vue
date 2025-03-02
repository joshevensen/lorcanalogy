<script lang="ts" setup>
const router = useRouter();

const {data: navigation} = await useAsyncData('navigation', () => {
  return queryCollectionNavigation('content', ['description'])
})

function goToPage(path: string) {
  router.push(path);
}
</script>

<template>
  <div class="max-w-lg mx-auto py-18 px-6">
    <h1 class="text-5xl md:text-7xl text-center">
      <Lorcanaology/>
    </h1>
    <p class="mt-4 text-xl text-center">
      An <strong>Unofficial Guide</strong> to playing
      <DisneyLorcana/>
      by a guy with too much time on his hands and the ability to make websites
    </p>

    <div class="mt-16 space-y-10">
      <div v-if="navigation" class="space-y-4">
        <UiPanel
          v-for="item in navigation"
          :key="item.path"
          :header="item.title"
          class="group cursor-pointer"
          titleClasses="group-hover:text-primary-600"
          @click="goToPage(item.path)"
        >
          <p class="text-sm">{{ item.description }}</p>
          <p class="mt-4 text-primary-600 group-hover:text-primary-400 text-right">Read Article →</p>
        </UiPanel>
      </div>

      <UiPanel header="Disclaimers">
        <Disclaimer/>
      </UiPanel>
    </div>
  </div>
</template>
