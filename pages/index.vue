<script lang="ts" setup>
const router = useRouter();

definePageMeta({title: "Lorcanalogy"})

function goToPage(path: string) {
  router.push(path);
}
</script>

<template>
  <p class="mt-4 text-xl text-center">
    An <strong>Unofficial Guide</strong> to playing
    <DisneyLorcana/>
    by a guy with too much time on his hands and the ability to make websites
  </p>

  <div class="mt-16 space-y-6">
    <UiPanel
      class="group cursor-pointer"
      header="Articles"
      titleClasses="group-hover:text-primary-600"
      @click="goToPage('/articles')"
    >
      <p class="text-sm">Articles on how to play
        <DisneyLorcana/>
        and improve your skills.
      </p>
      <p class="mt-4 text-primary-600 group-hover:text-primary-400 text-right">View Articles →</p>
    </UiPanel>

    <UiPanel
      class="group cursor-pointer"
      header="Cards"
      titleClasses="group-hover:text-primary-600"
      @click="goToPage('/cards')"
    >
      <p class="text-sm">A filterable table of
        <DisneyLorcana/>
        cards.
      </p>
      <p class="mt-4 text-primary-600 group-hover:text-primary-400 text-right">View Card Table →</p>
    </UiPanel>

    <UiPanel
      class="group cursor-pointer"
      header="Proxies"
      titleClasses="group-hover:text-primary-600"
      @click="goToPage('/proxies')"
    >
      <p class="text-sm">A filterable page of
        <DisneyLorcana/>
        proxies.
      </p>
      <p class="mt-4 text-primary-600 group-hover:text-primary-400 text-right">View Proxies →</p>
    </UiPanel>

    <UiPanel
      class="group cursor-pointer"
      header="Resources"
      titleClasses="group-hover:text-primary-600"
      @click="goToPage('/resources')"
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
      @click="goToPage('/glossary')"
    >
      <p class="text-sm">Here is a list of terms found in
        <DisneyLorcana/>
        and their definition.
      </p>
      <p class="mt-4 text-primary-600 group-hover:text-primary-400 text-right">View Glossary →</p>
    </UiPanel>
  </div>
</template>
