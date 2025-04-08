import type {Set} from "@prisma/client";

const state = reactive<{
  initialized: boolean;
  sets: Set[];
}>({
  initialized: false,
  sets: []
})

export default async function useSets() {

  const supabase = useSupabaseClient();

  /**
   * Get Cards
   */
  if (!state.initialized) {
    // await $fetch('/api/sets').then(response => {
    //   state.sets = response;
    //   state.initialized = true;
    // });

    const {data} = await supabase.from('Set').select('*')
    state.sets = data || [];
    state.initialized = true;
  }

  return {
    all: useSortBy(state.sets, ['id']),
  }
}
