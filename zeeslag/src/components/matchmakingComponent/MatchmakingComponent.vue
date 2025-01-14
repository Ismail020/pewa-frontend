<template>
  <div class="matchmaking-list">
    <h1>There are {{ queueSize }} players currently in queue...</h1>
    <table class="table-auto border-collapse border border-gray-400 w-full text-left">
      <thead>
      <tr>
        <th class="border border-gray-300 px-5 py-2">Player Name</th>
        <th class="border border-gray-300 px-5 py-2">Action</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="player in players" :key="player">
        <td class="border border-gray-300 px-5 py-2">{{ player }}</td>
        <td class="border border-gray-300 px-5 py-2">
          <button
              class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
              @click="joinPlayer(player)"
          >
            Join
          </button>
          <button
              v-if="isChallenger(player)"
              class="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-700"
              @click="challengePlayer(player)"
          >
            Challenge
          </button>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { jwtDecode } from "jwt-decode";
import { usePlayerStore } from '@/stores/playerStore.js';


export default {
  computed: {
    players() {
      const playerStore = usePlayerStore(); // Access the store
      return playerStore.players; // Access the state (player list)
    },
    queueSize() {
      const playerStore = usePlayerStore(); // Access the store
      return playerStore.queueSize; // Access the queue size
    }
  },
  name: "MatchmakingList",
  data() {
    return {
      username: null,
    };
  },
  methods: {
    updatePlayers(newPlayers) {
      const playerStore = usePlayerStore(); // Access the store
      playerStore.setPlayers(newPlayers); // Update the state with a new list of players
    },
    joinPlayer(playerId) {
      // Emit the joinPlayer event to the parent
      this.$emit("joinPlayer", playerId);
    },

    challengePlayer(playerId) {
      // Emit the challengePlayer event to the parent
      this.$emit("challengePlayer", playerId);
    },

    isChallenger(player) {
      // Optional: Check if the current user can challenge the player
      return player.name !== this.username;
    },
  },

  created() {
    const token = localStorage.getItem("token");

    // Check if token exists before trying to decode
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        this.username = decodedToken.sub; // Assuming 'sub' contains the username
      } catch (error) {
        console.error("Failed to decode token:", error);
        this.username = null;
      }
    } else {
      console.error("No token found in localStorage.");
      this.username = null;
    }
  },
};
</script>

<style scoped>
h1 {
  font-size: 24px;
  font-style: italic;
}
.table-auto {
  width: 100%;
  border-collapse: collapse;
}
.border {
  border: 1px solid gray;
}
.bg-blue-500 {
  background-color: #4299e1;
}
.bg-yellow-500 {
  background-color: #ecc94b;
}
.hover\:bg-blue-700:hover {
  background-color: #2b6cb0;
}
.hover\:bg-yellow-700:hover {
  background-color: #b7791f;
}
</style>
