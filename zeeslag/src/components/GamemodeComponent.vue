<template>
  <div>
    <button @click="startMatchmaking" id="matchMakingButton">Play against real players!</button>
    <button @click="playAgainstBot" id="botGameButton">Play against a bot</button>
  </div>

</template>

<script>

import { Client } from '@stomp/stompjs';
// import { SockJS } from 'sockjs-client';
export default {
  name: "GamemodeComponent",
  data () {
    return {
      client: null,
      isConnected: false,
      webSocketEndpoints: {
        ingame_chat: 'ws://localhost:8080/ws/ingame_chat', // check if localhost:8080 is correct?
        game: 'ws://localhost:8080/ws/game'
      }
    };
  },
  methods: {
    playAgainstBot () {
      this.$router.push({path: "/play"})
    },
    startMatchmaking () {
      this.connectToGameWebsocket(); // attempts to create a session on the backend, in the hopes of being paired with another player session
      this.connectToIngameChatWebSocket(); // attempts to create a session on the backend, in the hopes of being paired with another player session
    },
    connectToGameWebsocket() {
      this.client = new Client({
        brokerURL: this.webSocketEndpoints.game, // url to where we connect for a session.
        connectHeaders: {}, // important keys like login, passcode, host
        onConnect: () => {
          this.isConnected = true;
          console.log('Connected to game WebSocket');

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
      this.client.activate();
  },
    connectToIngameChatWebSocket() { // connects to chat websocket server.
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
