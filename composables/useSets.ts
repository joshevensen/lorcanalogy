import type {Set} from "@prisma/client";

const state = reactive<{
  initialized: boolean;
  sets: Set[];
}>({
  initialized: false,
  sets: []
})

export default async function useSets() {

  /**
   * Get Cards
   */
  if (!state.initialized) {
    await $fetch('/api/sets').then(response => {
      state.sets = response;
      state.initialized = true;
    });
  }

  return {
    all: state.sets,
  }
}
