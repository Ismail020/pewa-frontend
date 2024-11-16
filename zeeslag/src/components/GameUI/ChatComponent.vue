<template>
    <div class="bg-gray-800 p-4 rounded-md">
      <h2 class="font-bold mb-2">Chat</h2>

      <!-- Scrollable chat messages container -->
      <div
        ref="chatContainer"
        class="space-y-2 overflow-y-auto h-64 p-2 border border-gray-600 rounded-md"
      >
        <div v-for="(message, index) in chatMessages" :key="index" class="text-sm">
          <span :class="message.class">{{ message.user }}:</span> {{ message.text }}
        </div>
      </div>

      <!-- Input form for adding a new chat message -->
      <div class="mt-4">
        <input
          v-model="newMessage"
          @keyup.enter="addMessage"
          placeholder="Type a message..."
          class="bg-gray-700 p-2 rounded-md w-full text-white"
        />
        <button
          @click="addMessage"
          class="bg-blue-500 p-2 mt-2 rounded-md w-full"
        >
          Send
        </button>
      </div>
    </div>
  </template>

  <script>
  // import { Client } from '@stomp/stompjs';
  // import { SockJS } from 'sockjs-client';
  export default {
    name: "ChatComponent",
    data() {
      return {
        newMessage: "",  // Model for the input field
        chatMessages: [  // Initial chat messages
          { user: "xX_sampleUsername123_Xx", text: "worst player EUW servers? Uninstall the game please?", class: "text-red-400" },
          { user: "xX_sampleUsername456_Xx", text: "Mad cuz bad, gg losing dog tier player.", class: "text-blue-400" },
        ],
      };
    },
    methods: {
      // addMessage() {
      //   if (this.newMessage.trim() !== "") {
      //     // Add the new message to the chat log
      //     this.chatMessages.push({
      //       user: "You",  // Assuming the current user is 'You'
      //       text: this.newMessage,
      //       class: "text-green-400"  // Different color for the user's messages
      //     });
      //     this.newMessage = "";  // Clear the input field
      //     this.scrollToBottom();  // Auto-scroll to the bottom after adding a new message
      //   }
      // },
      scrollToBottom() {
        // Scroll the chat container to the bottom
        this.$nextTick(() => {
          const container = this.$refs.chatContainer;
          container.scrollTop = container.scrollHeight;
        });
      },
    },
    beforeDestroy() {
      if (this.client) {
        this.client.deactivate();
      }
    },
    mounted () {
      // Scroll to the bottom when the component is mounted
      this.scrollToBottom();
    }
  };

  </script>

  <style scoped>
  /* Styling adjustments if needed */
  </style>
