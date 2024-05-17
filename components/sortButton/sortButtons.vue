<script setup lang="ts">
import { useValuteStore } from "~/store/valutesStore";

const store = useValuteStore();
const { orderByName, orderByCode, orderByPrice } = store;

const isSorted = ref<boolean>(false);
</script>

<template>
  <div class="flex items-center gap-2 px-1">
    <button
      class="p-1 bg-slate-400/25 rounded-sm active:scale-90"
      title="По Наименованию"
      @click.prevent="
        () => {
          isSorted = !isSorted;
          orderByName(isSorted);
        }
      "
    >
      <nuxt-icon name="sort-by-a" filled></nuxt-icon>
    </button>
    <button
      class="p-1 bg-slate-400/25 rounded-sm active:scale-90"
      title="По Code"
      @click.prevent="
        () => {
          isSorted = !isSorted;
          orderByCode(isSorted);
        }
      "
    >
      <nuxt-icon name="sort-aug" filled></nuxt-icon>
    </button>
    <button
      class="p-1 bg-slate-400/25 rounded-sm active:scale-90"
      title="По Цене"
      @click.prevent="
        () => {
          isSorted = !isSorted;
          orderByPrice(isSorted);
        }
      "
    >
      <nuxt-icon name="sort-price" filled></nuxt-icon>
    </button>
  </div>
</template>
