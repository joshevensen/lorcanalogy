import {Ink, Rarity, Type} from "@prisma/client";
import type {OPTION} from '~/app.types';

export default async function useOptions() {
  const sets = await useSets();
  // const cards = await useCards();

  const sort: OPTION[] = [
    {label: 'Set', value: 'set'},
    {label: 'Name', value: 'name'},
    {label: 'Ink-Type-Name', value: 'inkTypeName'},
  ];

  const ink: OPTION[] = convertEnumToOptions(Ink);

  const type: OPTION[] = convertEnumToOptions(Type);

  const keyword: OPTION[] = [
    {
      "label": "Bodyguard",
      "value": "bodyguard"
    },
    {
      "label": "Challenger",
      "value": "challenger"
    },
    {
      "label": "Evasive",
      "value": "evasive"
    },
    {
      "label": "Reckless",
      "value": "reckless"
    },
    {
      "label": "Resist",
      "value": "resist"
    },
    {
      "label": "Rush",
      "value": "rush"
    },
    {
      "label": "Shift",
      "value": "shift"
    },
    {
      "label": "Sing Together",
      "value": "sing-together"
    },
    {
      "label": "Singer",
      "value": "singer"
    },
    {
      "label": "Support",
      "value": "support"
    },
    {
      "label": "Ward",
      "value": "ward"
    }
  ];

  const classification: OPTION[] = [
    {
      "label": "Alien",
      "value": "alien"
    },
    {
      "label": "Ally",
      "value": "ally"
    },
    {
      "label": "Broom",
      "value": "broom"
    },
    {
      "label": "Captain",
      "value": "captain"
    },
    {
      "label": "Deity",
      "value": "deity"
    },
    {
      "label": "Detective",
      "value": "detective"
    },
    {
      "label": "Dragon",
      "value": "dragon"
    },
    {
      "label": "Dreamborn",
      "value": "dreamborn"
    },
    {
      "label": "Fairy",
      "value": "fairy"
    },
    {
      "label": "Floodborn",
      "value": "floodborn"
    },
    {
      "label": "Hero",
      "value": "hero"
    },
    {
      "label": "Hyena",
      "value": "hyena"
    },
    {
      "label": "Illusion",
      "value": "illusion"
    },
    {
      "label": "Inventor",
      "value": "inventor"
    },
    {
      "label": "King",
      "value": "king"
    },
    {
      "label": "Knight",
      "value": "knight"
    },
    {
      "label": "Madrigal",
      "value": "madrigal"
    },
    {
      "label": "Mentor",
      "value": "mentor"
    },
    {
      "label": "Musketeer",
      "value": "musketeer"
    },
    {
      "label": "Pirate",
      "value": "pirate"
    },
    {
      "label": "Prince",
      "value": "prince"
    },
    {
      "label": "Princess",
      "value": "princess"
    },
    {
      "label": "Puppy",
      "value": "puppy"
    },
    {
      "label": "Queen",
      "value": "queen"
    },
    {
      "label": "Racer",
      "value": "racer"
    },
    {
      "label": "Robot",
      "value": "robot"
    },
    {
      "label": "Seven Dwarfs",
      "value": "seven-dwarfs"
    },
    {
      "label": "Sorcerer",
      "value": "sorcerer"
    },
    {
      "label": "Storyborn",
      "value": "storyborn"
    },
    {
      "label": "Tigger",
      "value": "tigger"
    },
    {
      "label": "Titan",
      "value": "titan"
    },
    {
      "label": "Villain",
      "value": "villain"
    }
  ];

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
    keyword,
    classification,
    rarity,
    inkable,
    dualSingle,
    set,
  }
}
