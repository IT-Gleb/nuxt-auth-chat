<script setup lang="ts">
import { useAuthStore } from "~/store/authStore";

const route = useRoute();
const auth = useAuthStore();

const { isAuth, email } = storeToRefs(auth);

const toLink = ref<string>("");

function generateLink(): string {
  let res: string = "";
  res = "/" + String(Math.floor(Math.random() * (1000 - 100)) + 100);
  return res;
}

onMounted(() => {
  toLink.value = generateLink();
});
//console.log(route.fullPath);
</script>

<template>
  <header
    class="min-h-[10vh] w-[100%] bg-gradient-to-b from-slate-900 from-20% to-slate-400 text-white flex flex-col"
  >
    <section
      class="container mx-auto p-2 font-roboto font-light text-[1.2rem]/[2rem] flex-[1_0_auto]"
    >
      <nav class="mt-5 w-fit mx-auto">
        <ul class="flex items-start justify-start gap-x-12 md:gap-x-24">
          <li>
            <NuxtLink to="/" exact>
              <div class="flex items-center justify-start gap-2">
                <nuxt-icon
                  name="close-list-numbered"
                  :filled="route.fullPath !== '/'"
                />
                <span class="hidden md:inline">One</span>
              </div>
            </NuxtLink>
          </li>
          <li>
            <NuxtLink :to="toLink">
              <div class="flex items-center justify-start gap-2">
                <nuxt-icon
                  name="world"
                  :filled="route.fullPath !== `${toLink}`"
                />
                <span class="hidden md:inline">Валюты</span>
              </div>
            </NuxtLink>
          </li>
          <li v-if="!isAuth">
            <NuxtLink to="/login">
              <div class="flex items-center justify-start gap-2">
                <nuxt-icon name="user" :filled="route.fullPath !== '/login'" />
                <span class="hidden md:inline">Login</span>
              </div>
            </NuxtLink>
          </li>
          <li v-if="isAuth">
            <NuxtLink to="/chat">
              <div class="flex items-center justify-start gap-2">
                <nuxt-icon name="chat" :filled="route.fullPath !== '/chat'" />
                <span class="hidden md:inline"> Чат </span>
              </div>
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/about">
              <div class="flex items-center justify-start gap-2">
                <nuxt-icon
                  name="map-edit"
                  :filled="route.fullPath !== '/about'"
                />
                <span class="hidden md:inline"> About </span>
              </div>
            </NuxtLink>
          </li>
          <li v-if="isAuth">
            <div class="xl:ml-[400px] flex gap-3 text-[0.75rem]/[1.2rem] mt-2">
              <nuxt-icon name="user" filled></nuxt-icon>
              <span class="hidden lg:inline">{{ email }} </span>
            </div>
          </li>
        </ul>
      </nav>
    </section>
    <section class="w-[100%] h-[2dvh] bg-slate-300"></section>
  </header>
</template>

<style scoped>
.router-link-active,
.router-link-exact-active {
  @apply text-lime-400;
}
.nuxt-icon svg {
  @apply w-[16px] h-[16px] text-lime-400;
}
</style>
