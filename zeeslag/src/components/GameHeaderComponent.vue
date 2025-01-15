<template>
  <header class="header flex justify-between items-center bg-gray-800 p-4 text-white rounded-lg shadow-lg">
    <div class="flex items-center space-x-4">
      <img class="w-16 h-16 object-cover rounded-full border-2 border-gray-600" src="@/assets/images/sea captain.jpg" alt="Avatar" />
      <div class="username text-lg font-bold">xX_sampleUsername123_Xx</div>
    </div>

    <div class="flex items-center space-x-4">
      <button class="focus:outline-none">
        <img class="w-8 h-8 object-contain" src="@/assets/images/sound icon.jpg" alt="Sound Icon" />
      </button>

      <button class="focus:outline-none">
        <img class="w-8 h-8 object-contain" src="@/assets/images/settings icon.jpg" alt="Settings Icon" />
      </button>
    </div>
  </header>
</template>

<script>
export default {
  name: 'GameHeaderComponent'
};
</script>

<style scoped>
.header {
  background-color: #2d3748;
}
</style>
