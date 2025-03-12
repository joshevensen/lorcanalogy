import {set1Cards} from '~/data/set1'
import {set2Cards} from '~/data/set2'
import {set3Cards} from '~/data/set3'
import {set4Cards} from '~/data/set4'
import {set5Cards} from '~/data/set5'
import {set6Cards} from '~/data/set6'
import {set7Cards} from '~/data/set7'
import type {CARD, MAPPED_CARD} from "~/data/data.types"
import arraysInclude from "~/utils/arraysInclude";

export default function useCards() {
  const sets = useSets();

  const all: CARD[] = [
    ...set1Cards,
    ...set2Cards,
    ...set3Cards,
    ...set4Cards,
    ...set5Cards,
    ...set6Cards,
    ...set7Cards
  ]

  /**
   * Options
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
   * Defaults
   */

  const inkDefault = inkOptions.map(option => option.value);
  const typeDefault = typeOptions.map(option => option.value);
  const rarityDefault = rarityOptions.map(option => {
    if (option.value !== 'Enchanted') return option.value;
  }).filter(value => value !== undefined);
  const inkableDefault = inkableOptions[0].value;
  const dualSingleDefault = dualSingleOptions[0].value;

  /**
   * Selected
   */

  const searchTerm = ref('');
  const selectedInks = ref<string[]>(inkDefault);
  const selectedTypes = ref<string[]>(typeDefault);
  const selectedRarities = ref<string[]>(rarityDefault);
  const selectedSets = ref<string[]>(sets.selectDefault);
  const selectedInkable = ref<string>(inkableDefault);
  const selectedDualSingleInk = ref<string>(dualSingleDefault);

  /**
   * Computed
   */

  const filteredCards = computed(() => {
    return all.filter(card => {
      // Name
      // if (!card.name.includes(searchTerm.value)) return false;

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
      if (selectedInkable.value === 'inkable' && !card.inkwell) return false;
      if (selectedInkable.value === 'not_inkable' && card.inkwell) return false;

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
  const mappedCards = computed((): MAPPED_CARD[] => {
    return filteredCards.value.map((card) => {
      return {
        id: `${card.set.code}-${card.collector_number}`,
        setName: card.set.name,
        setNumber: card.set.code,
        cardNumber: card.collector_number,
        name: card.name,
        version: card.version,
        fullName: card.version ? `${card.name} | ${card.version}` : card.name,
        inks: card.ink ? card.ink : card.inks ? card.inks.join(', ') : '',
        inkable: card.inkwell,
        isDualInk: card.inks && card.inks?.length > 1,
        firstInk: card.inks?.length ? card.inks[0] : card.ink,
        secondInk: card.inks && card.inks[1],
        rarity: useStartCase(card.rarity),
        type: card.type.includes('Song') ? 'Song' : card.type.join(', '),
        cost: card.cost,
        lore: card.lore,
        strength: card.strength,
        willpower: card.willpower,
        moveCost: card.move_cost,
        classifications: card.classifications && card.classifications.join(', '),
        keywords: card.keywords && card.keywords.join(', '),
        text: card.text,
        layout: card.layout,
        image: card.image_uris.digital.normal,
        tcgPlayer: card.tcgplayer_id,
      }
    })
  })

  /**
   * Methods
   */
  function convertTextToHTML(text: string | null): string {
    if (!text) return '';

    const newText = text.replace(/\r?\n/g, '</p> <p>')
      .replace(/(\([^)]*\))/g, ``) // Remove keyword explanations
      .replaceAll('{I}', 'Ink')
      .replaceAll('{E}', 'Exert')
      .replaceAll('{L}', 'Lore')
      .replaceAll('{S}', 'Strength')
      .replaceAll('Bodyguard', '<strong class="uppercase">$&</strong>')
      .replaceAll('Challenger', '<strong class="uppercase">$&</strong>')
      .replaceAll('Evasive', '<strong class="uppercase">$&</strong>')
      .replaceAll('Reckless', '<strong class="uppercase">$&</strong>')
      .replaceAll('Resist', '<strong class="uppercase">$&</strong>')
      .replaceAll('Rush', '<strong class="uppercase">$&</strong>')
      .replaceAll('Shift', '<strong class="uppercase">$&</strong>')
      .replaceAll('Singer', '<strong class="uppercase">$&</strong>')
      .replaceAll('Sing Together', '<strong class="uppercase">$&</strong>')
      .replaceAll('Support', '<strong class="uppercase">$&</strong>')
      .replaceAll('Vanish', '<strong class="uppercase">$&</strong>')
      .replaceAll('Ward', '<strong class="uppercase">$&</strong>')
      .replace(/\b[A-Z]+\b/g, `<span class="text-[110%] font-bold">$&</span>`) // All Caps
      .replace(/\r?\n/g, '</p> <p>'); // Line Brakes

    return `<p>${newText}</p>`
  }

  return {
    all,
    filteredCards,
    mappedCards,
    searchTerm,
    selectedInks,
    selectedTypes,
    selectedRarities,
    selectedSets,
    selectedInkable,
    selectedDualSingleInk,
    inkOptions,
    typeOptions,
    rarityOptions,
    inkableOptions,
    dualSingleOptions,
    convertTextToHTML,
  }
}
