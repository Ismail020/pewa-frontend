<template>
  <div class="play-button">
    <button @click="goToPlayPage">PLAY</button>
  </div>
</template>

<script>
export default {
  methods: {
    goToPlayPage() {
      this.$router.push({ name: 'play' });
    }
  }
};
</script>


<style scoped>
.play-button {
  text-align: center;
  margin-top: 50px;
}

.play-button button {
  background-color: red;
  color: white;
  font-size: 2em;
  padding: 20px;
  border: none;
  cursor: pointer;
}
</style>