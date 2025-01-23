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
      <tbody>
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
            // during the gameplay phase, mark hits as red and misses as grey
            'bg-red-500': phase === 'gameplay' && hits.some(hit => hit.cellId === (row - 1) * 10 + col && hit.hit),
            'bg-gray-500': phase === 'gameplay' && hits.some(hit => hit.cellId === (row - 1) * 10 + col && !hit.hit),

            // default state is the color of your ships, as the enemy placements are invisible.
            'cell-default': playerType === 'human' && isCellOccupied((row - 1), (col - 1))
        }"
            >
  <!--             Show ship placements only for human player -->
              <div v-if="playerType === 'human' && ships.some(ship => ship.placed && ship.locations.includes((row - 1) * 10 + col))">
                <div class="ship-indicator"></div>
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "BoardPlayerComponent",
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
    //select a ship to place, activated by selecting a ship in the list of ships in setup phase. selects from the list of ships via @index.
    selectShip(index) {

      const ship = this.ships[index];
      if (!ship.placed && this.playerType === 'human') { // only select if human and all ships arent already placed.
        this.selectedShipIndex = index;
      }
    },

    //manages all behaviour on a clicked cell. Behaviour varies between setup and gameplay phase. in case the phase is setup (determined by player1's board phase):
    // assumes the user is attempting to place a ship. checks if placement of the ship is valid / possible, places it if so.
    //in case the phase is in gameplay mode(all ships have been placed), it emits the event to the board's @cellClicked.
    // this then forwards the situation to attempting to take a shot.
    clickCell(cellId) {
      console.log("clicked " + cellId)
      console.log(this.phase)
      if (this.phase === 'setup' && this.selectedShipIndex !== null && this.playerType === 'human') {

        const ship = this.ships[this.selectedShipIndex];
        const validPlacement = this.validatePlacement(cellId, ship.size);
        if (validPlacement) {
          this.placeShip(cellId, ship.size);
          console.log("Placed " + ship.name + " at cell " + cellId + " positioned: " + this.orientation);
        } else {
          console.log("Invalid placement for " + ship.name + " at cell " + cellId);
        }
      }
      else if (this.phase === 'gameplay') {
        console.log("else if this.phase - gameplay")
        // emit the event and the relevant cell to the element's @cellClicked condition.
        this.$emit('cellClicked', cellId);
      }
    },

    //method for CPU player's ship placement, CPU's don't manually place their boats but are randomly assigned a formation.
    randomizeShipPlacement() {
      //looops for every ship in the player's list until it finds a valid formation for all ships and they're all placed.
      for (const ship of this.ships) {
        let placed = false;
        while (!placed) {
          //coinflip between whether to choose horizontal or vertical.
          const orientation = Math.random() < 0.5 ? 'horizontal' : 'vertical';
          let startCellId;

          // takes a random row and column to start on for the horizontal and vertical coordinates of the ship cell locations.
          if (orientation === 'horizontal') {
            const row = Math.floor(Math.random() * 10);
            const col = Math.floor(Math.random() * (10 - ship.size));
            startCellId = row * 10 + (col + 1); // convert to 1-based index, as that's what's used in the rest of the codebase
          } else {
            const row = Math.floor(Math.random() * (10 - ship.size));
            const col = Math.floor(Math.random() * 10);
            startCellId = row * 10 + (col + 1); // convert to 1-based index, as that's what's used in the rest of the codebase
          }

          //checks up if the placement is possible and places it if so, if not, goes back in the loop and creates a new random location to try.
          if (this.validatePlacement(startCellId, ship.size, orientation)) {
            this.placeShip(startCellId, ship.size, orientation);
            placed = true;
          }
        }
      }
      //if the whole loop is succesful, emits a GO to the @allShipsPlaced condition of this current board.
      this.$emit('allShipsPlaced');
    },

    //checks if the positioning of the ship is possible.
    // uses @startCellId as a basis for where to start the positioning, uses @orientation to check whether to look horizontally or vertically.
    // uses @shipsize to check if how many cells to check.
    validatePlacement(startCellId, shipSize, orientation) {
      const row = Math.ceil(startCellId / 10) - 1; // Convert to 0-based index
      const col = (startCellId - 1) % 10; // Convert to 0-based index

      if (orientation === 'horizontal') {
        if (col + shipSize > 10) return false; // out of bounds
        for (let i = 0; i < shipSize; i++) {
          if (this.isCellOccupied(row, col + i)) return false; // check if cell isnt already in use
        }
      } else {
        if (row + shipSize > 10) return false; // out of bounds
        for (let i = 0; i < shipSize; i++) {
          if (this.isCellOccupied(row + i, col)) return false; // chck if cell isnt already in uce.
        }
      }
      return true;
    },

    //checks the current cell via its @row(horizontal axis) and its @col(vertical axis) to pinpoint it,
    //then checks across all ships if any of their used cells is the same as the combination of the given arguments.
    isCellOccupied(row, col) {
      const cellId = row * 10 + (col + 1); // Convert to 1-based index
      for (const ship of this.ships) {
        if (ship.placed && ship.locations.includes(cellId)) {
          return true; // cell isn't free
        }
      }
      return false; // cell is free
    },


    //places the ship on the cells from the @startCellId, horizontally or vertically depending on @orientation, for a length of the @shipSize.
    placeShip(startCellId, shipSize, orientation) {
      const ship = this.ships.find(s => !s.placed && s.size === shipSize);
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
          ship.locations.push(cellId); // add cell to ship's locations list
        }
      } else {
        for (let i = 0; i < shipSize; i++) {
          const cellId = (row + i) * 10 + (col + 1); // Convert to 1-based index
          ship.locations.push(cellId); // add cell to ship's locations list
        }
      }
      ship.placed = true; // Mark the ship as placed
      console.log(ship.name, ship.locations, ship.size, ship.placed);

      if (this.allShipsPlaced()) {
        this.$emit('allShipsPlaced'); // Emit an event to parent
      }
    },

    //all ships have been placed, return that every ship's placed property is true.
    allShipsPlaced() {
      return this.ships.every(ship => ship.placed);
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

.cell {
  width: 30px;
  height: 30px;
  border: 1px solid #ccc;
  display: inline-block;
}

.bg-red-500 {
  background-color: red;
}

.bg-gray-500 {
  background-color: grey;
}

.cell-default {
  background-color: white;
}
</style>
