<template>
  <header class="flex justify-between items-center bg-gray-800 p-4 rounded-md">
    <div class="flex items-center space-x-4">
      <div class="w-10 h-10 bg-gray-700 rounded-full"></div> <!-- Placeholder for avatar -->
      <span>{{ player1 }}</span>
    </div>
    <div class="text-xl">{{ round }}: {{ turn }} turn</div>
    <div class="flex items-center space-x-4">
      <span>{{ phase }}</span>
      <span>{{ score1 }} - {{ score2 }}</span>
      <div class="w-10 h-10 bg-gray-700 rounded-full"></div> <!-- Placeholder for avatar -->
      <span>{{ player2 }}</span>
    </div>

  </header>
</template>

<script>
export default {
  name: "HeaderComponent",
  props: {
    player1: String,
    player2: String,
    round: Number,
    turn: String,
    score1: Number,
    score2: Number,
    phase: String
  },
};
</script>
