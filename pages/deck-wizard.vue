<script lang="ts" setup>
import {
  DeckWizardActions,
  DeckWizardArchetype,
  DeckWizardCharacters,
  DeckWizardFinalize,
  DeckWizardInkColors,
  DeckWizardItems,
  DeckWizardLoctions,
  DeckWizardSongs,
  DeckWizardTheme
} from "#components";

definePageMeta({title: "Deck Wizard"})

const steps = [
  {label: 'Archetype', component: DeckWizardArchetype},
  {label: 'Ink Colors', component: DeckWizardInkColors},
  {label: 'Theme', component: DeckWizardTheme},
  {label: 'Characters', component: DeckWizardCharacters},
  {label: 'Actions', component: DeckWizardActions},
  {label: 'Songs', component: DeckWizardSongs},
  {label: 'Items', component: DeckWizardItems},
  {label: 'Locations', component: DeckWizardLoctions},
  {label: 'Finalize', component: DeckWizardFinalize},
]
</script>


<template>
  <Stepper :value="1">
    <StepList>
      <Step v-for="(step, index) in steps" :key="index + 1" :value="index + 1" pt:number:class="hidden!">
        {{ step.label }}
      </Step>
    </StepList>

    <StepPanels>
      <StepPanel v-for="(step, index) in steps" :key="index + 1" v-slot="{ activateCallback }" :value="index + 1">
        <div class="py-3 border-y border-slate-400">
          <component :is="step.component"/>
        </div>

        <div class="flex justify-between py-4">
          <Button v-if="index > 0" label="Back" severity="secondary" size="small" @click="activateCallback(index)"/>
          <Button label="Next" size="small" @click="activateCallback(index + 2)"/>
        </div>
      </StepPanel>
    </StepPanels>
  </Stepper>
</template>
