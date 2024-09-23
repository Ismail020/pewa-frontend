<script setup>
import { RouterLink, RouterView } from 'vue-router'
import './assets/tailwind.css'
</script>

<template>
<<<<<<< HEAD
  <header>
    <img alt="logo-zeeslag" class="logo" src="@/assets/logo-zeeslag.jpg"/>

    <div class="wrapper">
      <nav class="navbar">
        <ul>
          <li><RouterLink to="/">Home</RouterLink></li>
          <li><RouterLink to="/about">About</RouterLink></li>
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

/*@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
  display: block;
  margin: 0 auto 2rem;
  max-width: 100%; 
  height: 50px;    
  max-height: 100px; 
  object-fit: cover; 
}


  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
*/
</style>
