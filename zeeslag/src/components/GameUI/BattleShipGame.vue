<template>
  <div class="min-h-screen bg-blue-900 text-white p-4">
    <HeaderComponent :player1="player1" :player2="player2" :round="round" :turn="turn" :score1="score1" :score2="score2"
      :phase="p1Phase" />

    <main class="grid grid-cols-4 gap-4 mt-6">
      <LogComponent :title="'P1 Log'" :moves="p1Moves" class="max-w-xs" />

      <BoardComponent :ships="p1Ships" :hits="p1Hits" :phase="p1Phase" :playerType="'human'"
        @allShipsPlaced="handleAllShipsPlaced('p1')" @cellClicked="takeShot('p2', $event)" />

      <BoardComponent ref="p2Board" :ships="p2Ships" :hits="p2Hits" :phase="p2Phase" :playerType="'CPU'"
        @allShipsPlaced="handleAllShipsPlaced('p2')" @cellClicked="takeShot('p1', $event)" />

      <LogComponent :title="'P2 Log'" :moves="p2Moves" class="max-w-xs" />
    </main>
    <ChatComponent :messages="chatMessages" />

    <!-- Tooltip -->
    <div v-if="tooltipMessage" class="tooltip">{{ tooltipMessage }}</div>
  </div>
</template>

<script>
import HeaderComponent from './HeaderComponent.vue';
import LogComponent from './LogComponent.vue';
import BoardComponent from './BoardComponent.vue';
import ChatComponent from './ChatComponent.vue';

export default {
  name: "BattleshipGame",
  components: {
    HeaderComponent,
    LogComponent,
    BoardComponent,
    ChatComponent,
  },
  data() {
    return {
      wsService: null,
      player1: "xX_sampleUsername123_Xx",
      player2: "xX_sampleUsername345_Xx",
      round: 1,
      turn: "P1",
      score1: 0,
      score2: 0,
      p1Moves: [],
      p2Moves: [],
      p1Ships: [
        { name: "Carrier", size: 5, locations: [], placed: false },
        { name: "Battleship", size: 4, locations: [], placed: false },
        { name: "Cruiser", size: 3, locations: [], placed: false },
        { name: "Submarine", size: 3, locations: [], placed: false },
        { name: "Destroyer", size: 2, locations: [], placed: false }
      ],
      p1Hits: [],
      p2Ships: [
        { name: "Carrier", size: 5, locations: [], placed: false },
        { name: "Battleship", size: 4, locations: [], placed: false },
        { name: "Cruiser", size: 3, locations: [], placed: false },
        { name: "Submarine", size: 3, locations: [], placed: false },
        { name: "Destroyer", size: 2, locations: [], placed: false }
      ],
      p2Hits: [],
      chatMessages: [],
      p1Phase: 'setup',
      p2Phase: 'setup',
      player2Type: 'CPU',
      tooltipMessage: null,
      preMoves: [], // Tijdelijke opslag voor pre-moves
    };
  },
  methods: {
    handleAllShipsPlaced(player) {
      if (player === 'p1') {
        this.p1Phase = 'gameplay';
        if (this.player2Type === 'CPU') {
          this.$refs.p2Board.randomizeShipPlacement();
        }
        // this.$webSocketService.sendMessage("/app/ships-placed", this.p1Ships);
        console.log("player:"  + player);


      } else if (player === 'p2') {
        this.p2Phase = 'gameplay';
        // this.$webSocketService.sendMessage("/app/ships-placed", this.p2Ships)
        console.log("player:"  + player);
      }

      if (this.p1Phase === 'gameplay' && this.p2Phase === 'gameplay') {
        this.startGame();
      }
    },

    startGame() {
      this.score1 = 0;
      this.score2 = 0;
      this.p1Moves = [];
      this.p2Moves = [];
    },

    switchTurn() {
      if (this.turn === "P1") {
        this.turn = "P2";
        this.round++;
        this.executePreMoves('p2');
        if (this.player2Type === 'CPU') {
          setTimeout(() => {
            this.cpuTakeTurn();
          }, 2000);
        }
      } else {
        this.turn = "P1";
        this.executePreMoves('p1');
      }
    },

    takeShot(player, cellId) {
      if (this.turn !== (player === 'p1' ? 'P1' : 'P2')) {
        this.preMoves.push({ player, cellId });
        this.showTooltip("Pre-move saved! Will execute on your turn.");
        return;
      }
      this.executeMove(player, cellId);
    },

    executeMove(player, cellId) {
      const hits = player === 'p1' ? this.p2Hits : this.p1Hits;
      if (hits.some(hit => hit.cellId === cellId)) {
        this.showTooltip("You already shot here!");
        return;
      }

      if (player === 'p1') {
        this.p1Moves.push(cellId);
        const hitShip = this.p2Ships.find(ship => ship.locations.includes(cellId));
        if (hitShip) {
          this.p2Hits.push({ cellId, hit: true });
          this.score1++;
        } else {
          this.p2Hits.push({ cellId, hit: false });
        }
      } else {
        this.p2Moves.push(cellId);
        const hitShip = this.p1Ships.find(ship => ship.locations.includes(cellId));
        if (hitShip) {
          this.p1Hits.push({ cellId, hit: true });
          this.score2++;
        } else {
          this.p1Hits.push({ cellId, hit: false });
        }
      }

      this.switchTurn();
    },

    executePreMoves(player) {
      const moves = this.preMoves.filter(move => move.player === player);
      moves.forEach(move => {
        this.executeMove(move.player, move.cellId);
      });
      this.preMoves = this.preMoves.filter(move => move.player !== player);
    },

    cpuTakeTurn() {
      let cellId = Math.floor(Math.random() * 100);
      while (this.p2Moves.includes(cellId) || this.p1Hits.some(hit => hit.cellId === cellId)) {
        cellId = Math.floor(Math.random() * 100);
      }
      this.takeShot('p2', cellId);
    },

    showTooltip(message) {
      this.tooltipMessage = message;
      setTimeout(() => {
        this.tooltipMessage = null;
      }, 3000);
    },
  }
};
</script>

<style scoped>
.tooltip {
  position: fixed;
  bottom: 10%;
  left: 50%;
  transform: translateX(-50%);
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
  animation: fade-in-out 3s;
  z-index: 1000;
}

@keyframes fade-in-out {
  0% {
    opacity: 0;
    transform: translate(-50%, 20px);
  }

  20%,
  80% {
    opacity: 1;
    transform: translate(-50%, 0);
  }

  100% {
    opacity: 0;
    transform: translate(-50%, -20px);
  }
}
</style>
