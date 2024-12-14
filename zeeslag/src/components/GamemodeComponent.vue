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
import {Client} from '@stomp/stompjs';
import { jwtDecode } from "jwt-decode";

export default {
  name: "GamemodeComponent",
  data() {
    return {
      client: null,
      isConnected: false,
      gameEndPoint: "ws://localhost:8080/ws/game",
      username: null,
    };
  },
  methods: {
    playAgainstBot() {
      this.$router.push({path: "/play"})
    },
    startMatchmaking() {
      const token = localStorage.getItem('token');
      // retrieve token from storage
      console.log("Starting matchmaking with token: " + token);
      //decode the username from the token to be later used for user-specific channel subscriptions
      try {
        const decodedToken = jwtDecode(token);
        console.log("Decoded token is : " + decodedToken)
        this.username = decodedToken.sub;
        console.log("Decoded username is: ", this.username);
      } catch (error) {
        console.error("Failed to decode token: ", error)
      }

      this.client = new Client({
        brokerURL: this.gameEndPoint, // url to where we connect for a session.
        connectHeaders: {
          Authorization: `Bearer ${token}`
        },
        onConnect: this.onWebSocketConnect.bind(this),
        onDisconnect: this.onWebSocketDisconnect.bind(this),
        onStompError: this.onStompError,
        onWebSocketError: this.onWebSocketError,
      });

      console.log('WebSocket client: ', this.client);

      this.client.activate();
      console.log('WebSocket client status: ', this.client.active);
    },

    onWebSocketConnect() {
      this.isConnected = true;
      console.log('Connected to game WebSocket');

      if (!this.client || !this.client.connected) {
        console.error('WebSocket client is not connected!');
        return;
      }

      this.client.publish({
        destination: "/app/start",
        body: JSON.stringify({gameType: "player-vs-player"}),
      });
      console.log(`Subscribing to: /user/${this.username}/queue/game`);


      try {
        this.client.subscribe('/user/queue/game', (message) => {
          if (message && message.body) {
            console.log('Received message: ', message.body);
          } else {
            console.error("No message body received");
          }
        });
        console.log('Subscribed to /user/queue/game');
        this.$router.push({path: '/play'});
      } catch (error) {
        console.error('Subscription failed: ', error);
      }

    },

    onWebSocketDisconnect() {
      this.isConnected = false;
      console.log('Disconnected from game WebSocket');
    }
    ,
    // onStompError(frame) {
    //   console.error(Stomp Error: ${frame.header.message()})
    // },
    onWebSocketError(error) {
      console.error('WebSocket error:', error);
    },

    beforeDestroy() {
      if (this.client) {
        this.client.deactivate();
      }
    },
    sendMessageToGame(message) {
      if (this.client && this.isConnected) {
        this.client.publish({
          destination: '/ws/game',
          body: message
        });
      }
    }
    ,
    sendChatMessage(message) {
      if (this.client && this.isConnected) {
        this.client.publish({
          destination: '/ws/ingame_chat',
          body: message,
        });
      }
    }
  }
}

</script>

<style scoped>

</style>
