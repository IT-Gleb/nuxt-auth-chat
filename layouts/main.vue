<script setup lang="ts">
import HeaderTop from "~/components/layouts/headerTop.vue";
import bottomPage from "~/components/layouts/bottomPage.vue";
</script>

<template>
  <div>
    <NuxtLoadingIndicator :height="5" />

    <HeaderTop></HeaderTop>
    <main>
      <slot />
    </main>
    <bottomPage></bottomPage>
  </div>
</template>
