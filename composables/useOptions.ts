export default async function useOptions() {
  const { data } = await useAsyncData("options", () => $fetch("/api/options"), {
    default: () => ({
      ink: [],
      type: [],
      rarity: [],
      set: [],
      keyword: [],
      classification: [],
      inkable: [],
      dualSingle: [],
    }),
  });

  return data.value!;
}

