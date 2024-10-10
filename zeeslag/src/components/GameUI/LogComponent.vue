<template>
  <div class="bg-gray-800 p-4 rounded-md">
    <h2 class="font-bold mb-2">{{ title }}</h2>
    <ul class="space-y-1">
      <li v-for="(move, index) in moves" :key="index">{{ index + 1 }}: {{ move }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "LogComponent",
  props: {
    title: String,
    moves: Array,
  },
};
</script>
