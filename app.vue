<script setup lang="ts"></script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<style>
/* .layout-enter-active,
.layout-leave-active {
  transition: all 0.4s;
}
.layout-enter-from,
.layout-leave-to {
  opacity: 0;
  filter: blur(1rem);
} */
.page-enter-active,
.page-leave-active {
  transition: all 0.35s ease;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1.5rem);
}
</style>
