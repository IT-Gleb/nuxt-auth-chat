<script setup lang="ts">
import { HttpfromUrl } from "~/mylib";

definePageMeta({
  layout: "main",
});

const path_to_ico = ref<string>(HttpfromUrl(import.meta.env.BASE_URL));

useHead({
  title: "Главная страница",
  htmlAttrs: {
    lang: "ru",
  },
  link: [
    {
      rel: "icon",
      type: "image/x-icon",
      href: `${path_to_ico.value}favicon.ico`,
    },
  ],
  meta: [
    {
      name: "description",
      content: "fdk jkfjdkjgkj gkfkgj kk jkf/. By Gleb Torgashin. 2024",
    },
    {
      name: "keywords",
      content: "word, text, back, menu",
    },
    {
      name: "author",
      content: "Gleb Torgashin",
    },
    {
      charset: "utf-8",
    },
  ],
});
</script>

<template>
  <section class="mt-10 p-2">
    <h2 class="text-[2rem]/[2.4rem] font-bold">Главная страница</h2>
  </section>
</template>
