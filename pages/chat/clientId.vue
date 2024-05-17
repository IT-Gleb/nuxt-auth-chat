<script setup lang="ts">
import { useWsClientStore } from "~/store/wsClientStore";

const ClientName = ref<string>("");
const textRef = ref<HTMLInputElement>();
const status = ref<string>("Имя должно быть больше 3-х символов...");
const store = useWsClientStore();

const { setClient, setDisableClient } = store;

function onSubmit(event: Event) {
  setDisableClient();

  if (ClientName.value.trim().length > 3) {
    let client: TClientMessage = {
      id: crypto.randomUUID(),
      name: ClientName.value,
      message: "",
      messageDate: "",
    };

    setClient(client);
  } else {
    textRef.value?.focus();
  }
}
</script>

<template>
  <div class="container mx-auto mt-10">
    <form class="w-[50%] mx-auto" action="#" @submit.prevent="onSubmit">
      <fieldset class="flex flex-col gap-3 items-start">
        <label class="flex flex-col gap-2 items-start">
          <span class="text-[0.6rem]/[1rem] uppercase font-bold font-poppins"
            >Представтесь:</span
          >
          <input
            ref="textRef"
            class="px-2 py-1 outline-none border-2 border-slate-300/50 rounded-lg"
            type="text"
            name="clientName"
            id="clientName"
            max="50"
            autocomplete="off"
            v-model="ClientName"
          />
          <span
            v-if="ClientName.trim().length < 4"
            class="text-[0.7rem]/[1rem] text-blue-700"
            >{{ status }}</span
          >
        </label>
        <button
          class="px-2 py-1 bg-slate-800 text-white text-[0.7rem]/[1rem] rounded-md active:scale-90"
          type="submit"
        >
          Войти
        </button>
      </fieldset>
    </form>
  </div>
</template>
