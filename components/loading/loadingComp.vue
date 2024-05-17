<script setup lang="ts"></script>

<template>
  <div class="w-fit mx-auto p-2 flex flex-col justify-center gap-2">
    <div class="w-fit mx-auto animate-spin">
      <nuxt-icon name="loading-2" filled></nuxt-icon>
    </div>
    <span
      class="animate-pulse text-[0.8rem]/[1.2rem] font-roboto font-extrabold"
    >
      Загрузка и обработка данных...
    </span>
  </div>
</template>
