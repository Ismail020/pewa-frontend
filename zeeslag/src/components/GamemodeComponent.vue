<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-gray-800 text-white">
    <h1 class="text-4xl font-bold mb-8">Choose Your Game Mode</h1>

    <div class="space-y-4">
      <button
          @click="startMatchmaking"
          id="matchMakingButton"
          class="w-64 py-3 px-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105"
      >
        Play against real players!
      </button>

      <button
          @click="playAgainstBot"
          id="botGameButton"
          class="w-64 py-3 px-6 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105"
      >
        Play against a bot
      </button>
    </div>
  </div>
</template>

<script>
import WebSocketService from "@/stores/WebSocketService.js";
import { jwtDecode } from "jwt-decode";
import CONFIG from "@/config.js";

export default {
  name: "GamemodeComponent",
  data() {
    return {
      webSocketService: null,
      gameEndPoint: "ws://"+CONFIG.backendUrl+"/ws/game",
      username: null
    };
  },
  methods: {
    playAgainstBot() {
      // Navigate to the play against bot page
      this.$router.push({ path: "/play" });
    },

    startMatchmaking() {
      const token = localStorage.getItem("token"); // Get token from localStorage
      console.log("Starting matchmaking with token: " + token);

      try {
        const decodedToken = jwtDecode(token);
        console.log("Decoded token: ", decodedToken);
        this.username = decodedToken.sub; // Extract the username from token
        console.log("Decoded username: ", this.username);
      } catch (error) {
        console.error("Failed to decode token: ", error);
      }

      this.webSocketService = new WebSocketService(this.gameEndPoint, token);

      this.webSocketService.connect(
          this.handleWebSocketConnect,
          this.handleWebSocketDisconnect,
          this.handleWebSocketError
      );
    },

    handleWebSocketConnect(username) {
      console.log("Connected as ", username);

      // Send start message to the WebSocket server
      this.webSocketService.sendMessage("/app/start", {});
      console.log(`Subscribing to: /user/${this.username}/queue/game`);

      // Subscribe to game messages for the user
      this.webSocketService.subscribe('/user/queue/game', this.handleGameMessage);
    },

    handleWebSocketDisconnect() {
      console.log("Disconnected from WebSocket");
    },

    handleWebSocketError(error) {
      console.error("WebSocket error:", error);
    },

    handleGameMessage(message) {
      console.log("Received message:", message);

      let gameData;
      try {
        gameData = JSON.parse(message); // Parse the received message
      } catch (e) {
        console.log("Error parsing message: ", e);
      }

      if (gameData && gameData.player1 && gameData.player2) {
        console.log("Game started with data:", gameData);
        this.$router.push({ path: "/play" });
      } else {
        console.error("Invalid game data received:", gameData);
      }
    }
  }
};
</script>

<style scoped>

</style>
