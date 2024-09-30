<template>
    <!-- Navbar container with background color and padding -->
    <nav class="bg-gray-700 p-4">
        <!-- Flex container to space out the left and right sections -->
        <ul class="flex justify-between w-full">
            <!-- Left-aligned items container -->
            <div class="flex space-x-4">
                <!-- Home link -->
                <li>
                    <RouterLink to="/" class="text-white hover:text-gray-400">Home</RouterLink>
                </li>
                <!-- About link -->
                <li>
                    <RouterLink to="/about" class="text-white hover:text-gray-400">About</RouterLink>
                </li>
                <!-- Play Now link -->
                <li>
                    <RouterLink to="/play" class="text-white hover:text-gray-400">Play Now</RouterLink>
                </li>
            </div>
            <!-- Right-aligned items container -->
            <div class="flex space-x-4">
                <!-- Register link -->
                <li>
                    <RouterLink to="/register" class="text-white hover:text-gray-400">Register</RouterLink>
                </li>
                <!-- Log In link -->
                <li>
                    <RouterLink to="/login" class="text-white hover:text-gray-400">Log In</RouterLink>
                </li>
            </div>
        </ul>
    </nav>
</template>

<script>
export default {
    name: 'Navbar'
}
</script>

<style scoped></style>