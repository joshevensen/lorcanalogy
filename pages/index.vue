<script lang="ts" setup>
import Logo from "~/components/Logo.vue";

const router = useRouter();

const {data: articles} = await useAsyncData('articles', () => {
  return queryCollectionNavigation('articles', ['description'])
})

function goToPage(path: string) {
  router.push(path);
}

function goToResources() {
  router.push('/resources');
}

function goToGlossary() {
  router.push('/glossary');
}
</script>

<template>
  <main class="content-width page-padding">
    <Logo/>
    <h1 class="text-5xl md:text-7xl text-center">
      <Lorcanaology/>
    </h1>
    <p class="mt-4 text-xl text-center">
      An <strong>Unofficial Guide</strong> to playing
      <DisneyLorcana/>
      by a guy with too much time on his hands and the ability to make websites
    </p>

    <div class="mt-16 space-y-10">
      <div v-if="articles" class="space-y-4">
        <UiPanel
          v-for="item in articles[0].children"
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

      <div class="space-y-4">
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

      <Disclaimer/>
    </div>
  </main>
</template>
