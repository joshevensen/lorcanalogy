import {set1Cards} from '~/data/set1'
import {set2Cards} from '~/data/set2'
import {set3Cards} from '~/data/set3'
import {set4Cards} from '~/data/set4'
import {set5Cards} from '~/data/set5'
import {set6Cards} from '~/data/set6'
import {set7Cards} from '~/data/set7'
import type {CARD, FILTERS, MAPPED_CARD} from "~/app.types"
import {dualSingleOptions, inkableOptions, inkOptions, rarityOptions, setOptions, typeOptions} from "~/app.options";
import arraysInclude from "~/utils/arraysInclude";

export default function useCards() {
  /**
   * Filters
   */
  const filters = ref<FILTERS>({
    search: '',
    sort: 'set',
    inks: inkOptions.map(option => option.value),
    types: typeOptions.map(option => option.value),
    rarities: rarityOptions.map(option => {
      if (option.value !== 'Enchanted') return option.value;
    }).filter(value => value !== undefined),
    sets: setOptions.map(option => option.value),
    inkable: inkableOptions.map(option => option.value),
    dualSingle: dualSingleOptions.map(option => option.value),
  })

  /**
   * All Cards
   */
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
   * Filtered Cards
   */
  const filtered = computed((): MAPPED_CARD[] => {
    const cards = all.filter(card => {
      // Name
      // if (!card.name.includes(searchTerm.value)) return false;

      // Ink
      if (card.ink) {
        if (!filters.value.inks.includes(card.ink)) return false;
      } else if (card.inks && card.inks?.length > 1) {
        if (arraysInclude(filters.value.inks, card.inks) === false) return false;
      }

      // Type
      if (arraysInclude(filters.value.types, card.type) === false) return false;

      // Rarity
      if (!filters.value.rarities.includes(card.rarity)) return false;

      // Set
      if (!filters.value.sets.includes(card.set.code)) return false;

      // Inkable
      if (filters.value.inkable.length === 0) return false;

      if (filters.value.inkable.length === 1) {
        if (filters.value.inkable.includes('inkable') && !card.inkwell) return false;
        if (filters.value.inkable.includes('not_inkable') && card.inkwell) return false;
      }

      // Dual vs Single Ink
      if (filters.value.dualSingle.length === 0) return false;

      if (filters.value.dualSingle.length === 1) {
        if (filters.value.dualSingle.includes('single')) {
          if (!card.ink || card.inks && card.inks.length > 1) return false;
        }

        if (filters.value.dualSingle.includes('dual')) {
          if (card.ink || card.inks && card.inks.length < 2) return false;
        }
      }

      return true;
    })

    return mapCards(cards);
  })

  /**
   * Sorted Cards
   */
  const sorted = computed((): MAPPED_CARD[] => {
    switch (filters.value.sort) {
      case 'name':
        return useSortBy(filtered.value, ['fullName']);
      case 'rarity':
        return useSortBy(filtered.value, ['rarity', 'fullName']);
      case 'type':
        return useSortBy(filtered.value, ['type', 'fullName']);
    }

    return filtered.value;
  })

  /**
   * Cards by Pages
   */
  const byPage = computed(() => {
    const pages = [];
    const chunkSize = 9; // cards per page

    for (let i = 0; i < sorted.value.length; i += chunkSize) {
      const chunk: MAPPED_CARD[] = sorted.value.slice(i, i + chunkSize);
      pages.push(chunk);
    }

    return pages
  })

  return {
    all,
    filtered,
    sorted,
    byPage,
    filters
  }
}


/**
 * Map Cards
 * @param cards
 */
function mapCards(cards: CARD[]): MAPPED_CARD[] {
  return cards.map((card) => {
    return {
      id: `${card.set.code}-${card.collector_number}`,
      setName: card.set.name,
      setNumber: Number(card.set.code),
      cardNumber: Number(card.collector_number),
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
      text: convertTextToHTML(card.text),
      layout: card.layout,
      image: card.image_uris.digital.normal,
      tcgPlayer: card.tcgplayer_id,
    }
  })
}

/**
 * Convert to HTML
 * @param text
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
