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

  return {
    all,
  }
}
