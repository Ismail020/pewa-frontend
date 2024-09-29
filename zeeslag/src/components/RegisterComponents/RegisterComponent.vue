<template>
  <div class="container">
    <div class="registerComponent">
      <form class="registerForm">
        <div class="columns">
          <div id="leftSideForm" class="column">
            <div class="formRow">
              <label for="usernameField">Username: </label>
              <input class="registerFields"  v-model="formData.username" type="text" id="usernameField" name="username" value="">
            </div>
            <div class="formRow">
              <label for="emailField">E-mail: </label>
              <input class="registerFields" v-model="formData.email" type="email" id="emailField" name="email" value="">
            </div>
            <div class="formRow">
              <label for="passwordField">Password: </label>
              <input class="registerFields"  v-model="formData.password" type="password" id="passwordField" name="password" value="">
            </div>
            <div class="formRow">
              <label for="passwordRepeatField">Repeat password: </label>
              <input class="registerFields" v-model="formData.passwordRepeat" type="password" id="passwordRepeatField" name="passwordRepeat" value="">
            </div>
            <div class="formRow">
              <label for="dateOfBirthField">Date of birth: </label>
              <input class="registerFields" v-model="formData.dateOfBirth" type="date" id="dateOfBirthField" name="dateOfBirth" value="">
            </div>
          </div>

          <div id="rightsideForm" class="column">
            <label for="acceptTermsField">I accept and agree with the terms of service<br> Check terms here blah blah</label>
            <input class="TermsField" v-model="formData.termsOfService" type="radio" id="termsField" name="termsOfService"><br>
            <label for="acceptEmails">Do you accept us sending you emails and advertisements?</label>
            <input class="acceptEmailsField"  v-model="formData.acceptEmails" type="radio" id="acceptEmailsField" name="acceptEmails"><br>
          </div>
        </div>
      </form>

      <button type="submit" @click="registerAccount" class="registerButton">REGISTER</button>
      <h3 id="directToLogin">Already have an account? <a>Log in</a></h3>
    </div>
  </div>
</template>

<script>
export default {
  name: "RegisterComponent",
  data () {
    return {
      formData: {
        username: '',
        email: '',
        password: '',
        dateOfBirth: '',
        termsOfService: false,
        acceptEmails: false
      }
    };
  },
  methods: {
    async registerAccount(event) {
      event.preventDefault();

      const url = ''; //fill with Given url
      const registerForm = new FormData();
      registerForm.append('username', this.formData.username);
      registerForm.append('email', this.formData.email);
      registerForm.append('password', this.formData.password);
      registerForm.append('passwordRepeat', this.formData.passwordRepeat);
      registerForm.append('dateOfBirth', this.formData.dateOfBirth);
      registerForm.append('termsOfService', this.formData.termsOfService);
      registerForm.append('acceptEmails', this.formData.acceptEmails);

      try {
        const response = await fetch(url, {
          method: 'POST',
          body: registerForm
        });

        if (response.ok) {
          alert("Registration successful!");
        } else {
          alert("Error registering account.");
        }
      } catch (error) {
        console.error("Error:", error);
        alert("An unexpected error occurred.");
      }
    }
  }
}
</script>

<style scoped>

.container {
  background-image: url("@/assets/images/loginbackgroundimg.jpg");
}
.registerComponent {
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #383B45;
  width: 100vw;
  height: 80vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

#leftSideForm {
  border-right: grey 1px solid;
}

.formRow {
  display: flex;
  align-items: center;
  margin-bottom: 25px;
}

label {
  color: white;
  font-size: 22px;
  width: 180px;
}

#directToLogin {
  color: white;
}

.registerFields {
  height: 55px;
  width: 300px;
  background-color: white;
  margin-left: 50px;
  border-radius: 4px;
  color: black;
}

/* Right side form styling */
#rightsideForm input {
  width: 30px;
  height: 30px;
  float: right;
}



.columns {
  display: flex;
  width: 100%;
  justify-content: space-between;
  padding: 30px;
}

.column {
  flex: 1;
  margin: 20px;
}

/* Form and field styling */
.registerForm {
  background-color: #383B45;
  border-radius: 10px;
  width: 90%;
}

/* Button styling */
.registerButton {
  background-color: darkred;
  color: white;
  text-align: center;
  font-size: 35px;
  font-weight: bold;
  border: 2px solid white;
  margin-top: 30px;
  padding: 15px;
  width: 350px;
}

button:hover {
  color: #3645a6;
  border: 2px solid #3645a6;
}
</style>
