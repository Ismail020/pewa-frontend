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

import { Client } from '@stomp/stompjs';
export default {
  name: "GamemodeComponent",
  data () {
    return {
      client: null,
      isConnected: false,
      webSocketEndpoints: {
        ingame_chat: "ws://localhost:8080/ws/ingame_chat", // check if localhost:8080 is correct?
        game: "ws://localhost:8080/ws/game"
      }
    };
  },
  methods: {
    playAgainstBot () {
      this.$router.push({path: "/play"})
    },
    startMatchmaking () {
      this.connectToGameWebsocket(); // attempts to create a session on the backend, in the hopes of being paired with another player session
      //this.connectToIngameChatWebSocket(); // attempts to create a session on the backend, in the hopes of being paired with another player session
    },
    connectToGameWebsocket() {
      const token = localStorage.getItem('token');
      // retrieve token from storage
      console.log("The token is received: " + token);

      this.client = new Client({
        brokerURL: this.webSocketEndpoints.game, // url to where we connect for a session.
        connectHeaders: {
          Authorization: `Bearer ${token}`
        }, // important keys like login, passcode, host
        onConnect: () => {
          this.isConnected = true;
          console.log('Connected to game WebSocket');
          this.subscribe("/topic");
          this.publish("/app", {}, "I am finally connecting")

        },
        onDisconnect: () => {
          this.isConnected = false;
          console.log('Disconnected from game WebSocket');

        },
        onStompError: (frame) => {
          console.error(`Error: ${frame.header.message()}`)
        },
        onWebSocketError: (error) => {
          console.error('WebSocket error:', error);  // More detailed WebSocket error log
        }

      });
      console.log("Connect headers:", this.client.connectHeaders);
      this.client.activate();
  },
    connectToIngameChatWebSocket() {// connects to chat websocket server
      //catch the token from Local Storage
      const token = localStorage.getItem('token');
      this.client = new Client({
        brokerURL: this.webSocketEndpoints.ingame_chat,
        connectHeaders: {},
        onConnect: () => {
          console.log('Connected to ingame-chat WebSocket');
        },
        onDisconnect: () => {
          console.log('Disconnected from ingame-chat WebSocket');
        },
      });

      this.client.activate();
    },
    sendMessageToGame(message) {
      if (this.client && this.isConnected) {
        this.client.publish({
          destination: '/ws/game',
          body: message
        });
      }
    },
    sendChatMessage(message) {
      if (this.client && this.isConnected) {
        this.client.publish({
          destination: '/ws/ingame_chat',
          body: message,
        });
      }
    },
    beforeDestroy() {
      if (this.client) {
        this.client.deactivate();
      }
    }
  }
}



</script>

<style scoped>

</style>
