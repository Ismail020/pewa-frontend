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
    <div class="form-container">
      <form @submit.prevent="login">
        <div class="input">
          <input v-model="email" type="email" placeholder="Email" required/>
        </div>
        <div class="input">
          <input v-model="password" type="password" placeholder="Password" required/>
        </div>
        <button type="submit">LOGIN</button>
        <div v-if="errorMessage" class="p-4 mb-4 text-sm text-red-800">{{ errorMessage }}</div>
      </form>
      <div class="links">
        <p>Don't have an account?
          <router-link to="/register"> Register! </router-link></p>
        <p>
          <router-link to="/forgot"> Forgot Password?</router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.background-container {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #2d3748;
  width: 100vw;
}

.input {
  background-color: #2d3748;
  padding: 20px;
  text-align: center;
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
  font-size: 16px;
  font-weight: bold;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
}

button:hover {
  color: #909df3;
  border: 2px solid #909df3;
}

#account {
  color: white;
  background-color: #2d3748;
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