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

      } catch (error) {
        console.log("error :", error)
      }
    }
  }
}
</script>

<template>
  <div class="background-container">
    <div class="form-container">
      <form @submit.prevent="requestPasswordResetLink">
        <h3> Request password reset link </h3>
        <div v-if="message" class="message no-color"> {{ message }}</div>
        <div class="input">
          <input type="email" placeholder="Email" v-model="email"/>
        </div>
        <button type="submit"> Send request</button>
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

h3 {
  color: white;
  margin-bottom: 20px;
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

.message {
  color: #ff6b6b;
  margin-top: 10px;
}
.no-color {
  color: white;
}

</style>