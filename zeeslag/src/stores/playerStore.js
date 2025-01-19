import { defineStore } from 'pinia';

export const usePlayerStore = defineStore('playerStore', {
    state: () => ({
        players: [],  // Initialize with an empty array or any default state
        queueSize: 0,  // Optional, for tracking queue size if needed
    }),
    actions: {
        setPlayers(players) {
            console.log(players);
            this.players = players;
            console.log(this.players)
        },
        setQueueSize(queueSize) {
            this.queueSize = queueSize;
        }
    }
});
