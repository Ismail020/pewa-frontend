<script>
export default {
  name: "HeaderComponent"
}

</script>

<template>
  <div class="background-container">
    <img src="@/assets/images/logo2.jpg" alt="Zeeslag logo" class="logo"/>

  </div>

</template>

<style scoped>
.background-container {
  top: 0;
  left: 0;
  background-image: url("@/assets/images/image3.jpg");
  width: 100vw;
  height: 38vh;
  background-size: cover;
  background-position: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.logo {
  max-height: 90%;
  max-width: 100%;
  height: auto;
  width: auto;
  padding: 0;
}
h1 {
  font-size: 30px;
}
</style>