<template>
  <div class="login-container">
    <LoginComponent class="login" />
  </div>
</template>

<script>
import LoginComponent from "@/components/LoginComponents/LoginComponent.vue";
import { defineComponent } from "vue";

export default defineComponent({
  components: { LoginComponent }
})

</script>