<script setup lang="ts">
import PassInput from "../components/input/passInput.vue";
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/yup";
import * as yup from "yup";
import { useAuthStore } from "~/store/authStore";

definePageMeta({
  layout: "main",
});

yup.setLocale({
  mixed: {
    default: "Поле заполнено не верно",
    required: "Поле обязательно ",
    oneOf: (params) => `Поле должно быть = ${params.label}`,
  },

  string: {
    email: () => "Не верный e-mail",
    min: (params) => `Поле должно быть больше ${params.min}`,
  },
});

const schema = toTypedSchema(
  yup.object({
    email: yup.string().required().min(6).email(),
    password1: yup.string().required().min(8).label("Я первый пароль"),
    password2: yup
      .string()
      .label("предыдущему паролю")
      .required()
      // .oneOf([yup.ref("password1")]),

      .oneOf([yup.ref("password1")]),
  })
);

const { errors, defineField, handleSubmit, meta, setFieldValue } = useForm({
  validationSchema: schema,
});

const emailRef = ref<HTMLInputElement>();
//const email = ref<string>("");
const [email, emailAttr] = defineField("email");
const [password1, password1Attr] = defineField("password1");
const [password2, password2Attr] = defineField("password2");

const store = useAuthStore();
const { SetValues } = store;

const clickEmailClear = () => {
  if (emailRef.value) {
    email.value = "";
    emailRef.value.focus();
  }
};
const onSubmit = handleSubmit((values) => {
  alert(JSON.stringify(values, null, 3));
  SetValues(email.value, password1.value);

  setFieldValue("password1", "");
  setFieldValue("password2", "");
  setFieldValue("email", "");
  navigateTo("/");
});
</script>

<template>
  <section class="w-[100%] mt-10 font-inter p-2">
    <h3 class="text-[2rem]/[2.5rem] font-bold">Страница регистрации</h3>
    <form class="w-fit mx-auto mt-[5%] bg-slate-50" @submit="onSubmit">
      <div
        class="w-[100%] h-[60px] relative overflow-hidden border-t-[1px] border-l-[1px] border-r-[1px] border-slate-400 rounded-t-xl text-center"
      >
        <div class="w-[100%] h-[30px] bg-slate-200"></div>
        <div
          class="w-[200px] h-[60px] pr-3 pt-3 text-center absolute left-0 top-0 bg-slate-200 rounded-ee-full"
        >
          <span class="uppercase font-mono font-medium text-slate-500"
            >Регистрация</span
          >
        </div>
      </div>
      <fieldset
        class="w-full md:w-[480px] lg:w-[640px] overflow-hidden border-l-[1px] border-r-[1px] border-b-[1px] border-slate-400 rounded-b-xl bg-slate-100 shadow-[0_4px_8px_1px_rgba(127,127,127,0.25)]"
      >
        <!-- <legend
          class="text-[0.9rem]/[1.2rem] font-mono font-medium"
          align="center"
        >
          Регистрация
        </legend> -->

        <div class="p-4">
          <div>
            <div class="flex items-center justify-start gap-1 relative">
              <nuxt-icon
                class="absolute left-1 top-2"
                name="email"
                filled
                @click.prevent="
                  () => {
                    if (emailRef) {
                      emailRef.focus();
                    }
                  }
                "
              />
              <input
                ref="emailRef"
                class="w-full outline-none bg-slate-100 border-b-2 border-b-slate-400/40 p-1 pl-8 pr-6 focus:border-b-black focus:bg-slate-100 focus:text-black placeholder:text-[0.9rem]/[1.2rem] placeholder:text-slate-500"
                type="email"
                name="email1"
                id="email1"
                placeholder="e-mail..."
                autocomplete="off"
                v-model="email"
                v-bind="emailAttr"
              />
              <nuxt-icon
                v-if="email && String(email).length > 3"
                class="absolute right-1 top-2 cursor-pointer"
                name="cross"
                filled
                @click.prevent="clickEmailClear"
              />
            </div>
            <span class="text-red-600 text-[0.8rem]/[1.2rem]">{{
              errors.email
            }}</span>
          </div>
          <div>
            <PassInput
              class="mt-5"
              paramId="pass1"
              paramPlaceHolder="введите пароль"
              v-model:password="password1"
              v-bind="password1Attr"
            />
            <span class="text-red-600 text-[0.8rem]/[1.2rem]">{{
              errors.password1
            }}</span>
          </div>
          <div>
            <PassInput
              class="mt-5"
              paramId="pass2"
              paramPlaceHolder="повторите пароль"
              v-model:password="password2"
              v-bind="password2Attr"
            />
            <span class="text-red-600 text-[0.8rem]/[1.2rem]">{{
              errors.password2
            }}</span>
          </div>
        </div>
        <div
          class="mt-10 text-[0.8rem]/[1.2rem] h-[30px] bg-slate-200 relative"
        >
          <div
            class="max-w-[200px] h-[75px] rounded-tl-full p-6 px-[68px] absolute right-0 bottom-0 bg-slate-200"
          >
            <input
              class="w-[100px] bg-slate-700 px-3 py-2 rounded-lg text-white uppercase disabled:bg-slate-300 disabled:text-slate-100 cursor-pointer disabled:pointer-events-none disabled:cursor-auto hover:-translate-y-1 active:scale-95"
              type="submit"
              value="войти"
              :disabled="!meta.valid"
            />
          </div>
        </div>
      </fieldset>
    </form>
  </section>
</template>
