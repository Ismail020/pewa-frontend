<template>
  <div class="login-container">
  <HeaderComponent  class ="header"/>
 <LoginComponent class="login"/>
  </div>
</template>

<script>
import HeaderComponent from "@/components/LoginComponents/HeaderComponent.vue";
import LoginComponent from "@/components/LoginComponents/LoginComponent.vue";
import {defineComponent} from "vue";

export default defineComponent({
  components: {LoginComponent, HeaderComponent}
})

</script>
<style>
.login-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.header {
  height: 33vh;
}

.login {
  flex-grow: 1;
}

</style>