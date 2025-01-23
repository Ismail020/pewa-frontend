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
              @click="challengePlayer(player)"
          >
            challenge
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


    challengePlayer(player) {
      console.log("challenged clicked!")
      console.log(player);

      this.$webSocketService.sendMessage("/app/queue/challenge", player);
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
/* General styling */
.matchmaking-list {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #2d3748; /* Dark gray background */
  color: white;
}

h1 {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
  text-align: center;
}

/* Table styling */
table {
  width: 100%;
  max-width: 800px;
  border-collapse: collapse;
  margin-top: 1rem;
  background-color: #1a202c; /* Darker gray for table background */
  border: 1px solid #4a5568; /* Medium gray border */
}

th, td {
  border: 1px solid #4a5568; /* Medium gray border */
  padding: 0.75rem 1rem;
  text-align: left;
  font-size: 1rem;
}

th {
  background-color: #4a5568; /* Medium gray for table headers */
  color: white;
  font-weight: bold;
}

td {
  background-color: #2d3748; /* Slightly lighter gray for table rows */
  color: white;
}

/* Button styling */
button {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.375rem;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: transform 0.3s ease, background-color 0.3s ease;
}

button:hover {
  transform: scale(1.05);
}

/* Join button */
.bg-blue-500 {
  background-color: #4299e1; /* Blue */
  color: white;
}

.bg-blue-500:hover {
  background-color: #2b6cb0; /* Darker blue */
}

/* Challenge button */
.bg-yellow-500 {
  background-color: #ecc94b; /* Yellow */
  color: #1a202c; /* Dark text for contrast */
}

.bg-yellow-500:hover {
  background-color: #b7791f; /* Darker yellow */
}

/* Responsive adjustments */
@media (max-width: 768px) {
  h1 {
    font-size: 1.5rem;
  }

  table {
    font-size: 0.875rem;
  }

  button {
    font-size: 0.875rem;
  }
}
</style>
