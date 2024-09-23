<script>
export default {
  name: "LoginComponent",
  data() {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    login() {
      const url = "";
      fetch(url, {
        method: "POST",
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({
          username: this.username,
          password: this.password
        })
      })
          .then((response) => response.json())
    }
  }
};

</script>

<template>
  <div class="background-container">
    <div class="login-form">
      <form @submit.prevent="login">
        <div id="upper-input" class="input">
          <input v-model="username"
                 id="username"
                 type="text"
                 placeholder="Username"
                 required/>
        </div>
        <div class="input">
          <input v-model="password"
                 id="password"
                 type="password"
                 placeholder="Password"
                 required/>
        </div>
        <div class="input">
          <button type="submit">LOGIN</button>
        </div>
      </form>
      <div class="input">
        <span id="account">Don't have an account?</span>
        <span id="register"> <router-link to="/registration"> Register! </router-link></span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.input {
  background-color: #383B45;
  padding: 30px;
  text-align: center;
}

.background-container {
  background-color: #383B45;
  width: 100vw;
}

.login-form {
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  max-width: 50vw;
  background-color: #F6F6F6;
  margin: auto;
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
  color: #3645a6;
  border: 2px solid #3645a6;
}

#account {
  color: white;
  background-color: #383B45;
  font-size: 20px;
}

#register {
  color: #4e60d5;
  font-weight: bold;
  font-size: 20px;
}

#upper-input {
  padding-top: 60px;
}

#password, #username {
  padding: 10px;
  font-size: 20px;
  width: 80%;
  text-align: center;

}
</style>