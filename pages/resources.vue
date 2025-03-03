<script lang="ts" setup>
const {data: resources} = await useAsyncData('resources', () => {
  return queryCollection('resources').all()
})

const urlClasses = "flex items-center gap-2 mt-2 text-primary-600 hover:text-primary-400"
</script>

<template>
  <LayoutHeader/>

  <main class="content-width pt-32 pb-20 px-6">
    <h1 class="text-5xl text-primary-600 font-bold text-center">Resources</h1>

    <div v-if="resources" class="mt-12 space-y-4">
      <UiPanel
        v-for="(item, index) in resources"
        :key="item.name + index"
        :header="item.name"
      >
        <p>{{ item.description }}</p>
        <a v-if="item.websiteURL" :class="urlClasses + ' mt-4'" :href="item.websiteURL" target="_blank">
          <i class="pi pi-external-link"></i>
          <span>{{ item.websiteURL }}</span>
        </a>
        <a v-if="item.youtubeURL" :class="urlClasses" :href="item.youtubeURL" target="_blank">
          <i class="pi pi-youtube"></i>
          <span>{{ item.youtubeURL }}</span>
        </a>
        <a v-if="item.subredditURL" :class="urlClasses" :href="item.subredditURL" target="_blank">
          <i class="pi pi-reddit"></i>
          <span>{{ item.subredditURL }}</span>
        </a>
      </UiPanel>
    </div>
  </main>
</template>
