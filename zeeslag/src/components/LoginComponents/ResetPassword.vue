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
  <div class="background-container">
    <div class="form-container">
      <form @submit.prevent="submitNewPassword" @keydown.enter="submitNewPassword">
        <div v-if="!success">
          <h3>Reset Password</h3>
          <div v-if="message" class="message"> {{ message }}</div>
          <div class="input">
            <input type="password" placeholder="Enter new password" v-model="password"/>
            <input type="password" placeholder="Confirm password" v-model="confirmPassword"/>
          </div>
          <button type="submit"> Submit</button>
        </div>
        <div v-else @keydown.enter="toLogin">
          <div class="message success"> {{ message }}</div>
          <button @click="toLogin"> Proceed to log in</button>
        </div>
      </form>
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
.message {
  color: red;
  margin-bottom: 10px
}

.success {
  color: green;
}

</style>