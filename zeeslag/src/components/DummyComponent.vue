<template>
  <header class="dummy-header">
    <h1>Dummy Component</h1>
    <p>This is a placeholder header component.</p>
  </header>
</template>

<script>
export default {
  name: 'DummyHeader'
};
</script>

<style scoped>
.dummy-header {
  background: linear-gradient(135deg, #42b883, #35495e);
  color: white;
  padding: 2rem;
  text-align: center;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.dummy-header:hover {
  transform: translateY(-5px);
}

h1 {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
  font-family: 'Montserrat', sans-serif;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

p {
  font-size: 1.2rem;
  margin: 0;
  font-family: 'Roboto', sans-serif;
  opacity: 0.8;
}
</style>
