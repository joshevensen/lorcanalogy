<script lang="ts" setup>
import DisneyLorcana from "~/components/DisneyLorcana.vue";
import Lorcanaology from "~/components/Lorcanaology.vue";

const {communityCodeURL, lorcanaURL} = useAppConfig();

defineProps<{
  toggleable?: boolean;
}>()
</script>

<template>
  <Panel :collapsed="toggleable" :toggleable header="Disclaimers">
    <div class="space-y-4 text-sm">
      <p>
        <Lorcanaology/>
        uses trademarks and/or copyrights associated with
        <DisneyLorcana/>
        , used under <a :href="communityCodeURL" target="_blank">Ravensburger’s Community Code Policy</a>. We are
        expressly
        prohibited from charging you to use or access this content.
        <strong>
          <Lorcanaology/>
          is not published, endorsed, or specifically
          approved by Disney or Ravensburger.</strong> For more information about
        <DisneyLorcana/>
        , visit <a :href="lorcanaURL" target="_blank">{{ lorcanaURL }}</a>.
      </p>

      <p>Also, this content comes from multiple sources around the internet. It's not all mine. I try to give credit
        where
        credit is due, but sometimes I forget where I came across the information.</p>
    </div>
  </Panel>
</template>
