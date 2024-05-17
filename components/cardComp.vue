<script setup lang="ts">
import { Date_Format, PriceFormat } from "~/mylib";
const props = defineProps<{ data: TValutaItem; nn: number }>();
const isActive = ref<boolean>(false);
</script>

<template>
  <article
    class="w-[300px] md:max-w-[380px] min-h-[30dvh] font-inter transition-all flex flex-col items-start border-[1px] border-slate-300 rounded-xl overflow-hidden"
    :class="
      isActive
        ? 'text-slate-300 bg-slate-950 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-slate-200/80 from-[-40%] via-blue-100/40 to-transparent'
        : 'bg-white'
    "
    @mouseenter="() => (isActive = true)"
    @mouseleave="() => (isActive = false)"
  >
    <header
      class="w-[100%] h-[5dvh] uppercase text-[0.7rem]/[1.2rem] border-b-[1px] border-b-slate-300 p-2 text-center font-bold overflow-hidden"
      :class="isActive ? 'text-green-200' : 'text-black'"
    >
      {{ props.nn + 1 }}. {{ props.data.Name }}
    </header>
    <div
      class="w-full flex-auto p-2 font-roboto text-[0.9rem]/[1.2rem] font-[200] hover:text-slate-300"
    >
      <div>
        <span>Данные на:</span>
        <div
          class="text-right text-[0.9rem]/[1.3rem] tracking-tighter"
          :class="isActive ? 'text-yellow-200' : 'text-black'"
        >
          {{ Date_Format(props.data.Date) }}
        </div>
      </div>
      <div>
        <span>Номинал:</span>
        <div
          class="text-right text-[1.5rem]/[2rem] tracking-tighter font-bold"
          :class="isActive ? 'text-yellow-300' : 'text-black'"
        >
          {{ props.data.Nominal }}
        </div>
      </div>
      <div>
        <span>Предыдущая стоимость:</span>
        <div
          class="text-[1.8rem]/[2.8rem] text-right"
          :class="isActive ? 'text-yellow-300' : 'text-black'"
        >
          {{ PriceFormat(Number(props.data.Previous)) }}
        </div>
      </div>
      <div>
        <span>Стоимость номинала:</span>
        <div
          class="text-[2.5rem]/[3rem] text-right"
          :class="isActive ? 'text-yellow-300' : 'text-black'"
        >
          {{ PriceFormat(props.data.Value) }}
        </div>
      </div>
      <dl>
        <dt>Код валюты:</dt>
        <dd
          class="text-[0.9rem]/[1.3rem] text-right"
          :class="isActive ? 'text-yellow-300' : 'text-black'"
        >
          {{ props.data.NumCode }}
        </dd>
      </dl>
    </div>
    <footer
      class="w-[100%] min-h-[3dvh] border-t-[1px] border-t-slate-300 p-1 text-center font-semibold flex justify-center gap-4"
      :class="isActive ? 'text-yellow-500' : 'text-black'"
    >
      <div>{{ props.data.CharCode }}</div>
      <div>
        разница:
        {{ PriceFormat(props.data.Value - props.data.Previous) }}
      </div>
    </footer>
  </article>
</template>
