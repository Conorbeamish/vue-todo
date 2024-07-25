<template>
  <div class="container mx-auto p-4">
    <div class="flex items-center justify-between mb-4">
      <h1 class="text-2xl font-bold">Your Todos:</h1>

      <!-- Filter for complete todos -->
      <div class="flex items-center space-x-3">
        <span class="mr-3">
          Incomplete Only
        </span>
        <button
          @click="toggleFilter"
          :class="[
            'relative inline-flex items-center h-6 rounded-full w-14 transition-colors duration-200 ease-in',
            showIncomplete ? 'bg-blue-500' : 'bg-gray-300'
          ]"
        >
        <span
          :class="[
            'absolute left-1 inline-block w-5 h-5 transform bg-white rounded-full transition-transform duration-200 ease-in',
            showIncomplete ? 'translate-x-6' : ''
          ]"
        ></span>
        </button>
      </div>
      
    </div>

    <AddTodo />

    <div>
      <TodoItem
        v-for="todo in filteredTodos"
        :key="todo.id"
        :todo="todo"
        @delete="deleteTodo"
        @update="updateTodo"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useTodoStore } from '@/stores/todo'
import TodoItem from '@/components/TodoItem.vue'
import AddTodo from '@/components/AddTodo.vue'

const todoStore = useTodoStore()
const todos = computed(() => todoStore.list)

const showIncomplete = ref(false)

const filteredTodos = computed(() => {
  return showIncomplete.value
    ? todos.value.filter(todo => !todo.completed)
    : todos.value
})

const toggleFilter = () => {
  showIncomplete.value = !showIncomplete.value
}

onMounted(() => {
  todoStore.getTodos()
})

const deleteTodo = (todo) => {
  todoStore.deleteTodo(todo)
}

const updateTodo = (todo) => {
  todoStore.updateTodo(todo)
}
</script>

<style scoped>
</style>
