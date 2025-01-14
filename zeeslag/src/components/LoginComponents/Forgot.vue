<script>
export default {
  name: "Forgot",
  data() {
    return {
      email: "",
      message: "",
    }
  },
  methods: {
    async handlePasswordReset() {
      const url = import.meta.env.VITE_API_URL + "/api/v1/auth/password-reset"
      try {
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            email: this.email
          })
        })
        const json = await response.json();

        if (!response.ok) {
          console.log(json)
          this.message = json.message;
          throw new Error(`Password reset failed, response status: ${response.status}`)
        }

        this.message = json.message
      } catch(error) {
        console.log("error :", error)
      }
    }
  }
}
</script>

<template>
  <div class="form"></div>
  <form @submit.prevent="handlePasswordReset">
    <h3> Forgot Password </h3>
    <div class="input">
      <label> Email </label>
      <input type="email" id="email" placeholder="Email" v-model="email"/>
    </div>
    <button> Submit </button>
    <div v-if="message"> {{ message }}</div>
  </form>

</template>

<style scoped>
.input {
  background-color: #383B45;
  padding: 20px;
  text-align: center;
}
.form {
  display: flex;
  background-color: #383B45;
  flex-direction: column;
  border-radius: 2px;
  justify-content: center;
  width: 100vw;
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
#email {
  padding: 10px;
  font-size: 20px;
  width: 100%;
  text-align: center;
}

</style>