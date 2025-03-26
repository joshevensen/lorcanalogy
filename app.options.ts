import useSets from './composables/useSets'
import convertEnumToOptions from "~/utils/convertEnumToOptions";
import {Ink, Rarity, Type} from "@prisma/client";

const sets = await useSets();

export interface OPTION {
  label: string;
  value: string | number | null;
}

export const sortOptions: OPTION[] = [
  {label: 'Name', value: 'name'},
  {label: 'Rarity', value: 'rarity'},
  {label: 'Set', value: 'set'},
  {label: 'Type', value: 'type'},
];

export const inkOptions: OPTION[] = convertEnumToOptions(Ink);

export const typeOptions: OPTION[] = convertEnumToOptions(Type);

export const rarityOptions: OPTION[] = convertEnumToOptions(Rarity);

export const inkableOptions: OPTION[] = [
  {label: 'Inkable', value: 'inkable'},
  {label: 'Not Inkable', value: 'not_inkable'},
];

export const dualSingleOptions: OPTION[] = [
  {label: 'Single Ink', value: 'single'},
  {label: 'Dual Ink', value: 'dual'},
];

export const setOptions: OPTION[] = sets.all.map(set => {
  return {label: set.name, value: set.id};
});
