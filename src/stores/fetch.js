import { ref, computed } from "vue";
import { defineStore } from "pinia";
import SERVICE from "@/service/fetch.js";

export const useFetchStore = defineStore("fetch", () => {
  const fetch = ref(null);

  const getFetch = computed(() => fetch.value);

  const setFetch = (value) => {
    fetch.value = value;
  };

  async function getFetchServices() {
    try {
      const res = await SERVICE.getFetch();

      setFetch(res);

      return res;
    } catch (error) {
      console.error(error);
    }
  }

  return {
    getFetchServices,
    getFetch,
  };
});
