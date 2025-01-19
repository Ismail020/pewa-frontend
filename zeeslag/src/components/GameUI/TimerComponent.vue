<template>
  <div class="timer">{{ timeLeft }}s</div>
</template>

<script>
import WebSocketService from '@/stores/WebSocketService';

export default {
  props: {
    time: Number,
    matchId: String
  },
  data() {
    return {
      timeLeft: this.time,
      webSocketService: new WebSocketService('ws://your-websocket-endpoint')
    };
  },
  watch: {
    time() {
      this.timeLeft = this.time;
    }
  },
  methods: {
    countdown() {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        this.$emit('time-up');
      }
    },
    handleTimerUpdate(message) {
      const data = JSON.parse(message.body);
      this.timeLeft = data;
    }
  },
  mounted() {
    this.webSocketService.connect('your-jwt-token');
    this.webSocketService.subscribeToMatch(this.matchId, this.handleTimerUpdate);
    setInterval(this.countdown, 1000);
  },
  beforeDestroy() {
    this.webSocketService.unsubscribe(`/topic/match/${this.matchId}/timer`);
    this.webSocketService.disconnect();
  }
};
</script>

<style scoped>
.timer {
  font-size: 1.5rem;
}
</style>