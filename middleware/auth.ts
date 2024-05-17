import { storeToRefs } from "pinia";
import { useAuthStore } from "~/store/authStore";

const store = useAuthStore();

const { isAuth } = storeToRefs(store);

export default defineNuxtRouteMiddleware((to, from) => {
  if (to.params.id !== "") {
    //console.log(to.params.id);
    if (!isAuth.value) {
      return navigateTo("/login");
    }
    return;
  }
});
