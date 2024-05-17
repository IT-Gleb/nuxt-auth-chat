<script setup lang="ts">
const props = defineProps<{ usersOnChat: TClient[] }>();
</script>

<template>
  <div v-if="props.usersOnChat.length > 0" class="p-2 flex-col gap-2">
    <span class="text-[0.8rem]/[1rem]">Сечас в чате:</span>
    <ul class="p-2 border-2 border-slate-300/50">
      <li
        v-for="user in props.usersOnChat"
        :key="user.id"
        class="p-1 text-green-700 odd:text-green-600 text-[0.9rem]/[1rem]"
      >
        {{ user.name }}
      </li>
    </ul>
  </div>
</template>
