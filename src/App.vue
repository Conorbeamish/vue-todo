<script setup>
import Banner from './components/Banner.vue'
import TodoList from "./components/TodoList.vue"
</script>

<template>
  <header>
    <Banner/>
  </header>

  <main class="flex justify-center py-8">
    <div class="w-full max-w-3xl">
      <TodoList />
    </div>
  </main>
</template>

<style scoped>

</style>
