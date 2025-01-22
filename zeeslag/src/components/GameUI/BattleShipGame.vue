<template>
  <!-- Hoofdcontainer van het spel -->
  <div class="min-h-screen bg-blue-900 text-white p-4">
    <!-- HeaderComponent toont informatie over spelers, scores, rondes en wie aan de beurt is -->
    <HeaderComponent :player1="player1" :player2="player2" :round="round" :turn="turn" :score1="score1" :score2="score2"
      :phase="p1Phase" />

    <main class="grid grid-cols-4 gap-4 mt-6">
      <!-- Logboek voor speler 1 -->
      <LogComponent :title="'P1 Log'" :moves="p1Moves" class="max-w-xs" />

      <!-- Speelbord van speler 1 -->
      <BoardComponent :ships="p1Ships" :hits="p1Hits" :phase="p1Phase" :playerType="'human'"
        @allShipsPlaced="handleAllShipsPlaced('p1')" @cellClicked="takeShot('p2', $event)" />

      <!-- Speelbord van speler 2 -->
      <BoardComponent ref="p2Board" :ships="p2Ships" :hits="p2Hits" :phase="p2Phase" :playerType="'CPU'"
        @allShipsPlaced="handleAllShipsPlaced('p2')" @cellClicked="takeShot('p1', $event)" />

      <!-- Logboek voor speler 2 -->
      <LogComponent :title="'P2 Log'" :moves="p2Moves" class="max-w-xs" />
    </main>

    <!-- Chatcomponent voor berichten tussen spelers -->
    <ChatComponent :messages="chatMessages" />

    <!-- Tooltip voor meldingen -->
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
      wsService: null, // WebSocket-service, niet in gebruik
      player1: "xX_sampleUsername123_Xx", // Naam van speler 1
      player2: "xX_sampleUsername345_Xx", // Naam van speler 2
      round: 1, // Huidige ronde van het spel
      turn: "P1", // Beurt van speler 1 of 2
      score1: 0, // Score van speler 1
      score2: 0, // Score van speler 2
      p1Moves: [], // Schoten van speler 1
      p2Moves: [], // Schoten van speler 2
      // Lijst met schepen voor speler 1
      p1Ships: [
        { name: "Carrier", size: 5, locations: [], placed: false },
        { name: "Battleship", size: 4, locations: [], placed: false },
        { name: "Cruiser", size: 3, locations: [], placed: false },
        { name: "Submarine", size: 3, locations: [], placed: false },
        { name: "Destroyer", size: 2, locations: [], placed: false }
      ],
      p1Hits: [], // Treffers van speler 1
      // Lijst met schepen voor speler 2
      p2Ships: [
        { name: "Carrier", size: 5, locations: [], placed: false },
        { name: "Battleship", size: 4, locations: [], placed: false },
        { name: "Cruiser", size: 3, locations: [], placed: false },
        { name: "Submarine", size: 3, locations: [], placed: false },
        { name: "Destroyer", size: 2, locations: [], placed: false }
      ],
      p2Hits: [], // Treffers van speler 2
      chatMessages: [], // Chatberichten tussen spelers
      p1Phase: 'setup', // Fase van speler 1: setup of gameplay
      p2Phase: 'setup', // Fase van speler 2: setup of gameplay
      player2Type: 'CPU', // Type van speler 2: CPU of human
      tooltipMessage: null, // Bericht dat tijdelijk wordt weergegeven
      preMoves: [], // Opgeslagen zetten die later worden uitgevoerd
    };
  },
  methods: {
    // Handelt het plaatsen van alle schepen door een speler af
    handleAllShipsPlaced(player) {
      if (player === 'p1') {
        this.p1Phase = 'gameplay'; // Speler 1 gaat naar gameplay
        if (this.player2Type === 'CPU') {
          this.$refs.p2Board.randomizeShipPlacement(); // CPU plaatst schepen willekeurig
        }
      } else if (player === 'p2') {
        this.p2Phase = 'gameplay'; // Speler 2 gaat naar gameplay
      }

      // Controleer of beide spelers klaar zijn om het spel te starten
      if (this.p1Phase === 'gameplay' && this.p2Phase === 'gameplay') {
        this.startGame();
      }
    },

    // Start het spel door scores en zetten te resetten
    startGame() {
      this.score1 = 0;
      this.score2 = 0;
      this.p1Moves = [];
      this.p2Moves = [];
    },

    // Wisselt de beurt tussen spelers
    switchTurn() {
      if (this.turn === "P1") {
        this.turn = "P2";
        this.round++; // Verhoog de ronde
        this.executePreMoves('p2'); // Voer opgeslagen zetten van speler 2 uit
        if (this.player2Type === 'CPU') {
          setTimeout(() => {
            this.cpuTakeTurn(); // Laat de CPU een zet doen
          }, 2000);
        }
      } else {
        this.turn = "P1";
        this.executePreMoves('p1'); // Voer opgeslagen zetten van speler 1 uit
      }
    },

    // Handelt een schot van een speler af
    takeShot(player, cellId) {
      if (this.turn !== (player === 'p1' ? 'P1' : 'P2')) {
        this.preMoves.push({ player, cellId }); // Sla schot op als pre-move
        this.showTooltip("Pre-move saved! Will execute on your turn.");
        return;
      }
      this.executeMove(player, cellId); // Voer schot direct uit
    },

    // Voert een zet uit en controleert op treffers
    executeMove(player, cellId) {
      const hits = player === 'p1' ? this.p2Hits : this.p1Hits;
      if (hits.some(hit => hit.cellId === cellId)) {
        this.showTooltip("You already shot here!");
        return;
      }

      // Verwerk de zet afhankelijk van de speler
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

      this.switchTurn(); // Wissel van beurt
    },

    // Voert opgeslagen zetten uit voor een speler
    executePreMoves(player) {
      const moves = this.preMoves.filter(move => move.player === player);
      moves.forEach(move => {
        this.executeMove(move.player, move.cellId);
      });
      this.preMoves = this.preMoves.filter(move => move.player !== player);
    },

    // Simuleert een zet van de CPU
    cpuTakeTurn() {
      let cellId = Math.floor(Math.random() * 100);
      while (this.p2Moves.includes(cellId) || this.p1Hits.some(hit => hit.cellId === cellId)) {
        cellId = Math.floor(Math.random() * 100);
      }
      this.takeShot('p2', cellId);
    },

    // Toont een tijdelijk bericht
    showTooltip(message) {
      this.tooltipMessage = message;
      setTimeout(() => {
        this.tooltipMessage = null;
      }, 3000); // Verberg het bericht na 3 seconden
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
