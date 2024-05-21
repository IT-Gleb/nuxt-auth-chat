<script setup lang="ts">
import { useWsClientStore } from "~/store/wsClientStore";
import clientId from "./clientId.vue";
import { useAuthStore } from "~/store/authStore";
import clientsOnChat from "~/components/clientsOnChat.vue";
import { WSfromUrl } from "~/mylib";

const history = ref<string[]>([]);
const textData = ref<string>("");
const authStore = useAuthStore();
const store = useWsClientStore();
const { ClientMessage, getIsClient } = storeToRefs(store);
const { setClientMessage } = store;

const { isAuth } = storeToRefs(authStore);
// `ws://localhost:3000/api/websocket?user=${ClientMessage.value.name}`
const wsUrl = WSfromUrl(import.meta.url);

const WSAddr = ref<string>(
  `${wsUrl}api/myChat?new=all&user=${ClientMessage.value.name}`
);
//console.log(WSAddr.value);

const timerRef = ref<any>(-1);
const sectionRef = ref<HTMLDivElement>();
const ListClients = ref<TClient[]>([]);

const { send, data, status, open, close } = useWebSocket(WSAddr.value, {
  immediate: true,
  autoReconnect: true,
});

const ScrollToDiv = () => {
  if (timerRef.value > 0) {
    clearTimeout(timerRef.value);
    timerRef.value = -1;
  }
  timerRef.value = setTimeout(() => {
    let div1 = document.getElementById(`${history.value.length - 1}`);
    //console.log(div1);
    div1?.scrollIntoView(false);
  }, 1000);
};

const sendData = () => {
  // let message: TClientMessage = { message: textData.value };
  // send(JSON.stringify(message));
  setClientMessage(textData.value);
  if (status.value === "OPEN") {
    history.value.push(JSON.stringify(ClientMessage.value));
    send(JSON.stringify(ClientMessage.value));

    ScrollToDiv();
  }
  textData.value = "";
};

watch(data, (newValue: any) => {
  if (status.value === "OPEN") {
    //let ChatMessage: TClientMessage = JSON.parse(newValue);
    //Если пришел список клиентов
    let clients: any = JSON.parse(newValue);
    if (Array.isArray(clients) && clients.length > 0) {
      let fromServer = (clients[0] as TClient).isFromServer;
      if (fromServer) {
        ListClients.value = Array.from(clients);
        return;
      }
    }
    //Проверить на Покинул чат
    let cancelChat: TClientMessage = JSON.parse(newValue);
    if (cancelChat && cancelChat.message.includes("Покинул чат")) {
      ListClients.value = ListClients.value.filter(
        (item) => item.id !== cancelChat.id
      );
      //console.log(ListClients.value);
    }

    //Если пришло простое сообщение
    history.value.push(newValue);
    ScrollToDiv();
    return;
  }
});

const CloseHandler = () => {
  // setClientMessage("Покинул чат");
  // send(JSON.stringify(ClientMessage.value));
  // history.value = [];
  // history.value.push(JSON.stringify(ClientMessage.value));
  // clearClient();
  // close();
  if (timerRef.value > 0) {
    clearTimeout(timerRef.value);
    timerRef.value = -1;
  }
  close();
  //open();
};

watch(getIsClient, () => {
  if (getIsClient.value) {
    setClientMessage("Вошел в чат");
    //console.log(ClientMessage.value);
    //WSAddr.value = `ws://localhost:3000/api/websocket?user=${ClientMessage.value.name}`;
    //open();
    if (status.value === "CLOSED") {
      //console.log(WSAddr.value);
      open();
    }
    send(JSON.stringify(ClientMessage.value));
    history.value.push(JSON.stringify(ClientMessage.value));
  }
});

function onScroll() {
  if (sectionRef.value) {
    sectionRef.value.scrollIntoView(false);
  }
}

onMounted(() => {
  //open();
  window.addEventListener("scroll", onScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", onScroll);
  //close();
});
</script>

<template>
  <div
    class="container mx-auto grid grid-cols-1 xl:grid-cols-[20%_80%] gap-2 items-start"
  >
    <div>
      <span
        >Статус:
        <span class="text-sky-700 text-[0.8rem]/[1rem]">{{
          status === "OPEN" ? "Подключено" : "???"
        }}</span></span
      >
      <clientsOnChat :usersOnChat="ListClients" />
    </div>
    <!-- <div v-if="data">{{ data }}</div> -->
    <clientId v-if="status === 'CLOSED' && !isAuth" />
    <section
      v-if="status === 'OPEN' && isAuth"
      class="w-full lg:w-[80%] mx-auto p-1"
    >
      <h3 class="w-fit mx-auto mt-2">
        <span class="font-bold font-roboto">{{ ClientMessage.name }}</span
        >! Добро пожаловать в Чат!
      </h3>
      <div
        class="w-full lg:w-[80%] mx-auto mt-10 h-[calc(50vh-5vh)] flex flex-col items-start gap-2 overflow-x-hidden overflow-y-auto"
      >
        <div
          v-for="(entries, index) in history"
          :key="index"
          class="w-full p-2 rounded-xl flex flex-col items-start gap-4"
          :id="String(index)"
          :class="
            JSON.parse(entries).name.includes(ClientMessage.name)
              ? 'text-sky-800 bg-green-100 text-left '
              : 'bg-sky-100 text-sky-900'
          "
        >
          <span
            class="font-bold text-[0.8rem]/[1rem]"
            :class="
              JSON.parse(entries).name.includes(ClientMessage.name)
                ? 'text-sky-950'
                : 'text-yellow-600'
            "
            >{{ JSON.parse(entries).name }}</span
          >
          <div class="w-full p-1 font-roboto flex-auto">
            {{ JSON.parse(entries).message }}
          </div>
          <span class="w-fit ml-auto text-[0.6rem]/[1rem] text-sky-600">{{
            JSON.parse(entries).messageDate
          }}</span>
        </div>
      </div>
      <div
        ref="sectionRef"
        v-if="status === 'OPEN'"
        class="w-full lg:w-[80%] mx-auto p-1 mt-10"
      >
        <form action="#" @submit.prevent="sendData">
          <fieldset class="flex items-start gap-1">
            <input
              class="w-full p-2 outline-none border-2 border-slate-300/50 rounded-md placeholder:text-[0.75rem]/[1rem] placeholder:text-slate-400/60"
              type="text"
              maxlength="100"
              name="textData"
              id="textData"
              v-model="textData"
              autocomplete="off"
              placeholder="не более 100 символов..."
            />
            <button
              class="p-2 w-fit h-[40px] rounded-lg bg-slate-800 text-white active:scale-90 text-[0.8rem]/[1rem]"
              type="submit"
            >
              Отправить
            </button>
          </fieldset>
        </form>
        <!-- <button
          v-if="status === 'OPEN'"
          class="w-fit px-2 py-2 rounded-lg mt-2 bg-slate-800 text-white text-[0.8rem]/[1rem] active:scale-90"
          @click.prevent="CloseHandler"
        >
          Обновить
        </button> -->
      </div>
    </section>
  </div>
</template>
