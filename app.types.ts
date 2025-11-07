export interface CARD {
  id: string;
  name: string;
  version?: string | null;
  layout: string;
  released_at: string;
  image_uris: {
    digital: {
      small: string;
      normal: string;
      large: string;
    };
  };
  cost: number;
  inkwell: boolean;
  ink: string | null;
  inks: string[] | null;
  type: string[];
  classifications: string[] | null;
  text: string | null;
  keywords: string[] | null;
  move_cost: number | null;
  strength: number | null;
  willpower: number | null;
  lore: number | null;
  rarity: string;
  illustrators: string[];
  collector_number: string;
  lang: string;
  flavor_text: string | null;
  tcgplayer_id?: number | null;
  legalities: {
    core: string;
  };
  set: {
    id: string;
    code: string;
    name: string;
  };
  prices?: {
    usd?: string | null;
    usd_foil?: string | null;
  };
}

export interface SET {
  id: string;
  name: string;
  code: string;
  released_at: string;
  prereleased_at: string;
}

export interface OPTION {
  label: string;
  value: string;
}

export interface COUNTS {
  total: number;
  costs: {
    one: number;
    two: number;
    three: number;
    four: number;
    five: number;
    six: number;
    seven: number;
    eight: number;
    nine: number;
    ten: number;
    "ten+": number;
  };
  rarities: {
    common: number;
    uncommon: number;
    rare: number;
    superRare: number;
    legendary: number;
    enchanted: number;
  };
  types: {
    actions: number;
    characters: number;
    items: number;
    locations: number;
    songs: number;
  };
}
