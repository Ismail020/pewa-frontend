<script setup>
import { RouterLink, RouterView } from 'vue-router'
import './assets/tailwind.css'
</script>

<template>
  <header>
    <img alt="logo-zeeslag" class="logo" src="@/assets/logo-zeeslag.jpg"/>

    <div class="wrapper">
      <nav class="navbar">
        <ul>
          <li><RouterLink to="/">Home</RouterLink></li>
          <li><RouterLink to="/about">About</RouterLink></li>
          <li><RouterLink to="/DummyViewGameUI">DummyViewGameUI</RouterLink></li>
          <li><RouterLink to="/login">Log In</RouterLink></li>
          <li><RouterLink to="/register">Register</RouterLink></li>
          <li><RouterLink to="/play">Play Now</RouterLink></li>
        </ul>
      </nav>
    </div>
  </header>

  

  <RouterView />
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  width: 100%;
  max-width: 1200px;
  background-size: cover;
  height: 50;
  max-height: 200px;
  width: 400;
}

.navbar {
  background-color: #333;
  padding: 1rem;
  text-align: center;
}

.navbar ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
}

.navbar ul li {
  display: inline;
  margin: 0 15px;
}

.navbar ul li a {
  color: white;
  text-decoration: none;
  font-weight: bold;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
  display: block;
  margin: 0 auto 2rem;
  max-width: 100%; /* Zorgt ervoor dat de afbeelding niet breder wordt dan het scherm */
  height: 50px;    /* Behoud de verhoudingen */
  max-height: 100px; /* Beperk de hoogte van de afbeelding */
  object-fit: cover; /* Zorgt ervoor dat de afbeelding netjes bijgesneden wordt indien nodig */
}


  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
