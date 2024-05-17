import { defineStore } from "pinia";
import { nowDate } from "~/mylib";
import { useAuthStore } from "./authStore";

export const useWsClientStore = defineStore("wsClient", () => {
  const authStore = useAuthStore();

  const ClientMessage = ref<TClientMessage>({
    id: "",
    name: "",
    message: "",
    messageDate: "",
  });
  ClientMessage.value.name =
    authStore.email !== undefined ? authStore.email : "";
  const isClientSet = ref<boolean>(false);

  const getIsClient = computed(() => {
    return isClientSet.value;
  });

  function setClient(param: TClientMessage) {
    if (param) {
      ClientMessage.value.id = param.id;
      if (ClientMessage.value.name === "") {
        ClientMessage.value.name = param.name;
      }
      ClientMessage.value.messageDate = nowDate();
      isClientSet.value =
        ClientMessage.value.id.trim().length > 10 &&
        ClientMessage.value.name.trim().length > 3;
    }
    // console.log(isClientSet.value, ClientMessage.value);
  }

  function setClientMessage(param: string) {
    if (param) {
      ClientMessage.value.message = param;
      ClientMessage.value.messageDate = nowDate();
    }
  }

  function setDisableClient() {
    isClientSet.value = false;
  }

  function clearClient() {
    isClientSet.value = false;
    ClientMessage.value.id = "";
    ClientMessage.value.name =
      authStore.email !== undefined ? authStore.email : "";
    ClientMessage.value.message = "";
    ClientMessage.value.messageDate = "";
  }

  return {
    ClientMessage,
    getIsClient,
    setClient,
    setClientMessage,
    setDisableClient,
    clearClient,
  };
});
