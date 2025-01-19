git <template>
    <!-- Navbar container with background color and padding -->
    <nav class="bg-gray-700 p-4">
        <!-- Flex container to space out the left and right sections -->
        <ul class="flex justify-between w-full">
            <!-- Left-aligned items container -->
            <div class="flex space-x-4">
                <!-- Home link -->
                <li>
                    <RouterLink to="/" class="text-white hover:text-gray-400">Home</RouterLink>
                </li>
                <!-- About link -->
                <li>
                    <RouterLink to="/about" class="text-white hover:text-gray-400">About</RouterLink>
                </li>
                <!-- Play Now link -->
                <li>
                    <RouterLink to="/selectgamemode" class="text-white hover:text-gray-400">Play now</RouterLink>
                </li>
            </div>
            <!-- Right-aligned items container -->
            <div class="flex space-x-4">
                <!-- help modal link -->
                <li>
                    <a @click="toggleModal" class="text-white hover:text-gray-400">Help</a>
                </li>
              <!-- Register link -->
              <li>
                <RouterLink to="/register" class="text-white hover:text-gray-400">Register</RouterLink>
              </li>
                <!-- Log In link -->
                <li>
                    <RouterLink to="/login" class="text-white hover:text-gray-400">Log In</RouterLink>
                </li>
            </div>
        </ul>

      <!-- Help Modal -->
      <div v-if="isModalOpen" @click.self="toggleModal" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
        <div class="bg-white p-8 rounded-lg shadow-lg">
          <h2 class="text-2xl font-bold">Battleship Game Rules</h2>
          <br>
          <h3 class="text-xl font-bold">Objective:</h3>
          <p>The objective of Battleship is to be the first player to sink all of the opponent’s ships.</p>
          <br>
          <h3 class="text-xl font-bold">Setup:</h3>
          <p>Grid: Each player has a grid (10x10) and a fleet of ships:</p>
          <ul class="list-disc list-inside">
            <li>Aircraft Carrier (5 squares)</li>
            <li>Battleship (4 squares)</li>
            <li>Submarine (3 squares)</li>
            <li>Cruiser (3 squares)</li>
            <li>Destroyer (2 squares)</li>
          </ul>
          <p>Placing Ships: Players place their ships on their grid either horizontally or vertically without overlapping.</p>
          <br>
          <h3 class="text-xl font-bold">Gameplay:</h3>
          <p>Turns: Players take turns calling out a grid coordinate (e.g., B5) where they think the opponent's ships might be located.</p>
          <p>Hit or Miss: The opponent responds with "hit" if any part of a ship is at that coordinate or "miss" if no ship is there.</p>
          <p>Marking: Players mark hits on their opponent's grid and misses on their own tracking grid.</p>
          <br>
          <h3 class="text-xl font-bold">Sinking Ships:</h3>
          <p>When all the squares of a ship have been hit, that ship is sunk. The opponent should announce which ship was sunk (e.g., "You sunk my battleship!").</p>
          <br>
          <h3 class="text-xl font-bold">Winning the Game:</h3>
          <p>The first player to sink all of the opponent's ships wins.</p>
          <br>
          <h3 class="text-xl font-bold">Notes:</h3>
          <ul class="list-disc list-inside">
            <li>No guessing the same coordinate twice.</li>
            <li>Ships cannot be placed diagonally.</li>
            <li>Properly mark hits and misses to keep track of potential ship locations.</li>
            <li>Round times vary with game modes</li>
          </ul>
        </div>
      </div>
    </nav>
</template>

<script>
export default {
  name: 'Navbar',
  data() {
    return {
      isModalOpen: false
    };
  },
  methods: {
    toggleModal() {
      this.isModalOpen = !this.isModalOpen;
    }
  }
}
</script>

<style scoped></style>
