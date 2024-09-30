<script>
export default {
  name: "LoginComponent",
  data() {
    return {
      username: '',
      password: '',
      show: false,
    }
  },
  methods: {
    //send POST request with email and password
    login() {
      const url = "http://localhost:8080/api/v1/auth/authenticate";
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
          //handle negative server response: show the hidden text with a link to the registration page
          .then((response) => {
            if (!response.ok) {
              this.show = true;
              throw new Error(`Server response was ${response.status}.`)
            }
            //handle positive server response - redirect further to play page
            this.$router.push({path: "/play"})
            return response.json();
          })
          .then((data) => {
            //preserve the token for possible future use with pinja
            const token = data.token;
          })
          .catch((error => console.error(error)))
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
        <div id="hidden" v-if="show">No user could be found.
          <RouterLink to="/register">Register now!</RouterLink>
        </div>
        <div class="input">
          <span id="account">Don't have an account?</span>
          <span id="register"> <router-link to="/register"> Register! </router-link></span>
        </div>
      </form>
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

  #hidden {
    display: none;
  }

}
</style>