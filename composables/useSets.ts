import {Sets} from '~/data/sets'

export default function useSets() {
  const cards = useCards();

  const allWithCounts = Sets.map(set => {
    return {
      ...set,
      counts: calculateCardCounts(cards.getFilteredCards('standard', 'name', set.code)),
    }
  })

  return {
    all: allWithCounts,
  }
}
