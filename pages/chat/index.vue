<script setup lang="ts">
import WebsocketClient from "./Websocket.client.vue";
import { useHead } from "@unhead/vue";

definePageMeta({
  layout: "main",
  middleware: "auth",
});

useHead({
  title: "Текстовый чат",
});
</script>

<template>
  <WebsocketClient />
</template>
