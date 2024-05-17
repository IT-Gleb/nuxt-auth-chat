<script setup lang="ts">
import { Number_Format } from "~/mylib";
import { useValuteStore } from "~/store/valutesStore";

const store = useValuteStore();
const { SelectedItem } = storeToRefs(store);

const Rubval = ref<string>(
  SelectedItem.value.Nominal > 100
    ? (SelectedItem.value.Value / SelectedItem.value.Nominal).toFixed(5)
    : (SelectedItem.value.Value / SelectedItem.value.Nominal).toFixed(2)
);
const Valval = ref<string>("1");
const isRubActive = ref<boolean>(false);
const isValActive = ref<boolean>(false);

watch(SelectedItem, () => {
  Valval.value = "1";

  Rubval.value =
    SelectedItem.value.Nominal > 100
      ? (SelectedItem.value.Value / SelectedItem.value.Nominal).toFixed(5)
      : (SelectedItem.value.Value / SelectedItem.value.Nominal).toFixed(2);
  isRubActive.value = false;
  isValActive.value = false;
});

watch(Rubval, () => {
  let nominal: number = SelectedItem.value.Nominal;
  let num: number = 1;
  if (isRubActive.value) {
    num = Number(Rubval.value);
    if (nominal === 1) {
      num /= SelectedItem.value.Value;

      //console.log(num);
      //      Valval.value = Number_Format(num);
    } else {
      // num /= SelectedItem.value.Value;
      // num *= nominal;
      num = (num / SelectedItem.value.Value) * nominal;
    }
    Valval.value = Number_Format(num);
  }
});

watch(Valval, () => {
  let nominal: number = SelectedItem.value.Nominal;
  let num: number = 1;
  if (isValActive.value) {
    num = Number(Valval.value);
    if (nominal === 1) {
      num *= SelectedItem.value.Value;
    } else {
      num = (SelectedItem.value.Value * num) / nominal;
    }
    Rubval.value = Number_Format(num);
  }
});
</script>

<template>
  <div>
    <form action="#" @submit="(e) => e.preventDefault">
      <fieldset
        class="w-full p-2 border-2 border-slate-300/70 rounded-xl flex flex-col gap-4"
      >
        <legend class="font-roboto font-bold text-[0.8rem]/[1rem]">
          Рассчитать
        </legend>
        <label
          class="font-inter text-[0.8rem]/[1rem]"
          :class="isRubActive ? 'font-bold' : ''"
          >RUB
          <input
            class="w-full outline-none border-2 border-slate-300/50 rounded-lg px-2 py-1 text-[1rem]/[1.4rem] font-normal focus:font-bold focus:bg-green-100/60"
            type="number"
            name="rubId"
            id="rubId"
            min="0"
            v-model="Rubval"
            @focus="
              () => {
                isRubActive = true;
                isValActive = false;
              }
            "
          />
        </label>

        <label
          class="font-inter text-[0.8rem]/[1rem]"
          :class="isValActive ? 'font-bold' : ''"
        >
          {{ SelectedItem.CharCode }}
          <input
            class="w-full outline-none border-2 border-slate-300/50 rounded-lg px-2 py-1 text-[1rem]/[1.4rem] font-normal focus:font-bold focus:bg-green-100/60"
            type="number"
            name="rubId"
            id="rubId"
            min="0"
            v-model="Valval"
            @focus="
              () => {
                isRubActive = false;
                isValActive = true;
              }
            "
          />
        </label>
        <span class="text-[0.7rem]/[1rem] w-full text-right"
          >За {{ SelectedItem.Nominal }} едениц(-цу)</span
        >
      </fieldset>
    </form>
  </div>
</template>
