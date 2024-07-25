<template>
    <div class="bg-white p-4 rounded shadow mb-2">
      <div v-if="showEditError" name="error" class="text-red-500 mb-2">
        {{ editErrorMessage }}
      </div>
      <input
        v-model="editedTodo"
        type="text"
        class="border p-2 w-full rounded"
        @keyup.enter="saveEdit"
      />
      <div class="flex space-x-2 mt-2 w-full justify-end">
        <button @click="saveEdit" name="save" class="text-blue-500 hover:text-blue-700">
          Save
        </button>
        <button @click="cancelEdit" name="cancel" class="text-gray-500 hover:text-gray-700">
          Cancel
        </button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, watch } from 'vue'
  
  const props = defineProps({
    todo: {
      type: Object,
      required: true
    }
  })
  
  const emit = defineEmits(['update', 'cancel'])
  
  const editedTodo = ref(props.todo.todo)
  const showEditError = ref(false)
  const editErrorMessage = ref('')
  
  watch(() => props.todo.todo, (newTodo) => {
    editedTodo.value = newTodo
  })
  
  const saveEdit = () => {
    if (editedTodo.value.trim() === '') {
      editErrorMessage.value = 'Todo cannot be empty.'
      showEditError.value = true
  
      setTimeout(() => {
        showEditError.value = false
      }, 3000)
  
      return
    }
  
    emit('update', { ...props.todo, todo: editedTodo.value })
  }
  
  const cancelEdit = () => {
    emit('cancel')
  }
  </script>
  