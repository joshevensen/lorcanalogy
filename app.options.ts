import type {OPTION} from './app.types'
import useSets from './composables/useSets'

const sets = useSets();

export const sortOptions: OPTION[] = [
  {label: 'Name', value: 'name'},
  {label: 'Rarity', value: 'rarity'},
  {label: 'Set', value: 'set'},
  {label: 'Type', value: 'type'},
];

export const inkOptions: OPTION[] = [
  {label: 'Amber', value: 'Amber'},
  {label: 'Amethyst', value: 'Amethyst'},
  {label: 'Emerald', value: 'Emerald'},
  {label: 'Ruby', value: 'Ruby'},
  {label: 'Sapphire', value: 'Sapphire'},
  {label: 'Steel', value: 'Steel'},
];

export const typeOptions: OPTION[] = [
  {label: 'Actions', value: 'Action'},
  {label: 'Characters', value: 'Character'},
  {label: 'Items', value: 'Item'},
  {label: 'Locations', value: 'Location'},
  {label: 'Songs', value: 'Song'},
];

export const rarityOptions: OPTION[] = [
  {label: 'Common', value: 'Common'},
  {label: 'Uncommon', value: 'Uncommon'},
  {label: 'Rare', value: 'Rare'},
  {label: 'Super Rare', value: 'Super_rare'},
  {label: 'Legendary', value: 'Legendary'},
  {label: 'Enchanted', value: 'Enchanted'},
];

export const inkableOptions: OPTION[] = [
  {label: 'Inkable', value: 'inkable'},
  {label: 'Not Inkable', value: 'not_inkable'},
];

export const dualSingleOptions: OPTION[] = [
  {label: 'Single Ink', value: 'single'},
  {label: 'Dual Ink', value: 'dual'},
];

export const setOptions: OPTION[] = sets.all.map(set => {
  return {label: set.name, value: set.code};
});
