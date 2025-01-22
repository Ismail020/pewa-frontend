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
      <LogComponent :title="'P1 Log'" :moves="p1Moves" class="max-w-xs"/>

        <BoardComponent
            :ships="p1Ships"
            :hits="p1Hits"
            :phase="p1Phase"
            :playerType="'human'"
            @allShipsPlaced="handleAllShipsPlaced()"
            @cellClicked="takeShot(this.currentPlayer, $event)"
        />

        <BoardComponent
            ref="p2Board"
            :ships="p2Ships"
            :hits="p2Hits"
            :phase="p2Phase"
            :playerType="'CPU'"
            @allShipsPlaced="handleAllShipsPlaced()"
            @cellClicked="takeShot(rightPlayer, $event)"
        />

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
import {jwtDecode} from "jwt-decode";



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
      p1Ships: [
          //list of all ships to be used by the players.
        {name: "Carrier", size: 5, locations: [], placed: false},
        {name: "Battleship", size: 4, locations: [], placed: false},
        {name: "Cruiser", size: 3, locations: [], placed: false},
        {name: "Submarine", size: 3, locations: [], placed: false},
        {name: "Destroyer", size: 2, locations: [], placed: false}
      ],
      p1Hits: [], //list of all hits taken by the player.
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
  computed: {

    rightPlayer() {
      console.log("player1 : " + this.player1 )
      console.log("player2 : " + this.player2 )
      console.log("currentplayer : " +this.currentPlayer )
      return this.player1 === this.currentPlayer ? this.player2 : this.player1;
    }
  },
  mounted () {
  },
  methods: {
    //method which is activated in the event that all ships have been placed from the player's side.
    //needs to be fleshed out more still in case player is a real player.
    handleAllShipsPlaced() {

      const gameId = this.$route.params.id
      console.log("Game id extracted: ", gameId)

        this.p1Phase = 'gameplay'; // change phase to gameplay for P1
        this.$webSocketService.sendMessage("/app/ships-placed", this.p1Ships, {"gameId": gameId});



      // check if both players are ready to start (boards are set up).
      if (this.p1Phase === 'gameplay' && this.p2Phase === 'gameplay') {
        this.$webSocketService.subscribe("/queue/game/shots", (response) => {
          let shotinfo = JSON.parse(response.body).message
        });
        console.log("starting game")
        this.startGame();
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


    //shoots at the target @player 's board on the @cellId location
    // takeShot(player, cellId) {
      // if (player === this.$route.query.player1) {
      //   this.p1Moves.push(cellId); // record player 1's move
      //   const hitShip = this.p2Ships.find(ship => ship.locations.includes(cellId));
      //   if (hitShip) {
      //     this.p2Hits.push({cellId, hit: true}); // record player 2's ship being hit
      //     this.score1++; // player score goes up
      //     console.log("P1 hit! Cell:" + cellId);
      //     //
      //   } else {
      //     this.p2Hits.push({cellId, hit: false});
      //     console.log("P1 miss. Cell: " + cellId);
      //     //
      //   }
      // } else {
      //   this.p2Moves.push(cellId); // record player 2's move
      //   const hitShip = this.p1Ships.find(ship => ship.locations.includes(cellId));
      //   if (hitShip) {
      //     this.p1Hits.push({cellId, hit: true});
      //     this.score2++;
      //     //
      //     console.log("P2 hit! Cell: " + cellId);
      //   } else {
      //     this.p1Hits.push({cellId, hit: false});
      //     //
      //     console.log("P2 miss. Cell: " + cellId);
      //   }
      // }
    takeShot(player, cellId) {
      if (player === this.$route.query.player1) {
        this.p1Moves.push(cellId);
      } else {
        this.p2Moves.push(cellId);
      }
      this.$webSocketService.sendMessage(`/app/game/shots`, {
        location: cellId
      });
    },

    //
    // checkAllShipsSunk(player) {
    //   const ships = player === 'p1' ? this.p1Ships : this.p2Ships;
    //   const hits = player === 'p1' ? this.p1Hits : this.p2Hits;
    //
    //   return ships.every(ship =>
    //       ship.locations.every(location =>
    //           hits.some(hit => hit.cellId === location && hit.hit)
    //       )
    //   );
    // },
    //ends the game and announces a winner, resets the game after clicking ok on the alert.
    endGame(winner) {
      alert(winner + " wins!");
      this.resetGame();
    },
    //resets the game by resetting all relevant variables from before the game starts.
    resetGame() {
      this.p1Ships.forEach(ship => {
        ship.locations = [];
        ship.placed = false;
      });
      this.p2Ships.forEach(ship => {
        ship.locations = [];
        ship.placed = false;
      });
      this.p1Hits = [];
      this.p2Hits = [];
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
