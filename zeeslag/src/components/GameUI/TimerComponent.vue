<template>
  <div class="timer">{{ timeLeft }}s</div>
</template>

<script>
export default {
  props: {
    time: Number
  },
  data() {
    return {
      timeLeft: this.time
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
    }
  },
  mounted() {
    setInterval(this.countdown, 1000);
  }
};
</script>

<style scoped>
.timer {
  font-size: 1.5rem;
}
</style>
