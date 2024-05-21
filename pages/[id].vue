<script setup lang="ts">
import loadingComp from "~/components/loading/loadingComp.vue";
import { useCardStore } from "~/store/cardStore";
import { useValuteStore } from "~/store/valutesStore";
import { createHead } from "unhead";
import { useHead } from "@unhead/vue";
import { HttpfromUrl } from "~/mylib";

const head = createHead();

definePageMeta({
  layout: "main",
  middleware: "auth",
});

const route = useRoute();
useHead({
  title: `Страница-${route.params.id}`,
  meta: [
    {
      name: "keywords",
      content: "валюта, курс, изменение курса, рубль",
    },
    {
      name: "author",
      content: "Gleb Torgashin",
    },
  ],
});

const store = useCardStore();
const { howData } = storeToRefs(store);

const valuteStore = useValuteStore();
const { setList } = valuteStore;
const { valutesList } = storeToRefs(valuteStore);

const valPath = HttpfromUrl(import.meta.url);
//console.log(valPath);

const {
  data: valutes,
  pending,
  error,
  refresh,
} = await useAsyncData("valutes", () => $fetch(`${valPath}/api/valutes`), {
  transform(input: any) {
    //console.log(input);
    if (input) {
      setList(input.data as TValutaItem[]);
    }
    return input;
  },
  getCachedData(key, nuxtApp) {
    return nuxtApp.payload.data[key] || nuxtApp.static.data[key];
  },
});

// if (!valutes.value?.error) {
//   if (valutes.value) {
//     setList(valutes.value.data as TValutaItem[]);
//   }
// }
//console.log(valutesList.value);
</script>

<template>
  <div v-if="pending" class="w-fit mx-auto"><loadingComp /></div>
  <div v-else-if="error || valutes?.error">
    Ошибка - {{ valutes?.error }} {{ error?.message }}
  </div>
  <section v-else class="mt-10">
    <div
      class="flex items-start justify-between flex-wrap gap-2 p-2 border-b-2 border-b-slate-900/60"
    >
      <h3 class="text-[2rem]/[2.5rem] font-semibold font-inter">
        Страница - [{{ route.params.id }}]
      </h3>
      <ListInputList />
      <button
        class="bg-slate-800 text-white text-[0.75rem]/[1rem] tracking-tighter p-2 rounded-md active:scale-90"
        @click="async () => await refresh()"
      >
        Обновить
      </button>
    </div>

    <div v-if="!pending && valutes">
      <TableComp v-if="howData === 1" class="mt-10" :data="valutesList" />
      <div
        v-if="howData === 0"
        class="w-[99%] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 mt-10"
      >
        <CardComp
          v-for="(item, index) in valutesList.data"
          :key="item.ID"
          :data="item"
          :nn="index"
        />
      </div>
      <ListgraphComp v-if="howData === 2" :data="valutesList.data" />
    </div>
  </section>
</template>
