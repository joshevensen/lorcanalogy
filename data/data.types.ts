export type INK = 'Amber' | 'Amethyst' | 'Emerald' | 'Ruby' | 'Sapphire' | 'Steel';
export type LAYOUT = 'normal' | 'landscape';
export type LEGALITIES = 'legal' | 'not_legal' | 'banned';
export type RARITY = 'Common' | 'Uncommon' | 'Rare' | 'Super_rare' | 'Legendary' | 'Enchanted' | 'Promo';
export type TYPE = 'Action' | 'Character' | 'Item' | 'Location' | 'Song';

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
    tenPlus: number,
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

export interface SET {
  "id": string,
  "name": string,
  "code": string,
  "released_at": string,
  "prereleased_at": string,
  "counts"?: COUNTS
}

export interface CARD {
  "id": string,
  "name": string,
  "version"?: string,
  "layout": LAYOUT,
  "released_at": string,
  "image_uris": {
    "digital": {
      "small": string,
      "normal": string,
      "large": string
    }
  },
  "cost": number,
  "inkwell": boolean,
  "ink": INK | null,
  "inks": INK[] | null,
  "type": TYPE[],
  "classifications": string[] | null,
  "text": string | null,
  "keywords": string[] | null,
  "move_cost": number | null,
  "strength": number | null,
  "willpower": number | null,
  "lore": number | null,
  "rarity": RARITY,
  "illustrators": string[],
  "collector_number": string,
  "lang": string,
  "flavor_text": string | null,
  "tcgplayer_id"?: number | null,
  "legalities": {
    "core": LEGALITIES
  },
  "set": {
    "id": string,
    "code": string,
    "name": string
  },
  "prices"?: {
    "usd"?: string | null,
    "usd_foil"?: string | null,
  }
}
