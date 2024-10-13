<template>
  <div class="min-h-screen bg-blue-900 text-white p-4">
    <HeaderComponent
        :player1="player1"
        :player2="player2"
        :round="round"
        :turn="turn"
        :score1="score1"
        :score2="score2"
        :phase="p1Phase"
    />

    <TimerComponent :time="30" @time-up="switchTurn"/>

    <main class="grid grid-cols-4 gap-4 mt-6">
      <!-- P1 Log Component -->
      <LogComponent :title="'P1 Log'" :moves="p1Moves" class="max-w-xs"/>

      <!-- P1 Board Component -->
      <BoardComponent
          :ships="p1Ships"
          :hits="p1Hits"
          :phase="p1Phase"
          :playerType="'human'"
      @allShipsPlaced="handleAllShipsPlaced('p1')"
      />

      <!-- P2 Board Component -->
      <BoardComponent
          ref="p2Board"
          :ships="p2Ships"
          :hits="p2Hits"
          :phase="p2Phase"
          :playerType="'CPU'"
      @allShipsPlaced="handleAllShipsPlaced('p2')"
      />

      <!-- P2 Log Component -->
      <LogComponent :title="'P2 Log'" :moves="p2Moves" class="max-w-xs"/>
    </main>

    <ChatComponent :messages="chatMessages"/>
  </div>
</template>


<script>
import HeaderComponent from './HeaderComponent.vue';
import LogComponent from './LogComponent.vue';
import BoardComponent from './BoardComponent.vue';
import ChatComponent from './ChatComponent.vue';
import TimerComponent from './TimerComponent.vue';

export default {
  name: "BattleshipGame",
  components: {
    HeaderComponent,
    LogComponent,
    BoardComponent,
    ChatComponent,
    TimerComponent,
  },
  data() {
    return {
      player1: "xX_sampleUsername123_Xx",
      player2: "xX_sampleUsername345_Xx",
      round: 1,
      turn: "P1",
      score1: 0,
      score2: 0,
      p1Moves: [],
      p2Moves: [],
      p1Ships: [
        {name: "Carrier", size: 5, locations: [], placed: false},
        {name: "Battleship", size: 4, locations: [], placed: false},
        {name: "Cruiser", size: 3, locations: [], placed: false},
        {name: "Submarine", size: 3, locations: [], placed: false},
        {name: "Destroyer", size: 2, locations: [], placed: false}
      ],
      p1Hits: [],
      p2Ships: [
        {name: "Carrier", size: 5, locations: [], placed: false},
        {name: "Battleship", size: 4, locations: [], placed: false},
        {name: "Cruiser", size: 3, locations: [], placed: false},
        {name: "Submarine", size: 3, locations: [], placed: false},
        {name: "Destroyer", size: 2, locations: [], placed: false}
      ],
      p2Hits: [],
      chatMessages: [
        {
          user: "xX_sampleUsername123_Xx",
          text: "worst player EUW servers? Uninstall the game please?",
          class: "text-red-400"
        },
        {user: "xX_sampleUsername456_Xx", text: "Mad cuz bad, gg losing dog tier player.", class: "text-blue-400"}
      ],
      p1Phase: 'setup',
      p2Phase: 'setup',
      player2Type: 'CPU',
    };
  },
  methods: {
    switchTurn() {
      this.turn = this.turn === "P1" ? "P2" : "P1"; // Switch turns
      this.round++; // Increment the round
    },
    handleAllShipsPlaced(player) {
      if (player === 'p1') {
        this.p1Phase = 'gameplay'; // Change phase to gameplay for Player 1
        // If Player 2 is CPU, randomize their ship placement
        if (this.player2Type === 'CPU') {
          this.$refs.p2Board.randomizeShipPlacement(); // Ensure you have a ref for the CPU board
        }
      } else if (player === 'p2') {
        this.p2Phase = 'gameplay'; // Change phase to gameplay for Player 2
      }

      // Check if both players have completed setup
      if (this.p1Phase === 'gameplay' && this.p2Phase === 'gameplay') {
        console.log("Both players are ready. Starting the game!");
        this.startGame(); // Call a method to handle game start
      }
    },

    startGame() {
      // Initialize game-related logic here, like resetting scores or chat
      this.score1 = 0;
      this.score2 = 0;
      this.p1Moves = [];
      this.p2Moves = [];
      this.chatMessages.push({user: "Game", text: "The game has started!", class: "text-green-400"});
    },
    recordHit(player, cellId) {
      if (player === 'p1') {
        this.p1Moves.push(cellId); // Record player 1's move
        // Check if the hit is successful and record it
        const hitShip = this.p2Ships.find(ship => ship.locations.includes(cellId));
        if (hitShip) {
          this.p2Hits.push({cellId, hit: true});
          this.score1++; // Increment score for player 1
          this.chatMessages.push({user: "Game", text: "Hit!", class: "text-red-400"});
        } else {
          this.chatMessages.push({user: "Game", text: "Miss!", class: "text-gray-400"});
        }
      } else {
        this.p2Moves.push(cellId); // Record player 2's move
        const hitShip = this.p1Ships.find(ship => ship.locations.includes(cellId));
        if (hitShip) {
          this.p1Hits.push({cellId, hit: true});
          this.score2++; // Increment score for player 2
          this.chatMessages.push({user: "Game", text: "Hit!", class: "text-red-400"});
        } else {
          this.chatMessages.push({user: "Game", text: "Miss!", class: "text-gray-400"});
        }
      }
    },
  },
};
</script>

<style scoped>
/* Optional: Style for the main game component */
</style>
