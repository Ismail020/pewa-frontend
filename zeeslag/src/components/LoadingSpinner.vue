<template>
  <div v-if="isInQueue" class="loading-container">
    <div class="loading-spinner"></div>
    <p>Waiting for opponent...</p>
  </div>
</template>

<script>
export default {
  props: {
    isInQueue: {
      type: Boolean,
      required: true
    }
  }
};
</script>

<style scoped>
.loading-container {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100vh;
  font-size: 18px;
  color: #333;
}

.loading-spinner {
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-top: 4px solid #3498db;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 1s linear infinite;
  margin-bottom: 20px;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
