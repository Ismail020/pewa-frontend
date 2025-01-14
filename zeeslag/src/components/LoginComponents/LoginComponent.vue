<script>

export default {
  name: "LoginComponent",
  data() {
    return {
      email: "",
      password: "",
      errorMessage: null,
    };
  },
  methods: {

    async login() {

      const url = import.meta.env.VITE_API_URL + "/api/v1/auth/authenticate";
      try {
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            email: this.email,
            password: this.password,
          }),
        });

        if (!response.ok) {
          throw new Error("Login failed!");
        }

        const data = await response.json();
        localStorage.setItem("token", data.token);

        const token = localStorage.getItem('token')

        this.$webSocketService.connect(token)

        this.$router.push({path: "/selectgamemode"})
      } catch (error) {
        this.errorMessage = "Invalid login credentials. Please try again.";
      }
    },

  },
};
</script>

<template>
  <div class="background-container">
    <div class="register-form">
      <form @submit.prevent="login">
        <div id="upper-input" class="input">
          <input v-model="email" id="email" type="email" placeholder="Email" required/>
        </div>
        <div class="input">
          <input v-model="password" id="password" type="password" placeholder="Password" required/>
        </div>
        <div class="input">
          <button type="submit">LOGIN</button>
          <div v-if="errorMessage" class="p-4 mb-4 text-sm text-red-800">{{ errorMessage }}</div>
        </div>
      </form>
      <div class="input">
        <p><span id="account">Don't have an account?</span>
          <span class="register">
          <router-link to="/register"> Register! </router-link></span></p>
        <p class="register">
          <router-link to="/forgot"> Forgot Password</router-link>
        </p>

      </div>
    </div>
  </div>
</template>

<style scoped>
.input {
  background-color: #383B45;
  padding: 20px;
  text-align: center;
}

.background-container {
  display: flex;
  justify-content: center;
  background-color: #383B45;
  width: 100vw;
}

.register-form {
  display: flex;
  flex-direction: column;
  background-color: #F6F6F6;
  border-radius: 2px;
}

button {
  background-color: darkred;
  color: white;
  text-align: center;
  font-size: 30px;
  font-weight: bold;
  border: 2px solid white;
  margin: 5px;
  border-radius: 5px;
  padding: 10px;
}

button:hover {
  color: #909df3;
  border: 2px solid #909df3;
}

#account {
  color: white;
  background-color: #383B45;
  font-size: 20px;
}

.register {
  color: #909df3;
  font-weight: bold;
  font-size: 20px;
}

#upper-input {
  padding-top: 60px;
}

#password,
#email {
  padding: 10px;
  font-size: 20px;
  width: 100%;
  text-align: center;
}

#hidden {
  display: none;
}
</style>