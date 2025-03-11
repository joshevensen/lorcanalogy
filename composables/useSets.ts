import {Sets} from '~/data/sets'
import type {SET} from "~/data/data.types";

export default function useSets() {
  const all: SET[] = Sets;

  return {
    all,
  }
}
