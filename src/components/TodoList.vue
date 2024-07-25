<template>
  <div class="container mx-auto p-4">
    <div class="flex items-center justify-between mb-4">
      <h1 class="text-2xl font-bold">Your Todos:</h1>

      <!-- Filter dropdown -->
      <div class="flex items-center space-x-3">
        <span class="mr-3">Filter:</span>
        <select
          v-model="filter"
          class="border p-2 rounded"
        >
          <option value="all">All</option>
          <option value="incomplete">Incomplete</option>
          <option value="complete">Complete</option>
        </select>
      </div>
    </div>

    <AddTodo />

    
    <TodoItem
      v-for="todo in filteredTodos"
      :key="todo.id"
      :todo="todo"
      @delete="deleteTodo"
      @update="updateTodo"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useTodoStore } from '@/stores/todo'
import TodoItem from '@/components/TodoItem.vue'
import AddTodo from '@/components/AddTodo.vue'

const todoStore = useTodoStore()
const todos = computed(() => todoStore.list)

const filter = ref('all')

const filteredTodos = computed(() => {
  switch (filter.value) {
    case 'incomplete':
      return todos.value.filter(todo => !todo.completed)
    case 'complete':
      return todos.value.filter(todo => todo.completed)
    default:
      return todos.value
  }
})

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
