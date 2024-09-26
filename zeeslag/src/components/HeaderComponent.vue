<template>
    <header>
    <div class="relative before:absolute before:w-full before:h-full before:inset-0 before:bg-black before:opacity-50 before:z-10">
      <img src="@/assets/logo-zeeslag.jpg" alt="Banner Image" class="absolute inset-0 w-full h-full object-cover" />
      <div class="min-h-[350px] relative z-50 h-full max-w-6xl mx-auto flex flex-col justify-center items-center text-center text-white p-6">
        <h2 class="sm:text-4xl text-2xl font-bold mb-6">Zeeslag</h2>
      </div>
    </div>
    <NavbarComponent/>
  </header>
</template>

<script>
import NavbarComponent from './NavbarComponent.vue';
export default {
  components: { NavbarComponent },
    name: 'Header'
}
</script>


