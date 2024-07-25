<template>
    <div class="mb-4 flex flex-col">
      <!-- Error Message -->
      <div v-if="showError" class="text-red-500 mb-2">
        {{ errorMessage }}
      </div>
  
      <div class="flex">
        <input
          v-model="newTodo"
          type="text"
          placeholder="Add a new todo"
          class="border p-2 w-full rounded-l-md"
        />
        <button @click="addTodo" class="bg-blue-500 text-white p-2 rounded-r-md w-1/3 hover:bg-blue-600">
          Add Todo
        </button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { useTodoStore } from '@/stores/todo'
  
  const todoStore = useTodoStore()
  const newTodo = ref('')
  const showError = ref(false)
  const errorMessage = ref('')
  
  const addTodo = async () => {
    if (newTodo.value.trim() === '') {
      errorMessage.value = 'Todo cannot be empty.'
      showError.value = true
  
      setTimeout(() => {
        showError.value = false
      }, 3000)
  
      return
    }
  
    const todo = {
      todo: newTodo.value,
      completed: false,
    }
    await todoStore.addTodo(todo)
    newTodo.value = ''
  }
  </script>
  
  <style scoped>
  </style>
  