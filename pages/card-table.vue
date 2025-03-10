<script lang="ts" setup>
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import arraysInclude from "~/utils/arraysInclude";

definePageMeta({title: "Cards Table", layout: 'table'})

const {all: allSets} = useSets();
const cards = useCards();
const table = ref();
const visible = ref(false);

/**
 * Filter Options
 */

const inkOptions = [
  {label: 'Amber', value: 'Amber'},
  {label: 'Amethyst', value: 'Amethyst'},
  {label: 'Emerald', value: 'Emerald'},
  {label: 'Ruby', value: 'Ruby'},
  {label: 'Sapphire', value: 'Sapphire'},
  {label: 'Steel', value: 'Steel'},
];

const typeOptions = [
  {label: 'Actions', value: 'Action'},
  {label: 'Characters', value: 'Character'},
  {label: 'Items', value: 'Item'},
  {label: 'Locations', value: 'Location'},
  {label: 'Songs', value: 'Song'},
];

const rarityOptions = [
  {label: 'Common', value: 'Common'},
  {label: 'Uncommon', value: 'Uncommon'},
  {label: 'Rare', value: 'Rare'},
  {label: 'Super Rare', value: 'Super_rare'},
  {label: 'Legendary', value: 'Legendary'},
  {label: 'Enchanted', value: 'Enchanted'},
];

let setOptions: any = []; // This is set below

const inkableOptions = [
  {label: 'Inkable & Not Inkable', value: 'both'},
  {label: 'Inkable', value: 'inkable'},
  {label: 'Not Inkable', value: 'not_inkable'},
];

const dualSingleOptions = [
  {label: 'Single & Dual Inks', value: 'both'},
  {label: 'Single Inks Only', value: 'single'},
  {label: 'Dual Inks Only', value: 'dual'},
];

/**
 * Filter Variables
 */

const searchTerm = ref('');
const selectedInks = ref<string[]>(['Amber', 'Amethyst', 'Emerald', 'Ruby', 'Sapphire', 'Steel']);
const selectedTypes = ref<string[]>(['Action', 'Character', 'Item', 'Location', 'Song']);
const selectedRarities = ref<string[]>(['Common', 'Uncommon', 'Rare', 'Super_rare', 'Legendary']);
const selectedSets = ref<string[]>([]); // This is set below
const selectedInkable = ref<string>('both');
const selectedDualSingleInk = ref<string>('both');


// populate set related filter options, default, and variable
allSets.forEach(set => {
  selectedSets.value.push(set.code);
  setOptions.push({label: set.name, value: set.code});
})

/**
 * Cards
 */

const allCards = ref(cards.all)

const filteredCards = computed(() => {
  return allCards.value.filter(card => {
    // Name
    if (!card.name.includes(searchTerm.value)) return false;

    // Ink
    if (card.ink) {
      if (!selectedInks.value.includes(card.ink)) return false;
    } else if (card.inks && card.inks?.length > 1) {
      if (arraysInclude(selectedInks.value, card.inks) === false) return false;
    }

    // Type
    if (arraysInclude(selectedTypes.value, card.type) === false) return false;

    // Rarity
    if (!selectedRarities.value.includes(card.rarity)) return false;

    // Set
    if (!selectedSets.value.includes(card.set.code)) return false;

    // Inkable
    if (selectedInkable.value === 'inkable' && card.inkwell === false) return false;
    if (selectedInkable.value === 'not_inkable' && card.inkwell === true) return false;

    // Dual vs Single Ink
    if (selectedDualSingleInk.value === 'single') {
      if (!card.ink || (card.inks && card.inks?.length > 1)) return false;
    }

    if (selectedDualSingleInk.value === 'dual') {
      if (card.ink || (card.inks && card.inks?.length > 1)) return false;
    }

    return true;
  })
})

