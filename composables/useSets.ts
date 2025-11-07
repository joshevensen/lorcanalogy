import type { Set } from "@prisma/client";

const state = reactive<{
  initialized: boolean;
  sets: any[];
}>({
  initialized: false,
  sets: [],
});

export default async function useSets() {
  /**
   * Get Sets
   */
  if (!state.initialized) {
    await $fetch("/api/sets").then((response) => {
      state.sets = response as any;
      state.initialized = true;
    });
  }

  return {
    all: useSortBy(state.sets, ["id"]),
  };
}
