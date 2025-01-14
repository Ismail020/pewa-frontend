<template>
  <div class="friend-request-form">
    <form @submit.prevent="sendFriendRequest">
      <div class="input">
        <input v-model="userId" id="userId" type="text" placeholder="Your User ID" required />
      </div>
      <div class="input">
        <input v-model="friendId" id="friendId" type="text" placeholder="Friend's User ID" required />
      </div>
      <div class="input">
        <button type="submit">Add Friend</button>
      </div>
    </form>
    <div v-if="successMessage" class="p-4 mb-4 text-sm text-green-800">{{ successMessage }}</div>
    <div v-if="errorMessage" class="p-4 mb-4 text-sm text-red-800">{{ errorMessage }}</div>
  </div>
</template>

<script>
export default {
  name: "FriendsComponent",
  data() {
    return {
      userId: "",
      friendId: "",
      successMessage: null,
      errorMessage: null,
    };
  },
  methods: {
    async sendFriendRequest() {
      const url = import.meta.env.VITE_API_URL + "/api/v1/friends/add";
      try {
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            userId: this.userId,
            friendId: this.friendId,
          }),
        });

        if (!response.ok) {
          throw new Error("Friend request failed!");
        }

        const data = await response.json();
        this.successMessage = `Friend added successfully: ${data.name}`;
        this.userId = "";
        this.friendId = "";
      } catch (error) {
        this.errorMessage = "Unable to send friend request. Please try again.";
      }
    },
  },
};
</script>

<style scoped>
.input {
  background-color: #383B45;
  padding: 20px;
  text-align: center;
}

.friend-request-form {
  display: flex;
  flex-direction: column;
  background-color: #f6f6f6;
  padding: 20px;
  border-radius: 5px;
}

button {
  background-color: darkgreen;
  color: white;
  font-size: 20px;
  border: 2px solid white;
  margin: 10px;
  border-radius: 5px;
  padding: 10px;
}

button:hover {
  color: #3645a6;
  border: 2px solid #3645a6;
}

.p-4 {
  padding: 1rem;
}

.text-sm {
  font-size: 0.875rem;
}

.text-red-800 {
  color: #c53030;
}

.text-green-800 {
  color: #2f855a;
}
</style>
