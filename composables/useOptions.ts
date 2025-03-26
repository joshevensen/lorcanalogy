import {Ink, Rarity, Type} from "@prisma/client";

export interface OPTION {
  label: string;
  value: string | number | null;
}

export default async function useOptions() {
  const sets = await useSets();

  const sort: OPTION[] = [
    {label: 'Name', value: 'name'},
    {label: 'Rarity', value: 'rarity'},
    {label: 'Set', value: 'set'},
    {label: 'Type', value: 'type'},
  ];

  const ink: OPTION[] = convertEnumToOptions(Ink);

  const type: OPTION[] = convertEnumToOptions(Type);

  const rarity: OPTION[] = convertEnumToOptions(Rarity);

  const inkable: OPTION[] = [
    {label: 'Inkable', value: 'inkable'},
    {label: 'Not Inkable', value: 'not_inkable'},
  ];

  const dualSingle: OPTION[] = [
    {label: 'Single Ink', value: 'single'},
    {label: 'Dual Ink', value: 'dual'},
  ];

  const set: OPTION[] = sets.all.map(set => {
    return {label: set.name, value: set.id};
  });

  return {
    sort,
    ink,
    type,
    rarity,
    inkable,
    dualSingle,
    set,
  }
}
