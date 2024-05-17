<script setup lang="ts">
import { useValuteStore } from "~/store/valutesStore";
import { useBreakpoints } from "@vueuse/core";
import { ScreenBreakPoint } from "~/mylib";
import inputsCalc from "./input/inputsCalc.vue";

const props = defineProps<{ list: TValutaItem[] }>();
const isSelectedText = ref<string>("");
let selItem = reactive<TValutaItem>({
  Date: "",
  Name: "",
  ID: "R01235",
  Previous: 0,
  Value: 0,
  NumCode: "",
  CharCode: "",
  PreviousDate: "",
  Nominal: 0,
});
const listRef = ref<HTMLSelectElement>();

const store = useValuteStore();
const { getItemByName, setSelItem, setSelIndex } = store;
const { SelectedIndex } = storeToRefs(store);

const listSize = useBreakpoints(ScreenBreakPoint);
const sizeList = ref<number>(12);

onMounted(() => {
  if (listRef.value) {
    listRef.value.selectedIndex = SelectedIndex.value;
    isSelectedText.value = listRef.value.options[SelectedIndex.value].value;
    // console.log(isSelectedText.value);
  }
});

watch(listSize.active(), (newValue) => {
  let tmpSize: string | undefined = listSize.active().value;
  if (tmpSize !== undefined) {
    switch (tmpSize) {
      case "mobile":
        sizeList.value = 6;
        break;
      case "mobilePro":
        sizeList.value = 6;
        break;
      case "tablet":
        sizeList.value = 6;
        break;
      case "tablet2":
        sizeList.value = 8;
        break;
      case "laptop":
        sizeList.value = 8;
        break;
      case "desktop":
        sizeList.value = 10;
        break;
      case "largeDescktop":
        sizeList.value = 12;
        break;
      default:
        sizeList.value = 8;
        break;
    }
  }
});

watchEffect(() => {
  if (isSelectedText.value) {
    selItem = getItemByName(isSelectedText.value);
    setSelItem(selItem);
  }
  if (listRef.value) {
    setSelIndex(listRef.value.selectedIndex);
  }

  //   console.log(selItem.Name, selItem.ID);
});
</script>

<template>
  <div class="w-full">
    <inputsCalc />
    <div
      class="w-full h-[28px] p-1 mt-4 flex items-start justify-between gap-2 bg-slate-100 font-bold font-roboto text-[0.8rem]/[12.rem] tracking-tighter shadow-[0_4px_6px_0_rgba(100,120,130,0.7)]"
    >
      Валюты
      <SortButtonSortButtons />
    </div>
    <select
      ref="listRef"
      class="w-full outline-none font-roboto text-[0.8rem]/[1.2rem] mt-1"
      :size="sizeList"
      v-model="isSelectedText"
    >
      <option
        v-for="(item, ind) in props.list"
        :key="ind"
        class="p-1 lg:p-2 cursor-pointer odd:bg-slate-100 checked:bg-slate-800 checked:text-stone-300 hover:text-lime-300 hover:bg-slate-800 hover:rounded-xl checked:rounded-xl"
      >
        {{ item.Name }}
      </option>
    </select>
  </div>
</template>
