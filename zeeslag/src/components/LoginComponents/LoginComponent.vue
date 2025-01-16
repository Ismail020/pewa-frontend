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
        <button type="submit">Log in </button>
        <div v-if="errorMessage" class="message">{{ errorMessage }}</div>
      </form>
      <div class="links">
        <p>Don't have an account?
          <router-link to="/register" class="link"> Register! </router-link></p>
        <p>
          <router-link to="/forgot" class="link"> Forgot Password?</router-link>
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
  font-size: 20px;
  color: white;
}

.form-container {
  background-color: #2d3748;
  border-radius: 2px;
  padding: 20px;
  text-align: center;
  width: 33vw;
  display: flex;
  flex-direction: column;
}

.input {
  margin-bottom: 15px;
}

input {
  width: 80%;
  padding: 5px;
  font-size: 18px;
  border-radius: 4px;
  text-align: center;
  margin-bottom: 5px;
  color: black;
}

button {
  background-color: darkred;
  transition: background-color 0.3s, transform 0.2s;
  cursor: pointer;
  color: white;
  font-weight: bold;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
}

button:hover {
  color: #909df3;
  border: 1px solid #909df3;
}

.link {
  color: #909df3;
  background-color: #2d3748;
}

.links {
  font-size: 20px;
  margin-top: 10px;

}

.link:hover {
  text-decoration: underline;
}

.message {
  color: #ff6b6b;
  margin-top: 10px;
}

.success {
  color: green;
}

</style>