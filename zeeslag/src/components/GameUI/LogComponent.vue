<template>
  <div class="bg-gray-800 p-4 rounded-md w-[320px] h-[536px]">
    <h2 class="font-bold mb-2">{{ title }}</h2>
    <ul class="space-y-1 overflow-auto h-[90%]">
      <li v-for="(move, index) in moves" :key="index">{{ index + 1 }}: {{ translateMove(move) }} + {{ move }}</li>
    </ul>
  </div>
</template>

<script>
//TODO: add move hit or miss status to the log, can be done via taking enemey hits list and comparing current move's id to enemy's hit list for occurences of this move's target  cell.
export default {
  name: "LogComponent",
  props: {
    title: String,
    moves: Array,
  },
  methods: {
    // method which translates a location on the board from a 1 - 100  based index (@id) to e.g. A1, B3, G9
    translateMove(id) {
      const row = String.fromCharCode(Math.floor((id - 1) / 10) + 65); //+65 because in the CharacterCodex, A is #65.
      const col = ((id - 1) % 10) + 1;
      return row + col;
    },
  },
};
</script>
