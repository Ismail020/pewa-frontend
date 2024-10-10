<template>
    <div class="min-h-screen bg-blue-900 text-white p-4">
      <HeaderComponent
        :player1="player1"
        :player2="player2"
        :round="round"
        :turn="turn"
        :score1="score1"
        :score2="score2"
      />
      
      <main class="grid grid-cols-3 gap-4 mt-6">
        <LogComponent :title="'P1 Log'" :moves="p1Moves" />
        
        <div class="grid grid-cols-2 gap-4">
          <BoardComponent :ships="p1Ships" :hits="p1Hits" />
          <BoardComponent :ships="p2Ships" :hits="p2Hits" />
        </div>
  
        <LogComponent :title="'P2 Log'" :moves="p2Moves" />
      </main>
  
      <ChatComponent :messages="chatMessages" />
    </div>
  </template>
  
  <script>
  import HeaderComponent from './HeaderComponent.vue';
  import LogComponent from './LogComponent.vue';
  import BoardComponent from './BoardComponent.vue';
  import ChatComponent from './ChatComponent.vue';
  
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
        player1: "xX_sampleUsername123_Xx",
        player2: "xX_sampleUsername345_Xx",
        round: 8,
        turn: "P1",
        score1: 4,
        score2: 3,
        p1Moves: ["F11", "E16", "W3"],
        p2Moves: ["G2", "H16", "H3"],
        p1Ships: [
          { id: 1, class: "col-start-2 row-start-3 col-span-1 row-span-5 bg-gray-500" },
          { id: 2, class: "col-start-7 row-start-5 col-span-2 bg-gray-500" }
        ],
        p1Hits: [{ id: 1, class: "col-start-5 row-start-6 text-red-600 font-bold text-center", text: "X" }],
        p2Ships: [
          { id: 3, class: "col-start-1 row-start-10 col-span-5 bg-gray-500" }
        ],
        p2Hits: [{ id: 2, class: "col-start-2 row-start-6 text-red-600 font-bold text-center", text: "X" }],
        chatMessages: [
          { user: "xX_sampleUsername123_Xx", text: "worst player EUW servers? Uninstall the game please?", class: "text-red-400" },
          { user: "xX_sampleUsername456_Xx", text: "Mad cuz bad, gg losing dog tier player.", class: "text-blue-400" }
        ]
      };
    },
  };
  </script>
  