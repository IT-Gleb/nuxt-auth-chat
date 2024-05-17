<script setup lang="ts">
const props = defineProps(["paramId", "paramPlaceHolder"]);
const theEmit = defineEmits(["update:password", "blur"]);

const passOneRef = ref<HTMLInputElement>();
const pass1 = defineModel<string>("password");
const eyeVar = ref<boolean>(false);

const clickEye = (event: Event) => {
  event.preventDefault();
  if (pass1.value) {
    if (pass1.value.length > 0) {
      eyeVar.value = !eyeVar.value;
    }
  }
  if (passOneRef.value) {
    passOneRef.value.focus();
  }
};
</script>

<template>
  <div class="flex items-center justify-start gap-1 relative">
    <nuxt-icon class="absolute left-1 top-2" name="password" filled />
    <input
      ref="passOneRef"
      class="w-full outline-none bg-slate-100 border-b-2 border-b-slate-400/40 p-1 pl-8 pr-6 focus:border-b-black focus:bg-slate-100 focus:text-black placeholder:text-[0.9rem]/[1.2rem] placeholder:text-slate-500"
      :type="eyeVar ? 'text' : 'password'"
      :name="props.paramId"
      :id="props.paramId"
      :placeholder="props.paramPlaceHolder"
      autocomplete="off"
      :value="pass1"
      @input="(event:Event) => theEmit('update:password', (event.currentTarget as HTMLInputElement).value)"
      @blur="theEmit('blur')"
    />
    <nuxt-icon
      class="absolute right-1 top-2 cursor-pointer"
      :name="eyeVar ? 'eye-closed' : 'eye'"
      filled
      @click.prevent="clickEye"
    />
  </div>
</template>
