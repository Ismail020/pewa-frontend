<template>
  <div class="min-h-screen bg-blue-900 text-white p-4">
    <HeaderComponent
        :player1="currentPlayer"
        :player2="rightPlayer"
        :round="round"
        :turn="turn"
        :score1="score1"
        :score2="score2"
        :phase="p1Phase"
    />

    <main class="grid grid-cols-4 gap-4 mt-6">
      <LogComponent :title="'P2 Log'" :moves="p2Moves" class="max-w-xs"/>

        <BoardPlayerComponent
            :ships="myShips"
            :hits="othersHits"
            :phase="p1Phase"
            :playerType="'human'"
            @allShipsPlaced="handleAllShipsPlaced()"
            @cellClicked="noop()"
        />

        <BoardPlayerComponent
            ref="p2Board"
            :ships="[]"
            :hits="myHits"
            :phase="p2Phase"
            :playerType="'CPU'"
            @allShipsPlaced="noop()"
            @cellClicked="takeShot(currentPlayer, $event)"
        />

      <LogComponent :title="'P1 Log'" :moves="p1Moves" class="max-w-xs"/>
    </main>
    <ChatComponent :messages="chatMessages"/>
  </div>
</template>

<script>
import HeaderComponent from './HeaderComponent.vue';
import LogComponent from './LogComponent.vue';
import BoardPlayerComponent from './BoardPlayerComponent.vue';
import ChatComponent from './ChatComponent.vue';
import {jwtDecode} from "jwt-decode";



export default {
  name: "BattleshipGame",
  components: {
    HeaderComponent,
    LogComponent,
    BoardPlayerComponent,
    ChatComponent,
  },
  data() {
    return {
      wsService:  null,
      currentPlayer: jwtDecode(localStorage.getItem("token")).sub,
      player1: this.$route.query.player1,
      player2: this.$route.query.player2,
      round: 1, //starts at round 1, goes up per turn done by player 2. could still be changed for if the first player to start is random.
      turn: "P1", // could still be randomised when adding multiplayer
      score1: 0,
      score2: 0,
      p1Moves: [], // list of all shots taken by player
      p2Moves: [], // list of all shots taken by player
      myShips: [
          //list of all ships to be used by the players.
        {name: "Carrier", size: 5, locations: [], placed: false},
        {name: "Battleship", size: 4, locations: [], placed: false},
        {name: "Cruiser", size: 3, locations: [], placed: false},
        {name: "Submarine", size: 3, locations: [], placed: false},
        {name: "Destroyer", size: 2, locations: [], placed: false}
      ],
      othersHits: [], //list of all hits taken by the player.
      p2Ships: [
        {name: "Carrier", size: 5, locations: [], placed: false},
        {name: "Battleship", size: 4, locations: [], placed: false},
        {name: "Cruiser", size: 3, locations: [], placed: false},
        {name: "Submarine", size: 3, locations: [], placed: false},
        {name: "Destroyer", size: 2, locations: [], placed: false}
      ],
      myHits: [],
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
      winner: null
    };
  },
  computed: {

    rightPlayer() {
      return this.player1 === this.currentPlayer ? this.player2 : this.player1;
    }
  },
  mounted () {
  },
  methods: {

    noop() {
      //do nothing
    },

    handleAllShipsPlaced() {

      const gameId = this.$route.params.id

        this.p1Phase = 'gameplay';
        this.p2Phase = 'gameplay';
        this.$webSocketService.sendMessage("/app/ships-placed", this.myShips, {"gameId": gameId});

      // check if both players are ready to start (boards are set up).
      if (this.p1Phase === 'gameplay' && this.p2Phase === 'gameplay') {

        this.$webSocketService.subscribe("/user/queue/game/gameover", (response) => {
          let gameOverMessage = JSON.parse(response.body)
          console.log(gameOverMessage)
          this.winner = gameOverMessage.winner
        });
        this.$webSocketService.subscribe("/user/queue/game/shots", (response) => {
          let shotinfo = JSON.parse(response.body)
          console.log(shotinfo)
          this.handleShotResult(shotinfo.location, shotinfo.result, shotinfo.shooter)
          if (shotinfo.gameOver === true) {
            this.endGame(this.winner)
          }
        });

        console.log("starting game")
        this.startGame();
      }
    },


    handleShotResult(cellId, result, shooter) {
      const isHit = result === "hit";
      console.log(`Shot result:`, { cellId, result, shooter });

      if (shooter === this.currentPlayer) {
        console.log(`Adding to myHits and p1Moves`);
        this.myHits.push({cellId, hit: isHit });
        this.p1Moves.push(cellId);

        if (isHit) { // Only increase score when it's a hit
          this.score1 += 1;
        }
      } else {
        console.log(`Adding to othersHits and p2Moves`);
        this.othersHits.push({ cellId, hit: isHit });
        this.p2Moves.push(cellId);

        if (isHit) { // Only increase score when it's a hit
          this.score2 += 1;
        }
      }
    },

    //starts the game
    startGame() {
      // reset scores / moves (game starts again).
      this.score1 = 0;
      this.score2 = 0;
      this.p1Moves = [];
      this.p2Moves = [];
    },

    // manages turn logic. Activates after the current turn is still for player1, but the player's made their move.
    switchTurn() {
      if (this.turn === "P1") {
        this.turn = "P2";
        // start cpu action if it's the CPU's turn
        if (this.player2Type === 'CPU') {
          // use setTimeout to create a delay before the CPU takes its turn, otherwise its your turn instantly after you took your turn again.
          setTimeout(() => {
            this.cpuTakeTurn(); // call the CPU action after a delay
          }, 2000); // delay 2 seconds
        }
      } else {
        // switch back to player1, rounds continue.
        this.turn = "P1";
        this.round++
      }
    },



    takeShot(player, cellId) {
      console.log(player + " tried to shoot this cell: " + cellId)
      if (player === this.currentPlayer) {
        this.$webSocketService.sendMessage(`/app/game/shots`,  {location: cellId}, {"gameId": this.$route.params.id});
      }
    },

    //ends the game and announces a winner, resets the game after clicking ok on the alert.
    endGame(winner) {
      alert(winner + " wins!");
      this.resetGame();
      this.$router.push("/selectGamemode")
    },
    //resets the game by resetting all relevant variables from before the game starts.
    resetGame() {
      this.myShips.forEach(ship => {
        ship.locations = [];
        ship.placed = false;
      });
      this.p2Ships.forEach(ship => {
        ship.locations = [];
        ship.placed = false;
      });
      this.othersHits = [];
      this.myHits = [];
      this.p1Moves = [];
      this.p2Moves = [];
      this.p1Phase = 'setup';
      this.p2Phase = 'setup';
      this.score1 = 0;
      this.score2 = 0;
      this.turn = "P1";
    }
  }
};
</script>

<style scoped>
</style>
