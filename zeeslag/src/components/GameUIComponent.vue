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

<!--      &lt;!&ndash; Game Board Section &ndash;&gt;-->
<!--      <div class="grid grid-cols-2 gap-4">-->
<!--        &lt;!&ndash; Player Board &ndash;&gt;-->
<!--        <div class="relative">-->
<!--          <div class="grid grid-cols-10 grid-rows-10 gap-1 bg-gray-700 p-4 rounded-md">-->
<!--            &lt;!&ndash; Create grid cells &ndash;&gt;-->
<!--            <div v-for="i in 100" :key="i" class="border border-gray-600 w-8 h-8"></div>-->
<!--            &lt;!&ndash; Overlay ships and hits using absolute positioning &ndash;&gt;-->
<!--            <div class="absolute inset-0 grid grid-cols-10 grid-rows-10 gap-1">-->
<!--              <div class="col-start-2 row-start-3 col-span-1 row-span-5 bg-gray-500"></div>-->
<!--              <div class="col-start-7 row-start-5 col-span-2 bg-gray-500"></div>-->
<!--              <div class="col-start-5 row-start-6 text-red-600 font-bold text-center">X</div>-->
<!--            </div>-->
<!--          </div>-->
<!--        </div>-->

<!--        &lt;!&ndash; Opponent Board &ndash;&gt;-->
<!--        <div class="relative">-->
<!--          <div class="grid grid-cols-10 grid-rows-10 gap-1 bg-gray-700 p-4 rounded-md">-->
<!--            &lt;!&ndash; Create grid cells &ndash;&gt;-->
<!--            <div v-for="i in 100" :key="i" class="border border-gray-600 w-8 h-8"></div>-->
<!--            &lt;!&ndash; Overlay ships and hits &ndash;&gt;-->
<!--            <div class="absolute inset-0 grid grid-cols-10 grid-rows-10 gap-1">-->
<!--              <div class="col-start-1 row-start-10 col-span-5 bg-gray-500"></div>-->
<!--              <div class="col-start-2 row-start-6 text-red-600 font-bold text-center">X</div>-->
<!--            </div>-->
<!--          </div>-->
<!--        </div>-->
<!--      </div>-->

      <div id="board">
        <div id="messageArea"></div>
        <table>
          <tr>
            <th class="numbers"></th>
            <th class="numbers">1</th>
            <th class="numbers">2</th>
            <th class="numbers">3</th>
            <th class="numbers">4</th>
            <th class="numbers">5</th>
            <th class="numbers">6</th>
            <th class="numbers">7</th>
            <th class="numbers">8</th>
            <th class="numbers">9</th>
            <th class="numbers">10</th>
          </tr>

          <tr>
            <th class="letters">A</th>
            <td><div id="A1"></div></td>
            <td><div id="A2"></div></td>
            <td><div id="A3"></div></td>
            <td><div id="A4"></div></td>
            <td><div id="A5"></div></td>
            <td><div id="A6"></div></td>
            <td><div id="A7"></div></td>
            <td><div id="A8"></div></td>
            <td><div id="A9"></div></td>
            <td><div id="A10"></div></td>
          </tr>

          <tr>
            <th class="letters">B</th>
            <td><div id="B1"></div></td>
            <td><div id="B2"></div></td>
            <td><div id="B3"></div></td>
            <td><div id="B4"></div></td>
            <td><div id="B5"></div></td>
            <td><div id="B6"></div></td>
            <td><div id="B7"></div></td>
            <td><div id="B8"></div></td>
            <td><div id="B9"></div></td>
            <td><div id="B10"></div></td>
          </tr>

          <tr>
            <th class="letters">C</th>
            <td><div id="C1"></div></td>
            <td><div id="C2"></div></td>
            <td><div id="C3"></div></td>
            <td><div id="C4"></div></td>
            <td><div id="C5"></div></td>
            <td><div id="C6"></div></td>
            <td><div id="C7"></div></td>
            <td><div id="C8"></div></td>
            <td><div id="C9"></div></td>
            <td><div id="C10"></div></td>
          </tr>

          <tr>
            <th class="letters">D</th>
            <td><div id="D1"></div></td>
            <td><div id="D2"></div></td>
            <td><div id="D3"></div></td>
            <td><div id="D4"></div></td>
            <td><div id="D5"></div></td>
            <td><div id="D6"></div></td>
            <td><div id="D7"></div></td>
            <td><div id="D8"></div></td>
            <td><div id="D9"></div></td>
            <td><div id="D10"></div></td>
          </tr>

          <tr>
            <th class="letters">E</th>
            <td><div id="E1"></div></td>
            <td><div id="E2"></div></td>
            <td><div id="E3"></div></td>
            <td><div id="E4"></div></td>
            <td><div id="E5"></div></td>
            <td><div id="E6"></div></td>
            <td><div id="E7"></div></td>
            <td><div id="E8"></div></td>
            <td><div id="E9"></div></td>
            <td><div id="E10"></div></td>
          </tr>

          <tr>
            <th class="letters">F</th>
            <td><div id="F1"></div></td>
            <td><div id="F2"></div></td>
            <td><div id="F3"></div></td>
            <td><div id="F4"></div></td>
            <td><div id="F5"></div></td>
            <td><div id="F6"></div></td>
            <td><div id="F7"></div></td>
            <td><div id="F8"></div></td>
            <td><div id="F9"></div></td>
            <td><div id="F10"></div></td>
          </tr>

          <tr>
            <th class="letters">G</th>
            <td><div id="G1"></div></td>
            <td><div id="G2"></div></td>
            <td><div id="G3"></div></td>
            <td><div id="G4"></div></td>
            <td><div id="G5"></div></td>
            <td><div id="G6"></div></td>
            <td><div id="G7"></div></td>
            <td><div id="G8"></div></td>
            <td><div id="G9"></div></td>
            <td><div id="G10"></div></td>
          </tr>

          <tr>
            <th class="letters">H</th>
            <td><div id="H1"></div></td>
            <td><div id="H2"></div></td>
            <td><div id="H3"></div></td>
            <td><div id="H4"></div></td>
            <td><div id="H5"></div></td>
            <td><div id="H6"></div></td>
            <td><div id="H7"></div></td>
            <td><div id="H8"></div></td>
            <td><div id="H9"></div></td>
            <td><div id="H10"></div></td>
          </tr>

          <tr>
            <th class="letters">I</th>
            <td><div id="I1"></div></td>
            <td><div id="I2"></div></td>
            <td><div id="I3"></div></td>
            <td><div id="I4"></div></td>
            <td><div id="I5"></div></td>
            <td><div id="I6"></div></td>
            <td><div id="I7"></div></td>
            <td><div id="I8"></div></td>
            <td><div id="I9"></div></td>
            <td><div id="I10"></div></td>
          </tr>

          <tr>
            <th class="letters">J</th>
            <td><div id="J1"></div></td>
            <td><div id="J2"></div></td>
            <td><div id="J3"></div></td>
            <td><div id="J4"></div></td>
            <td><div id="J5"></div></td>
            <td><div id="J6"></div></td>
            <td><div id="J7"></div></td>
            <td><div id="J8"></div></td>
            <td><div id="J9"></div></td>
            <td><div id="J10"></div></td>
          </tr>
        </table>
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
