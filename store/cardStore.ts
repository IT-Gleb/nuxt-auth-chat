import { defineStore } from "pinia";

export const useCardStore = defineStore("card-data", () => {
  const howData = ref<number>(1);

  function setData(param: number) {
    howData.value = param;
  }

  return {
    howData,
    setData,
  };
});
