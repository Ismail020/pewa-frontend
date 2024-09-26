<template>
    <nav class="bg-gray-800 p-4">
      <ul class="flex space-x-4">
        <li><RouterLink to="/" class="text-white hover:text-gray-400">Home</RouterLink></li>
        <li><RouterLink to="/about" class="text-white hover:text-gray-400">About</RouterLink></li>
        <li><RouterLink to="/login" class="text-white hover:text-gray-400">Log In</RouterLink></li>
        <li><RouterLink to="/register" class="text-white hover:text-gray-400">Register</RouterLink></li>
        <li><RouterLink to="/play" class="text-white hover:text-gray-400">Play Now</RouterLink></li>
      </ul>
    </nav>
  </template>
  
  <script>
  export default {
    name: 'Navbar'
  }
  </script>
  
  <style scoped>
  </style>