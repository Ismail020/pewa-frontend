<template>
    <div class="news-section bg-gray-800 text-white p-4 rounded-md">
      <h2 class="text-xl font-bold mb-4">Latest News</h2>
      <ul>
        <li v-for="news in newsItems" :key="news.id" class="mb-4">
          <div class="text-lg font-bold">{{ news.title }}</div>
          <div class="text-sm text-gray-400">{{ news.date }}</div>
          <div class="text-base">{{ news.description }}</div>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    name: 'NewsComponent',
    data() {
      return {
        newsItems: [
          { id: 1, title: 'New Season Coming Soon!', date: '2024-10-05', description: 'The new season is just around the corner, with exciting updates and rewards!' },
          { id: 2, title: 'Patch 1.0.3 Released', date: '2024-09-29', description: 'We have just released patch 1.0.3 which includes minor bug fixes and performance improvements.' },
          { id: 3, title: 'Community Event This Weekend', date: '2024-09-15', description: 'Join us for a special in-game event this weekend and win exclusive rewards!' }
        ]
      };
    }
  };
  </script>
  
  <style scoped>
  .news-section {
    max-width: 600px; /* Pas dit aan afhankelijk van je layout */
  }
  </style>
  