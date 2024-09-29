<template>
  <div id="app" class="flex flex-col items-center p-5 bg-gray-100 min-h-screen">
    <h1 class="text-center mb-10 text-4xl font-extrabold text-gray-800">dummy zeeslag</h1>
    <div id="player1-board" class="flex flex-wrap w-80 h-80 bg-gray-300 border-4 border-gray-800 rounded-lg shadow-lg">
      <div v-for="(row, rowIndex) in board" :key="rowIndex" class="flex w-full">
        <div v-for="(cell, cellIndex) in row" :key="cellIndex" class="w-8 h-8 border border-gray-800 box-border hover:bg-gray-400 transition-colors duration-200" @click="shoot(rowIndex, cellIndex)">
          {{ cell }}
        </div>
      </div>
    </div>
    <div id="player2-board" class="flex flex-wrap w-80 h-80 bg-gray-300 border-4 border-gray-800 rounded-lg shadow-lg mt-10">
      <div v-for="(row, rowIndex) in board" :key="rowIndex" class="flex w-full">
        <div v-for="(cell, cellIndex) in row" :key="cellIndex" class="w-8 h-8 border border-gray-800 box-border hover:bg-gray-400 transition-colors duration-200" :class="{ 'bg-red-500': cell === 'X', 'bg-blue-500': cell === 'O' }">
          {{ cell }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      board: Array(10).fill().map(() => Array(10).fill('')),
    };
  },
  methods: {
    shoot(row, col) {
      if (this.board[row][col] === '') {
        this.board[row][col] = 'O';
      } else if (this.board[row][col] === 'O') {
        this.board[row][col] = 'X';
      }
    },
  },
};
</script>

<style scoped>
/* No custom styles needed, using Tailwind CSS classes */
</style>