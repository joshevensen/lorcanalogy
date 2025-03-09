import {set1Cards} from '~/data/set1'
import {set2Cards} from '~/data/set2'
import {set3Cards} from '~/data/set3'
import {set4Cards} from '~/data/set4'
import {set5Cards} from '~/data/set5'
import {set6Cards} from '~/data/set6'
import {set7Cards} from '~/data/set7'
import type {CARD} from "~/data/data.types"

export default function useCards() {
  const all: CARD[] = [
    ...set1Cards,
    ...set2Cards,
    ...set3Cards,
    ...set4Cards,
    ...set5Cards,
    ...set6Cards,
    ...set7Cards
  ]

  type SORT_BY = 'name' | 'set' | 'ink' | 'type';

  interface OPTIONS {
    sortBY?: SORT_BY
    hideEnchanted?: boolean;
    hideDualInk?: boolean;
    isDualInkOnly?: boolean;
  }

  function getFilteredCards(
    set: string | null = null,
    options?: OPTIONS = {
      sortBy: 'name',
      hideEnchanted: true,
      hideDualInk: false,
      isDualInkOnly: false,
    }
  ): CARD[] {
    let cards: CARD[] = all;

    if (set) {
      cards = cards.filter(card => card.set.code === set)
    }

    if (options.hideEnchanted) {
      cards = cards.filter(card => card.rarity !== 'Enchanted')
    }

    if (options.hideDualInk) {
      cards = cards.filter(card => card.ink !== null)
    }

    if (options.isDualInkOnly) {
      cards = cards.filter(card => card.ink === null)
    }

    switch (options.sortBy) {
      case 'name':
        cards = useSortBy(cards, ['name', 'version'])
        break;
      case 'set':
        cards = useSortBy(cards, ['set.code', 'name', 'version'])
        break;
      case 'type':
        cards = useSortBy(cards, ['type', 'name', 'version'])
        break;
    }

    return cards;
  }

  return {
    all,
    getFilteredCards,
  }
}
