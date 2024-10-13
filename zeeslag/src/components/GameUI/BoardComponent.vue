<template>
  <div id="board">
    <div id="messageArea">
      <div v-if="phase === 'setup' && playerType === 'human'">
        <h2>Select a ship to place:</h2>
        <ul class="ship-list">
          <li
              v-for="(ship, index) in ships"
              :key="index"
              @click="selectShip(index)"
              :class="{
              'text-blue-500 cursor-pointer': !ship.placed,
              'text-gray-500 cursor-not-allowed': ship.placed
            }"
          >
            {{ ship.name }} ({{ ship.size }} cells)
            <span v-if="ship.placed"> - Placed</span>
          </li>
        </ul>
      </div>
    </div>
    <table>
      <tr>
        <th class="numbers"></th>
        <th class="numbers" v-for="n in 10" :key="n">{{ n }}</th>
      </tr>
      <tr v-for="row in 10" :key="row">
        <th class="letters">{{ String.fromCharCode(64 + row) }}</th>
        <td v-for="col in 10" :key="col">
          <div
              :id="(row - 1) * 10 + col"
              @click="clickCell((row - 1) * 10 + col)"
              class="cell"
              :class="{
                'bg-red-500': playerType === 'human' && isCellOccupied((row - 1), (col - 1)),
                'cell-default': playerType !== 'human' && isCellOccupied((row - 1), (col - 1))
              }"
          >
            <!-- Show ship placements only for human player -->
            <div v-if="playerType === 'human' && ships.some(ship => ship.placed && ship.locations.includes((row - 1) * 10 + col))">
              <div class="ship-indicator"></div>
            </div>
          </div>
        </td>
      </tr>
    </table>
  </div>
</template>


<script>
export default {
  name: "BoardComponent",
  props: {
    phase: {
      type: String,
      required: true,
    },
    ships: {
      type: Array,
      required: true,
    },
    hits: {
      type: Array,
      required: true,
    },
    playerType: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      selectedShipIndex: null,
      orientation: 'horizontal',
    };
  },
  methods: {
    selectShip(index) {
      const ship = this.ships[index];
      if (!ship.placed && this.playerType === 'human') { // Only allow selecting if player is human
        this.selectedShipIndex = index;
        console.log(`Selected ship: ${ship.name}`);
      }
    },
    clickCell(cellId) {
      if (this.phase === 'setup' && this.selectedShipIndex !== null && this.playerType === 'human') {
        const ship = this.ships[this.selectedShipIndex];
        const validPlacement = this.validatePlacement(cellId, ship.size);
        if (validPlacement) {
          this.placeShip(cellId, ship.size);
          console.log(`Placed ${ship.name} at cell ${cellId} with ${this.orientation} orientation.`);
        } else {
          console.log(`Invalid placement for ${ship.name} at cell ${cellId}.`);
        }
      } else if (this.phase === 'gameplay') {
        console.log(`Gameplay phase: You clicked cell ${cellId}`);
        // Handle gameplay logic
      }
    },
    randomizeShipPlacement() {
      for (const ship of this.ships) {
        let placed = false;
        while (!placed) {
          // Randomly choose orientation: 0 for horizontal, 1 for vertical
          const orientation = Math.random() < 0.5 ? 'horizontal' : 'vertical';
          // Randomly choose starting cell
          let startCellId;

          if (orientation === 'horizontal') {
            const row = Math.floor(Math.random() * 10);
            const col = Math.floor(Math.random() * (10 - ship.size));
            startCellId = row * 10 + (col + 1); // Convert to 1-based index
          } else {
            const row = Math.floor(Math.random() * (10 - ship.size));
            const col = Math.floor(Math.random() * 10);
            startCellId = row * 10 + (col + 1); // Convert to 1-based index
          }

          // Check if the placement is valid
          if (this.validatePlacement(startCellId, ship.size, orientation)) {
            this.placeShip(startCellId, ship.size, orientation);
            placed = true; // Mark as placed
          }
        }
      }
      // Emit the event that all CPU ships are placed
      this.$emit('allShipsPlaced');
    },
    validatePlacement(startCellId, shipSize, orientation) {
      const row = Math.ceil(startCellId / 10) - 1; // Convert to 0-based index
      const col = (startCellId - 1) % 10; // Convert to 0-based index

      if (orientation === 'horizontal') {
        if (col + shipSize > 10) return false; // Out of bounds horizontally
        for (let i = 0; i < shipSize; i++) {
          if (this.isCellOccupied(row, col + i)) return false; // Check if cell is occupied
        }
      } else {
        if (row + shipSize > 9) return false; // Out of bounds vertically
        for (let i = 0; i < shipSize; i++) {
          if (this.isCellOccupied(row + i, col)) return false; // Check if cell is occupied
        }
      }
      return true;
    },

    isCellOccupied(row, col) {
      const cellId = row * 10 + (col + 1); // Convert to 1-based index
      for (const ship of this.ships) {
        if (ship.placed && ship.locations.includes(cellId)) {
          return true; // Cell is occupied
        }
      }
      return false; // Cell is not occupied
    },
    placeShip(startCellId, shipSize, orientation) {
      const ship = this.ships.find(s => !s.placed && s.size === shipSize); // Find the first unplaced ship with the correct size
      if (!ship) {
        console.error("No available ship to place!");
        return; // Exit if no ship is found
      }

      ship.locations = []; // Reset locations
      const row = Math.ceil(startCellId / 10) - 1; // Convert to 0-based index
      const col = (startCellId - 1) % 10; // Convert to 0-based index

      if (orientation === 'horizontal') {
        for (let i = 0; i < shipSize; i++) {
          const cellId = row * 10 + (col + i + 1); // Convert to 1-based index
          ship.locations.push(cellId); // Add cell to ship's locations
        }
      } else {
        for (let i = 0; i < shipSize; i++) {
          const cellId = (row + i) * 10 + (col + 1); // Convert to 1-based index
          ship.locations.push(cellId); // Add cell to ship's locations
        }
      }
      ship.placed = true; // Mark the ship as placed
      console.log(ship.name, ship.locations, ship.size, ship.placed);

      // Check if all ships are placed
      if (this.allShipsPlaced()) {
        this.$emit('allShipsPlaced'); // Emit an event to parent
      }
    },

    allShipsPlaced() {
      return this.ships.every(ship => ship.placed); // Check if all ships are placed
    }
  }
}
</script>

<style>
.cell {
  width: 30px;
  height: 30px;
  border: 1px solid #ccc;
  display: inline-block;
}
</style>
