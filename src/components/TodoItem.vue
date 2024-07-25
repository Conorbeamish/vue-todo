<template>
    <div>
      <TodoItemDisplay
        v-if="!isEditing"
        :todo="todo"
        :isEditing="isEditing"
        @toggleEdit="toggleEdit"
        @update="handleUpdate"
        @delete="deleteTodoItem"
      />
      <TodoItemEdit
        v-if="isEditing"
        :todo="todo"
        @update="handleEdit"
        @cancel="toggleEdit"
      />
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import TodoItemDisplay from './TodoItemDisplay.vue'
  import TodoItemEdit from './TodoItemEdit.vue'
  
  const props = defineProps({
    todo: Object
  })
  
  const emit = defineEmits(['update', 'delete'])
  
  const isEditing = ref(false)
  
  const toggleEdit = () => {
    isEditing.value = !isEditing.value
  }
  
  const handleUpdate = (updatedTodo) => {
    emit('update', updatedTodo)

  }

  const handleEdit = (updatedTodo) => {
    handleUpdate(updatedTodo)
    toggleEdit()
  }
  
  const deleteTodoItem = () => {
    emit('delete', props.todo)
  }
  </script>
  