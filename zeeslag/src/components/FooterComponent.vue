<template>
  <!-- Footer container with background color and padding -->
  <footer class="font-sans tracking-wide bg-black py-10 px-12">
    <!-- Grid layout for footer sections -->
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-12">
      
      <!-- Company section -->
      <div>
        <h4 class="text-white text-lg font-semibold mb-6">Company</h4>
        <ul class="space-y-5">
          <li><a href="javascript:void(0)" class="text-gray-300 hover:text-white text-[15px]">About Us</a></li>
          <li><a href="javascript:void(0)" class="text-gray-300 hover:text-white text-[15px]">Contact</a></li>
          <li><a href="javascript:void(0)" class="text-gray-300 hover:text-white text-[15px]">Dummy</a></li>
        </ul>
      </div>

      <!-- Information section -->
      <div>
        <h4 class="text-white text-lg font-semibold mb-6">Information</h4>
        <ul class="space-y-5">
          <li><a href="javascript:void(0)" class="text-gray-300 hover:text-white text-[15px]">Privacy Policy</a></li>
          <li><a href="javascript:void(0)" class="text-gray-300 hover:text-white text-[15px]">Terms of Service</a></li>
          <li><a href="javascript:void(0)" class="text-gray-300 hover:text-white text-[15px]">Dummy</a></li>
        </ul>
      </div>

      <!-- Help section -->
      <div>
        <h4 class="text-white text-lg font-semibold mb-6">Help</h4>
        <ul class="space-y-5">
          <li><a href="javascript:void(0)" class="text-gray-300 hover:text-white text-[15px]">FAQs</a></li>
          <li><a href="javascript:void(0)" class="text-gray-300 hover:text-white text-[15px]">Dummy</a></li>
          <li><a href="javascript:void(0)" class="text-gray-300 hover:text-white text-[15px]">Dummy</a></li>
        </ul>
      </div>

      <!-- Newsletter section -->
      <div class="col-span-full max-w-2xl">
        <h4 class="text-white text-lg font-semibold mb-6">Newsletter</h4>
        <p class="text-gray-300 mb-4 text-[15px]">Subscribe to our newsletter to get updates on zeeslag.</p>

        <!-- Newsletter subscription form -->
        <form class="mb-4">
          <div class="flex items-center">
            <input type="email" placeholder="Enter your email"
              class="bg-gray-800 px-4 py-3.5 rounded-l-md w-full text-[15px] text-gray-300 outline-none" />
            <button type="button"
              class="bg-gray-700 text-[15px] text-gray-300 tracking-wide px-4 py-3.5 rounded-r-md">Subscribe</button>
          </div>
        </form>
      </div>
    </div>

    <!-- Footer copyright text -->
    <p class='text-gray-300 text-right text-[15px] mt-8'>© Zeeslag. All rights reserved.</p>
  </footer>
</template>

<script>
export default {
  name: 'Footer',
};
</script>

<style scoped></style>