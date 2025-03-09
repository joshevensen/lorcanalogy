<script lang="ts" setup>
const router = useRouter();

definePageMeta({title: "Lorcanalogy"})

const {data: articles} = await useAsyncData('articles', () => {
  return queryCollection('articles').all();
})

function goToPage(path: string) {
  router.push(path);
}

function goToCardTable() {
  router.push('/card-table');
}

function goToResources() {
  router.push('/resources');
}

function goToGlossary() {
  router.push('/glossary');
}
</script>

<template>
  <p class="mt-4 text-xl text-center">
    An <strong>Unofficial Guide</strong> to playing
    <DisneyLorcana/>
    by a guy with too much time on his hands and the ability to make websites
  </p>

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

    <div class="space-y-4">

      <UiPanel
        class="group cursor-pointer"
        header="Cards Table"
        titleClasses="group-hover:text-primary-600"
        @click="goToCardTable()"
      >
        <p class="text-sm">A filterable table of
          <DisneyLorcana/>
          cards.
        </p>
        <p class="mt-4 text-primary-600 group-hover:text-primary-400 text-right">View Card Table →</p>
      </UiPanel>

      <UiPanel
        class="group cursor-pointer"
        header="Resources"
        titleClasses="group-hover:text-primary-600"
        @click="goToResources()"
      >
        <p class="text-sm">Here a list of resources I've found in my
          <DisneyLorcana/>
          journey.
        </p>
        <p class="mt-4 text-primary-600 group-hover:text-primary-400 text-right">View Resources →</p>
      </UiPanel>

      <UiPanel
        class="group cursor-pointer"
        header="Glossary"
        titleClasses="group-hover:text-primary-600"
        @click="goToGlossary()"
      >
        <p class="text-sm">Here a list of terms found in
          <DisneyLorcana/>
          and their definition.
        </p>
        <p class="mt-4 text-primary-600 group-hover:text-primary-400 text-right">View Glossary →</p>
      </UiPanel>
    </div>
  </div>
</template>
