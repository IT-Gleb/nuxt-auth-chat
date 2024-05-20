<script setup lang="ts">
import WebsocketClient from "./Websocket.client.vue";
import { useHead } from "@unhead/vue";

definePageMeta({
  layout: "main",
  middleware: "auth",
});

useHead({
  title: "Текстовый чат",
  meta: [
    {
      name: "author",
      content: "Gleb Torgashin",
    },
    {
      name: "keywords",
      content: "chat, text, answers",
    },
  ],
});
</script>

<template>
  <WebsocketClient />
</template>
