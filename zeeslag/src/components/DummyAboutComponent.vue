<template>
  <section class="about-section">
    <h2>About This Application</h2>
    <p>
      This is a dummy About page for demonstration purposes.
      The application is built with Vue.js and is designed to showcase a simple, responsive, and modern web interface.
    </p>
    <p>
      Feel free to explore the features and components that make up this application, including navigation, headers, and other UI elements.
    </p>
  </section>
</template>

<script>
export default {
  name: 'AboutComponent'
};
</script>

<style scoped>
.about-section {
  max-width: 800px;
  margin: 3rem auto;
  padding: 2rem;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
}

h2 {
  font-size: 2rem;
  color: #35495e;
  margin-bottom: 1.5rem;
  font-family: 'Montserrat', sans-serif;
  text-transform: uppercase;
}

p {
  font-size: 1.1rem;
  line-height: 1.6;
  color: #666;
  margin-bottom: 1rem;
  font-family: 'Roboto', sans-serif;
}

.about-section p:last-of-type {
  margin-bottom: 0;
}

@media (min-width: 768px) {
  .about-section {
    padding: 3rem;
  }

  h2 {
    font-size: 2.5rem;
  }

  p {
    font-size: 1.2rem;
  }
}
</style>
