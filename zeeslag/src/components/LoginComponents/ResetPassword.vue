<script>
export default {
  name: "ResetPassword",
  data() {
    return {
      password: "",
      confirmPassword: "",
      message: "",
      success: false
    }
  },
  methods: {
    async submitNewPassword() {
      if (this.password !== this.confirmPassword) {
        this.message = "Passwords do not match"
        return
      }
      const url = import.meta.env.VITE_API_URL + "/api/v1/auth/reset-password"
      const token = this.$route.query.token
      try {
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            password: this.password,
            token: token,
          })
        })
        console.log(`The new password is: ${this.password}, confirmed password is: ${this.confirmPassword}, and the token is: ${token}.`)

        const json = await response.json();

        if (response.ok) {
          this.message = json.message;
          this.success = true;
        } else {
          this.message = json.message || `Error: ${response.status}`
          throw new Error(`Password reset failed, status: ${response.status}`);
        }
      } catch (error) {
        console.error("An error occurred: ", error);
      }
    },
    toLogin() {
      this.$router.push("/login")
    }
  }
}
</script>

<template>
  <div class="form">
    <form @submit.prevent="submitNewPassword" @keydown.enter="submitNewPassword">
      <div v-if="!success">
        <div class="input">
          <div v-if="message" class="message"> {{ message }}</div>
          <label> Enter your new password here </label>
          <input type="password" id="password" placeholder="Enter new password" v-model="password"/>
          <label> Confirm password </label>
          <input type="password" id="password" placeholder="Confirm password" v-model="confirmPassword"/>
          <button type="submit"> Submit</button>

        </div>
      </div>
      <div v-else @keydown.enter="toLogin">
        <div class="message success"> {{ message }}</div>
        <button @click="toLogin"> Proceed to login</button>

      </div>


    </form>
  </div>
</template>

<style scoped>

.message {
  color: red;
  margin-bottom: 10px
}

.success {
  color: green;
}

.input {
  background-color: #2d3748;
  padding: 20px;
  text-align: center;

}

.form {
  background-color: #2d3748;
  display: flex;
  flex-direction: column;
  border-radius: 2px;
  justify-content: center;
  width: 100vw;
  align-items: center;
}

button {
  background-color: darkred;
  color: white;
  text-align: center;
  font-size: 30px;
  font-weight: bold;
  border: 1px solid white;
  margin: 5px;
  border-radius: 5px;
  padding: 10px;
}

button:hover {
  color: #909df3;
  border: 2px solid #909df3;
}

#password {
  padding: 10px;
  font-size: 20px;
  width: 100%;
  text-align: center;
}

</style>