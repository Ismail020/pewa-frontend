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

import {WebSocketAdaptor} from "@/WebSocketAdaptor.js";
// import { SockJS } from 'sockjs-client';
export default {
  name: "GamemodeComponent",
  data() {
    return {
      webSocketAdaptor: null,
      isConnected: false,
      messages: [],
      webSocketEndpoints: {
        ingame_chat: "ws://localhost:8080/ws/ingame_chat", // check if localhost:8080 is correct?
        game: "ws://localhost:8080/ws/game"
      }
    };
  },
  methods: {
    playAgainstBot() {
      this.$router.push({path: "/play"})
    },
    startMatchmaking() {
      this.connectToGameWebsocket(); // attempts to create a session on the backend, in the hopes of being paired with another player session
    },
    async connectToGameWebsocket() {
      if (this.webSocketAdaptor) {
        console.log("Already connected")
        return
      }
      try {
        const handlerCB = (data) => {
          this.messages.push(data);
        };
        this.webSocketAdaptor = new WebSocketAdaptor(
            "ws://localhost:8080/ws/game",
            handlerCB
        );
        const socket = await this.webSocketAdaptor.authenticateAndConnect();
        if (socket) {
          this.isConnected = true;
          console.log("Websocket connection established")
        } else {
          console.error("Websocket connection failed")
        }
      } catch (error) {
        console.error("Error connecting to websocket: ", error)
      }
    },

    sendMessageToGame(message) {
      if (this.webSocketAdaptor) {
        this.webSocketAdaptor.sendMessage(message);
      }
    },
  }
}


</script>

<style scoped>

</style>
