<template>
    <div :class="['bg-white p-4 rounded shadow mb-2 flex items-center', { 'flex-col': isEditing }]">
      <button @click="toggleEdit" class="text-blue-500 hover:text-blue-700 mr-2">
        <img src="@/assets/edit.svg" alt="Edit" class="w-5 h-5" />
      </button>
      <span :class="{ 'line-through': todo.completed }" class="flex-grow">
        {{ todo.todo }}
      </span>
      <div class="flex space-x-2 mt-2 justify-end">
        <button @click="updateComplete" class="text-green-500 hover:text-green-700">
          {{ todo.completed ? 'Undo' : 'Complete' }}
        </button>
        <button @click="deleteTodoItem" class="text-red-500 hover:text-red-700">Delete</button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { defineProps, defineEmits, ref } from 'vue'
  
  const props = defineProps({
    todo: {
      type: Object,
      required: true
    },
    isEditing: {
      type: Boolean,
      default: false
    }
  })
  
  const emit = defineEmits(['toggleEdit', 'update', 'delete'])
  
  const updateComplete = () => {
    emit('update', {...props.todo, completed: !props.todo.completed})
  }
  
  const deleteTodoItem = () => {
    emit('delete', props.todo)
  }
  
  const toggleEdit = () => {
    emit('toggleEdit')
  }
  </script>
  
  <style scoped>
  .line-through {
    text-decoration: line-through;
  }
  </style>
  