const mappedCards = computed(() => {
  return filteredCards.value.map((card) => {
    return {
      name: card.version ? `${card.name} | ${card.version}` : card.name,
      inks: card.ink ? card.ink : card.inks ? card.inks.join(', ') : '',
      inkable: card.inkwell ? 'Yes' : 'No',
      rarity: useStartCase(card.rarity),
      types: card.type.includes('Song') ? 'Song' : card.type.join(', '),
      cost: card.cost,
      strength: card.strength,
      willpower: card.willpower,
      lore: card.lore,
      moveCost: card.move_cost,
      setName: card.set.name,
      setNumber: card.set.code,
      cardNumber: card.collector_number,
      tcgPlayer: card.tcgplayer_id,
      layout: card.layout,
      image: card.image_uris.digital.normal,
      classifications: card.classifications && card.classifications.join(', '),
      keywords: card.keywords && card.keywords.join(', '),
    }
  })
})

/**
 * Functions
 */

function exportCSV() {
  table.value.exportCSV();
}

function openFilters() {
  visible.value = true;
}

</script>

<template>
  <div class="mt-12">
    <DataTable
      ref="table"
      :rows="42"
      :value="mappedCards"
      currentPageReportTemplate="{first} to {last}"
      paginator
      paginatorPosition="both"
      paginatorTemplate="CurrentPageReport PrevPageLink PageLinks NextPageLink JumpToPageDropdown"
      removableSort
      scrollable
      size="small"
      sortMode="multiple"
      stripedRows
      exportFilename="lorcana-cards"
    >
      <Column :frozen="true" :sortable="true" class="bold min-w-64" field="name" header="Name"/>
      <Column :sortable="true" field="setNumber" header="Set"/>
      <Column :sortable="true" field="cardNumber" header="Number"/>
      <Column :sortable="true" field="inks" header="Ink"/>
      <Column :sortable="true" field="inkable" header="Inkable"/>
      <Column :sortable="true" field="types" header="Type"/>
      <Column :sortable="true" field="rarity" header="Rarity"/>
      <Column :sortable="true" field="cost" header="Cost"/>
      <Column :sortable="true" field="lore" header="Lore"/>
      <Column :sortable="true" field="strength" header="Strength"/>
      <Column :sortable="true" field="willpower" header="Willpower"/>
      <Column :sortable="true" field="moveCost" header="Move Cost"/>

      <!-- Pagination -->
      <template #empty>
        <p class="py-12 text-center italic text-xl">Based on your filters there are no cards.</p>
      </template>

      <template #paginatorstart>
        <p class="italic text-gray-400">{{ mappedCards.length }} of {{ allCards.length }} cards</p>
      </template>

      <template #paginatorend>
        <div class="flex gap-3 items-center">
          <UiButton icon="download" label="Download" @click="exportCSV()"/>
          <UiButton icon="filter" label="Filters" @click="openFilters"/>
          <!--          <UiButtonIcon icon="refresh" @click="resetFilters()"/>-->
        </div>
      </template>
    </DataTable>

    <!-- Filters -->
    <Drawer v-model:visible="visible" class="w-[90%]! max-w-xl!" header="Filters" position="right">
      <div class="flex flex-col gap-6">
        <UiInputWithButton v-model="searchTerm" icon="search" label="Search" placeholder="search by card name..."/>
        <UiSelectMulti v-model="selectedInks" :options="inkOptions" allLabel="All inks" placeholder="choose ink..."/>
        <UiSelectMulti
          v-model="selectedTypes"
          :options="typeOptions"
          allLabel="All types"
          placeholder="choose type..."
        />
        <UiSelectMulti
          v-model="selectedRarities"
          :options="rarityOptions"
          allLabel="All rarities"
          placeholder="choose rarity..."
        />
        <UiSelectMulti v-model="selectedSets" :options="setOptions" allLabel="All sets" placeholder="choose set..."/>
        <UiSelect v-model="selectedInkable" :options="inkableOptions"/>
        <UiSelect v-model="selectedDualSingleInk" :options="dualSingleOptions"/>
      </div>
    </Drawer>
  </div>
</template>
