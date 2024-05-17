<script setup lang="ts">
import { useCardStore } from "~/store/cardStore";

const store = useCardStore();
const { setData } = store;
</script>

<template>
  <div class="flex items-start gap-2">
    <button
      class="p-2 min-w-[32px] h-[32px] rounded-md bg-slate-100 border-[1px] border-slate-300 active:scale-90"
      title="Карточка"
      @click.prevent="() => setData(0)"
    >
      <nuxt-icon name="card-2" filled></nuxt-icon>
    </button>
    <button
      class="p-2 min-w-[32px] h-[32px] rounded-md bg-slate-100 border-[1px] border-slate-300 active:scale-90"
      title="Таблица"
      @click.prevent="() => setData(1)"
    >
      <nuxt-icon name="table" filled></nuxt-icon>
    </button>
    <button
      class="p-2 min-w-[32px] h-[32px] rounded-md bg-slate-100 border-[1px] border-slate-300 active:scale-90"
      title="Список"
      @click.prevent="() => setData(2)"
    >
      <nuxt-icon name="list" filled></nuxt-icon>
    </button>
  </div>
</template>
