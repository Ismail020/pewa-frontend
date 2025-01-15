<template>
  <div>
    <form @submit.prevent="addFriend">
      <label for="username">Your Username:</label>
      <input type="text" id="username" v-model="username" required />

      <label for="friendUsername">Friend's Username:</label>
      <input type="text" id="friendUsername" v-model="friendUsername" required />

      <button type="submit">Add Friend</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '', // Dynamisch ophalen van username kan hier worden toegevoegd
      friendUsername: ''
    };
  },
  methods: {
    addFriend() {
      const url = import.meta.env.VITE_API_URL + '/api/friends/add';
      fetch(url, {
        method: "POST",
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          username: this.username,
          friendUsername: this.friendUsername,
        }),
      })
        .then(response => {
          if (!response.ok) {
            throw new Error(`Server response was ${response.status}`);
          }
          return response.json();
        })
        .then(() => {
          alert('Friend added successfully');
        })
        .catch(error => {
          console.error('Error adding friend:', error);
          alert('Error adding friend. Please try again.');
        });
    }
  }
};
</script>
