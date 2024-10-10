<template>
  <div class="relative">
    <div class="grid grid-cols-10 grid-rows-10 gap-1 bg-gray-700 p-4 rounded-md">
      <div v-for="i in 100" :key="i" class="border border-gray-600 w-8 h-8"></div>
      <div class="absolute inset-0 grid grid-cols-10 grid-rows-10 gap-1">
        <div v-for="ship in ships" :key="ship.id" :class="ship.class"></div>
        <div v-for="hit in hits" :key="hit.id" :class="hit.class"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "BoardComponent",
  props: {
    ships: Array,
    hits: Array,
  },
};
</script>
