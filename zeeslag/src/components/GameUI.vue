<template>
  <div class="min-h-screen bg-blue-900 text-white p-4">
    <!-- Header -->
    <header class="flex justify-between items-center bg-gray-800 p-4 rounded-md">
      <div class="flex items-center space-x-4">
        <div class="w-10 h-10 bg-gray-700 rounded-full"></div> <!-- Placeholder for avatar -->
        <span>xX_sampleUsername123_Xx</span>
      </div>
      <div class="text-xl">Round 8: P1 turn</div>
      <div class="flex items-center space-x-4">
        <span>4 - 3</span>
        <div class="w-10 h-10 bg-gray-700 rounded-full"></div> <!-- Placeholder for avatar -->
        <span>xX_sampleUsername345_Xx</span>
      </div>
    </header>

    <!-- Main content -->
    <main class="grid grid-cols-3 gap-4 mt-6">
      <!-- Player 1 Log -->
      <div class="bg-gray-800 p-4 rounded-md">
        <h2 class="font-bold mb-2">P1 Log</h2>
        <ul class="space-y-1">
          <li>1: F11</li>
          <li>2: E16</li>
          <li>3: W3</li>
        </ul>
      </div>

      <!-- Game Board Section -->
      <div class="grid grid-cols-2 gap-4">
        <!-- Player Board -->
        <div class="relative">
          <div class="grid grid-cols-10 grid-rows-10 gap-1 bg-gray-700 p-4 rounded-md">
            <!-- Create grid cells -->
            <div v-for="i in 100" :key="i" class="border border-gray-600 w-8 h-8"></div>
            <!-- Overlay ships and hits using absolute positioning -->
            <div class="absolute inset-0 grid grid-cols-10 grid-rows-10 gap-1">
              <div class="col-start-2 row-start-3 col-span-1 row-span-5 bg-gray-500"></div>
              <div class="col-start-7 row-start-5 col-span-2 bg-gray-500"></div>
              <div class="col-start-5 row-start-6 text-red-600 font-bold text-center">X</div>
            </div>
          </div>
        </div>

        <!-- Opponent Board -->
        <div class="relative">
          <div class="grid grid-cols-10 grid-rows-10 gap-1 bg-gray-700 p-4 rounded-md">
            <!-- Create grid cells -->
            <div v-for="i in 100" :key="i" class="border border-gray-600 w-8 h-8"></div>
            <!-- Overlay ships and hits -->
            <div class="absolute inset-0 grid grid-cols-10 grid-rows-10 gap-1">
              <div class="col-start-1 row-start-10 col-span-5 bg-gray-500"></div>
              <div class="col-start-2 row-start-6 text-red-600 font-bold text-center">X</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Player 2 Log -->
      <div class="bg-gray-800 p-4 rounded-md">
        <h2 class="font-bold mb-2">P2 Log</h2>
        <ul class="space-y-1">
          <li>1: G2</li>
          <li>2: H16</li>
          <li>3: H3</li>
        </ul>
      </div>
    </main>

    <!-- Chat Box -->
    <footer class="bg-gray-800 p-4 rounded-md mt-6">
      <div class="space-y-2">
        <div class="text-sm">
          <span class="text-red-400">xX_sampleUsername123_Xx:</span> worst player EUW servers? Uninstall the game please?
        </div>
        <div class="text-sm">
          <span class="text-blue-400">xX_sampleUsername456_Xx:</span> Mad cuz bad, gg losing dog tier player.
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: "BattleshipGame",
  data() {
    return {
    };
  },
};
</script>

<style scoped>
</style>
