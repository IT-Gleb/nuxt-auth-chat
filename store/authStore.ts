import { defineStore } from "pinia";

interface IAuthStore {
  isAuth: boolean;
  email: string | undefined;
  password: string | undefined;
  setValues: (
    paramEmail: string | undefined,
    paramPassword: string | undefined
  ) => void;
}

export const useAuthStore = defineStore("login", () => {
  const isAuth = ref<boolean>(false);
  const email = ref<string | undefined>("");
  const password = ref<string | undefined>("");

  function SetValues(
    paramEmail: string | undefined,
    paramPassword: string | undefined
  ) {
    email.value = paramEmail;
    password.value = paramPassword;
    isAuth.value = false;
    if (email.value && password.value) {
      isAuth.value =
        email.value.trim().length > 6 && password.value.trim().length > 6;
    }
  }

  return {
    isAuth,
    email,
    password,
    SetValues,
  };
});
