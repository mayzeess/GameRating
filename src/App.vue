
<template>
  <div class="min-h-screen bg-black">
    <nav class="flex gap-15 bg-black p-4 justify-center border-1 border-purple-500 text-white text-xl">
      <router-link to="/" class="hover:text-purple-600">
        Главная
      </router-link>

      <router-link to="/about" class="hover:text-purple-600">
        О себе
      </router-link>

      <router-link to="/game" class="hover:text-purple-600">
        Игры
      </router-link>
    </nav>
    <router-view />
  </div>
</template>

<script>

</script>