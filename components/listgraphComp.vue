<script setup lang="ts">
import { Date_Convert, Date_Add, My_DateToString, offset2Week } from "~/mylib";
import graphComp from "./graphComp.vue";
import { useValuteStore } from "~/store/valutesStore";
import listValutes from "./listValutes.vue";
import loadingComp from "./loading/loadingComp.vue";

const props = defineProps<{ data: TValutaItem[] }>();

const nowDate = new Date(Date.now());

const tempStr2: string = My_DateToString(nowDate);
const tempStr1: string = Date_Add(nowDate, -offset2Week);

const date1 = ref<string>(tempStr1);
const date2 = ref<string>(tempStr2);
const paramD1 = ref<string>(Date_Convert(date1.value));
const paramD2 = ref<string>(Date_Convert(date2.value));
const isQuered = ref<number>(0);
const runQuery = computed(() => isQuered.value === 10);

const store = useValuteStore();
const { getItemByID } = store;
const { SelectedItem } = storeToRefs(store);

const { pending, data, error } = await useAsyncData(
  "graphData",
  () =>
    $fetch("/api/valdates", {
      params: {
        query: "val",
        d1: paramD1.value,
        d2: paramD2.value,
        vId: SelectedItem.value.ID,
      },

      onResponse: () => {
        isQuered.value = 0;
      },
      retry: 3,
      retryDelay: 500,
      timeout: 3000,
    }),
  {
    watch: [runQuery, SelectedItem],
    transform(input: any) {
      if (input && input.length > 0) {
        input.forEach((element: TValItem) => {
          let tmp = getItemByID(element.ID);
          element.Name = tmp.Name;
          element.CharCode = tmp.CharCode;
        });
      }
      //console.log(input);
      return input;
    },
    getCachedData(key, nuxtApp) {
      return nuxtApp.payload.data[key] || nuxtApp.static.data[key];
    },
  }
);

watchEffect(() => {
  const dt1 = new Date(date1.value);
  const dt2 = new Date(date2.value);
  const nowDate = new Date(Date.now());
  if (dt1 >= nowDate) {
    date1.value = Date_Add(nowDate, -offset2Week);
  }
  if (dt2 > nowDate) {
    date2.value = My_DateToString(nowDate);
  }
  if (dt1 > dt2) {
    //console.log("Меньше");

    date2.value = Date_Add(dt1, offset2Week);
    //console.log(date1.value, date2.value);
  } else if (dt2 > dt1) {
    //console.log("Больше");
  } else {
    date1.value = Date_Add(dt2, -offset2Week);
    //console.log(date1.value, date2.value);
  }
  paramD1.value = Date_Convert(date1.value);
  paramD2.value = Date_Convert(date2.value);
});
</script>

<template>
  <section class="mt-10">
    <div class="w-[48%] mx-auto">
      <form>
        <fieldset
          class="flex flex-wrap items-start justify-start xl:justify-center gap-8 border-[1px] border-slate-300 p-2 bg-slate-100 rounded-t-xl"
        >
          <legend
            class="font-inter text-[0.6rem]/[1rem] font-bold text-slate-500"
          >
            Запрос
          </legend>
          <label class="text-[0.7rem]/[1rem] font-bold">
            Дата начала:
            <input
              class="text-[.9rem]/[1.1rem] font-normal font-roboto outline-none p-2 border-b-[1px] bg-slate-200 rounded-lg text-sky-700 focus:bg-white focus:text-sky-600"
              type="date"
              name="d1"
              id="d1"
              v-model="date1"
            />
          </label>
          <label class="text-[0.7rem]/[1rem] font-bold">
            Дата окончания:
            <input
              class="text-[.9rem]/[1.1rem] font-normal font-roboto outline-none p-2 border-b-[1px] bg-slate-200 rounded-lg text-sky-700 focus:bg-white focus:text-sky-600"
              type="date"
              name="d2"
              id="d2"
              v-model="date2"
            />
          </label>
          <button
            class="text-[0.8rem]/[1rem] tracking-tighter uppercase bg-slate-700 rounded-lg text-white px-3 py-2 active:scale-90"
            type="submit"
            @click.prevent="
              () => {
                isQuered = 10;
              }
            "
          >
            Запрос
          </button>
        </fieldset>
      </form>
    </div>

    <section
      class="mt-10 w-full p-2 grid grid-cols-1 lg:grid-cols-[20%_80%] items-start gap-2"
    >
      <listValutes :list="props.data" />
      <div v-if="pending" class="w-fit mx-auto"><loadingComp /></div>
      <div v-else-if="!data || data.length < 1">
        Нет данных... Попробуйте повторить запрос.
      </div>
      <graphComp v-else :chart-data="data" />
    </section>
    <div v-if="error">Ошибка {{ error.message }}</div>
  </section>
</template>
