<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-gray-800 text-white">
    <h1 class="text-4xl font-bold mb-8">Register</h1>

    <div class="space-y-4 w-96">
      <!-- Avatar Selection -->
      <div class="input-group">
        <h2 class="text-lg font-semibold mb-2">Select an Avatar</h2>
        <div class="flex space-x-4 justify-center">

          <img v-for="(avatar, index) in avatars" :key="index" :src="avatar" :alt="`Avatar ${index + 1}`"
            class="w-16 h-16 rounded-full cursor-pointer border-2 transition duration-300" :class="{
              'selected-avatar': selectedAvatar === avatar,
              'unselected-avatar': selectedAvatar !== avatar,
            }" @click="selectAvatar(avatar)" />
        </div>
      </div>

      <!-- Name Input -->
      <div class="input-group">
        <input v-model="name" id="name" type="text" placeholder="Name" class="input-field" required />
      </div>

      <!-- Email Input -->
      <div class="input-group">
        <input v-model="email" id="email" type="email" placeholder="Email" class="input-field" required />
      </div>

      <!-- Country Selection -->
      <div class="input-group">
        <select v-model="location" class="input-field" required>
          <option disabled value="">Select your country</option>
          <option v-for="(country, index) in countries" :key="index" :value="country">
            {{ country }}
          </option>
        </select>
      </div>


      <!-- Password Input -->
      <div class="input-group">
        <input v-model="password" id="password" type="password" placeholder="Password" class="input-field" required />
      </div>

      <!-- Register Button -->
      <div class="input-group">
        <button @click="register" id="registerButton"
          class="w-full py-3 px-6 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105">
          REGISTER
        </button>
      </div>

      <!-- Error Message -->
      <div v-if="show" class="error-message">
        There was an error with registration. Please try again.
      </div>

      <!-- Link to Login -->
      <div class="mt-4 text-center">
        <span>Already have an account?</span>
        <router-link to="/login" class="text-blue-500 font-semibold">Login here!</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import CONFIG from "@/config.js";
import womanImage from "@/assets/images/woman.png";
import maleImage from "@/assets/images/man.png";

export default {
  name: "RegisterComponent",
  data() {
    return {
      name: '',
      email: '',
      password: '',
      show: false,
      avatars: [
        womanImage,
        maleImage
      ],
      selectedAvatar: null,
      Location: '',
      countries: [
        'Netherlands',
        'Germany',
        'France',
        'Belgium',
        'United States',
        'United Kingdom',

      ],
    };
  },
  methods: {
    selectAvatar(avatar) {
      this.selectedAvatar = avatar;
    },
    // Register method
    register() {
      const url = "http://"+CONFIG.backendUrl+"/api/v1/auth/register";  // Adjust URL if needed
      fetch(url, {
        method: "POST",
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          name: this.name,
          email: this.email,
          password: this.password,
          avatar: this.selectedAvatar,
          location: this.location,
        }),
      })
        .then((response) => {
          if (!response.ok) {
            this.show = true;
            throw new Error(`Server response was ${response.status}`);
          }
          return response.json();  // On success, parse response
        })
        .then((data) => {
          // Redirect to login page
          this.$router.push({ path: "/login" });
        })
        .catch((error) => {
          console.error(error);  // Log any error
        });
    },
  },
};
</script>

<style scoped>
/* Container styling */
.flex {
  display: flex;
}

.flex-col {
  flex-direction: column;
}

.items-center {
  align-items: center;
}

.justify-center {
  justify-content: center;
}

.min-h-screen {
  min-height: 100vh;
}

.bg-gray-800 {
  background-color: #2d3748;
  /* Dark gray background */
}

.text-white {
  color: white;
}

/* Input Group */
.input-group {
  width: 100%;
}

.input-field {
  width: 100%;
  padding: 12px 20px;
  font-size: 16px;
  border-radius: 8px;
  border: 2px solid #ddd;
  background-color: #2d3748;
  color: white;
  transition: border-color 0.3s ease-in-out;
}

.input-field:focus {
  border-color: #4e60d5;
  /* Light blue on focus */
  outline: none;
}

/* Register Button */
#registerButton {
  background-color: #e53e3e;
  /* Red button */
  color: white;
  text-align: center;
  font-size: 18px;
  font-weight: bold;
  border: none;
  padding: 12px 20px;
  border-radius: 8px;
  width: 100%;
  transition: background-color 0.3s ease-in-out, transform 0.3s ease-in-out;
}

#registerButton:hover {
  background-color: #c53030;
  /* Darker red on hover */
  transform: scale(1.05);
  /* Slight scale on hover */
}

/* Error message */
.error-message {
  color: #e53e3e;
  /* Red text */
  font-size: 16px;
  text-align: center;
  margin-top: 10px;
}

/* Link Styling */
.text-blue-500 {
  color: #3182ce;
  /* Blue color */
}

.font-semibold {
  font-weight: 600;
}

.mt-4 {
  margin-top: 1rem;
}

.selected-avatar {
  border-color: #4e60d5;
  /* Same blue as input focus */
}

.unselected-avatar {
  border-color: #ddd;
  /* Gray for unselected */
}

img {
  border-width: 2px;
  transition: border-color 0.3s ease-in-out;
}
</style>
