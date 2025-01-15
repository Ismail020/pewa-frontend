<template>
  <div class="friends-list bg-gray-800 p-4 text-white rounded-lg shadow-lg">
    <ul v-if="friends.length > 0">
      <li v-for="friend in friends" :key="friend.id" class="flex flex-col gap-4">
        <div class="flex gap-4 items-center">
          <div class="rounded-full h-10 w-10 bg-green-400"></div>
          {{ friend.friend.name }}
          <span :class="friend.status">{{ friend.status }}</span>
        </div>
      </li>
    </ul>
    <p v-else>No friends found.</p>
  </div>
</template>

<script>
export default {
  name: 'FriendsListComponent',
  data() {
    return {
      friends: []
    };
  },
  mounted() {
    this.fetchFriends();
  },
  methods: {
    fetchFriends() {
      const url = import.meta.env.VITE_API_URL + '/api/friends/' + this.$route.params.username;
      fetch(url)
        .then(response => {
          if (!response.ok) {
            throw new Error(`Error fetching friends: ${response.status}`);
          }
          return response.json();
        })
        .then(data => {
          this.friends = data;
        })
        .catch(error => {
          console.error('Error fetching friends:', error);
          alert('Could not fetch friends.');
        });
    }
  }
};
</script>
