<script>
export default {
  name: "ForgotPassword",
  data() {
    return {
      email: "",
      message: "",
    }
  },
  methods: {
    async requestPasswordResetLink() {
      const url = import.meta.env.VITE_API_URL + "/api/v1/auth/forgot-password"
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
  <div class="form">
  <form @submit.prevent="requestPasswordResetLink">
    <div v-if="message"> {{ message }}</div>
    <div> <h3> Request password reset link </h3> </div>
    <div class="input">
      <input type="email" id="email" placeholder="Email" v-model="email"/>
    </div>
    <button> Send request </button>
  </form>
  </div>
</template>

<style scoped>
h3 {
  color: white;
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
#email {
  padding: 10px;
  font-size: 20px;
  width: 100%;
  text-align: center;
}

</style>