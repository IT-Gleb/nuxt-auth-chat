<script setup lang="ts">
import { Date_Format, PriceFormat } from "~/mylib";
import { useValuteStore } from "~/store/valutesStore";

const props = defineProps<{ data: TValuteData }>();
const isActive = ref<boolean>(false);
const activeIndex = ref<number>(-1);

const valuteStore = useValuteStore();
const { orderByPrice, orderByName, orderByCode, setSelIndex } = valuteStore;

const howSort = ref<boolean>(true);

const clickActive = (paramIndex: number) => {
  if (activeIndex.value === paramIndex) {
    return (isActive.value = false);
  }
  activeIndex.value = paramIndex;
  isActive.value = true;
  setSelIndex(activeIndex.value);
};
</script>

<template>
  <table class="table-auto border-separate border-spacing-1 mx-auto">
    <thead class="hidden lg:table-header-group">
      <tr class="bg-slate-700 text-white uppercase">
        <th class="p-2 rounded-lg">N/N</th>
        <th
          class="p-2 rounded-lg cursor-pointer"
          title="Сортировать по Коду"
          @click.prevent="
            () => {
              howSort = !howSort;
              orderByCode(howSort);
            }
          "
        >
          Код
        </th>
        <th
          class="p-2 rounded-lg cursor-pointer"
          title="Сортировать по наименованию"
          @click.prevent="
            () => {
              howSort = !howSort;
              orderByName(howSort);
            }
          "
        >
          Наименование
        </th>
        <th class="p-2 rounded-lg">Номинал</th>
        <th
          class="p-2 rounded-lg cursor-pointer"
          title="сортировать по цене"
          @click.prevent="
            () => {
              howSort = !howSort;
              orderByPrice(howSort);
            }
          "
        >
          Стоимость
        </th>
        <th class="p-2 rounded-lg">Предыдущая</th>

        <th class="p-2 rounded-lg">Дата</th>
      </tr>
    </thead>
    <thead class="hidden md:table-header-group lg:hidden">
      <tr class="bg-slate-700 text-white uppercase">
        <th
          class="p-2 rounded-lg cursor-pointer"
          title="Сортировать по Коду"
          @click.prevent="
            () => {
              howSort = !howSort;
              orderByCode(howSort);
            }
          "
        >
          Код
        </th>
        <th
          class="p-2 rounded-lg cursor-pointer"
          title="Сортировать по наименованию"
          @click.prevent="
            () => {
              howSort = !howSort;
              orderByName(howSort);
            }
          "
        >
          Наименование
        </th>
        <th class="p-2 rounded-lg">Номинал</th>
        <th
          class="p-2 rounded-lg"
          title="сортировать по цене"
          @click.prevent="
            () => {
              howSort = !howSort;
              orderByPrice(howSort);
            }
          "
        >
          Стоимость
        </th>
        <th class="p-2 rounded-lg">Предыдущая</th>
      </tr>
    </thead>
    <thead class="table-header-group md:hidden">
      <tr class="bg-slate-700 text-white uppercase">
        <th
          class="p-2 text-[0.8rem]/[1rem] rounded-lg cursor-pointer"
          title="Сортировать по Коду"
          @click.prevent="
            () => {
              howSort = !howSort;
              orderByCode(howSort);
            }
          "
        >
          Код
        </th>
        <th class="p-2 text-[0.8rem]/[1rem] rounded-lg">Номинал</th>
        <th
          class="p-1 rounded-lg cursor-pointer text-[0.8rem]/[1rem]"
          title="сортировать по цене"
          @click.prevent="
            () => {
              howSort = !howSort;
              orderByPrice(howSort);
            }
          "
        >
          Курс
        </th>
        <th class="p-2 text-[0.8rem]/[1rem] rounded-lg">Пред</th>
      </tr>
    </thead>
    <tbody class="hidden lg:table-row-group transition-all">
      <tr
        class="transition-all"
        v-for="(item, index) in props.data.data"
        :class="
          isActive && activeIndex === index
            ? 'bg-slate-800 text-lime-300'
            : 'even:bg-slate-100 odd:bg-slate-200'
        "
        :key="item.ID"
        @click.prevent="() => clickActive(index)"
      >
        <td class="text-center p-2 rounded-lg">
          {{ index + 1 }}
        </td>
        <td class="text-center p-2 rounded-lg">{{ item.CharCode }}</td>
        <td class="p-2 rounded-lg">{{ item.Name }}</td>
        <td class="p-2 text-right rounded-lg">{{ item.Nominal }}</td>
        <td class="p-2 rounded-lg text-right">{{ PriceFormat(item.Value) }}</td>
        <td
          class="p-2 rounded-lg text-right"
          :class="
            isActive && activeIndex === index
              ? 'text-white'
              : item.Previous - item.Value < 0 && activeIndex !== index
              ? 'text-red-700'
              : 'text-sky-700 font-bold'
          "
        >
          {{ PriceFormat(item.Previous) }}
        </td>

        <td class="p-2 rounded-lg">{{ Date_Format(item.Date) }}</td>
      </tr>
    </tbody>
    <tbody class="md:hidden transition-all">
      <tr
        class="transition-all text-[0.8rem]/[1rem]"
        :class="
          isActive && activeIndex === index
            ? 'bg-slate-800 text-lime-300'
            : 'even:bg-slate-100 odd:bg-slate-200'
        "
        v-for="(item, index) in props.data.data"
        :key="item.ID"
        @click.prevent="() => clickActive(index)"
      >
        <td class="text-center p-2 rounded-lg" :title="item.Name">
          {{ item.CharCode }}
        </td>
        <td class="p-2 text-right rounded-lg">{{ item.Nominal }}</td>
        <td class="p-2 rounded-lg text-right">{{ PriceFormat(item.Value) }}</td>
        <td
          class="p-2 rounded-lg text-right"
          :class="
            isActive && activeIndex === index
              ? 'text-white'
              : item.Previous - item.Value < 0 && activeIndex !== index
              ? 'text-red-700'
              : 'text-sky-700 font-bold'
          "
        >
          {{ PriceFormat(item.Previous) }}
        </td>
      </tr>
    </tbody>
    <tbody class="hidden md:table-row-group lg:hidden transition-all">
      <tr
        class="transition-all"
        v-for="(item, index) in props.data.data"
        :class="
          isActive && activeIndex === index
            ? 'bg-slate-800 text-lime-300'
            : 'even:bg-slate-100 odd:bg-slate-200'
        "
        :key="item.ID"
        @click.prevent="() => clickActive(index)"
      >
        <td class="text-center p-2 rounded-lg">{{ item.CharCode }}</td>
        <td class="p-2 rounded-lg">{{ item.Name }}</td>
        <td class="p-2 text-right rounded-lg">{{ item.Nominal }}</td>
        <td class="p-2 rounded-lg text-right">{{ PriceFormat(item.Value) }}</td>
        <td
          class="p-2 rounded-lg text-right"
          :class="
            isActive && activeIndex === index
              ? 'text-white'
              : item.Previous - item.Value < 0 && activeIndex !== index
              ? 'text-red-700'
              : 'text-sky-700 font-bold'
          "
        >
          {{ PriceFormat(item.Previous) }}
        </td>
      </tr>
    </tbody>
  </table>
</template>
