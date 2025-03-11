import {Sets} from '~/data/sets'
import type {SET} from "~/data/data.types";
import type {OPTION} from "~/components/ui/Select.vue";

export default function useSets() {
  const all: SET[] = Sets;

  const selectOptions: OPTION[] = all.map(set => {
    return {label: set.name, value: set.code};
  });

  const selectDefault: string[] = all.map(set => set.code);

  return {
    all,
    selectOptions,
    selectDefault
  }
}
