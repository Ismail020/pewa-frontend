<template>
  <div>
    <form @submit.prevent="addFriend">
      <label for="email">Your Email:</label>
      <input type="email" id="email" v-model="email" required />

      <label for="friendEmail">Friend's Email:</label>
      <input type="email" id="friendEmail" v-model="friendEmail" required />

      <button type="submit">Add Friend</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      friendEmail: ''
    };
  },
  methods: {
    addFriend() {
      const apiUrl = `${import.meta.env.VITE_API_URL}/api/friend-requests/send`;

      // Retrieve the JWT token from localStorage
      const token = localStorage.getItem('authToken');

      // Check if token exists, if not show an alert
      if (!token) {
        alert('You must be logged in to send friend requests.');
        return;
      }

      // Fetch user IDs by email
      Promise.all([
        fetch(`${import.meta.env.VITE_API_URL}/api/users?email=${this.email}`, {
          headers: {
            'Authorization': `Bearer ${token}` // Add Bearer token in Authorization header
          }
        }).then(response => response.json()),

        fetch(`${import.meta.env.VITE_API_URL}/api/users?email=${this.friendEmail}`, {
          headers: {
            'Authorization': `Bearer ${token}` // Add Bearer token in Authorization header
          }
        }).then(response => response.json())
      ])
          .then(([sender, receiver]) => {
            if (!sender || !receiver) {
              throw new Error('User not found');
            }

            // Send the friend request using the user IDs
            return fetch(apiUrl, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` // Add Bearer token in Authorization header
              },
              body: JSON.stringify({
                senderId: sender.id,
                receiverId: receiver.id
              })
            });
          })
          .then((response) => {
            if (!response.ok) {
              throw new Error(`Server response was ${response.status}`);
            }
            alert('Friend request sent successfully');
          })
          .catch((error) => {
            console.error('Error sending friend request:', error);
            alert('Error sending friend request. Please try again.');
          });
    }
  }
};
</script>
