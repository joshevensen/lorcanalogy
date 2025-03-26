export interface COUNTS {
  total: number,
  costs: {
    one: number,
    two: number,
    three: number,
    four: number,
    five: number,
    six: number,
    seven: number,
    eight: number,
    nine: number,
    ten: number,
    'ten+': number,
  },
  rarities: {
    common: number,
    uncommon: number,
    rare: number,
    superRare: number,
    legendary: number,
    enchanted: number,
  },
  types: {
    actions: number,
    characters: number,
    items: number,
    locations: number,
    songs: number,
  }
}

export interface FILTERS {
  sort: string,
  inks: (string | number | null)[],
  types: (string | number | null)[],
  rarities: (string | number | null)[],
  sets: (string | number | null)[],
  inkable: (string | number | null)[],
  dualSingle: (string | number | null)[]
}

export interface OPTION {
  label: string;
  value: string | number | null;
}
