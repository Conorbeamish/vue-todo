import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

//Hardcoded userId, assuming userId would be accessed via session cookie
const userId = 1

export const useTodoStore = defineStore('todos', () => {
  const list = ref([])
  
  async function getTodos() {
    try {
      const res = await fetch(`https://dummyjson.com/todos/user/${userId}`)
  
      if (res.ok) {
        const data = await res.json()
        list.value = data.todos
      } else {
        const errorData = await res.json()
        console.error('Failed to fetch todos:', errorData)
      }
    } catch (error) {
      console.error('Failed to fetch todos:', error)
    }
  }

  async function addTodo(todo) {
    try {
      const res = await fetch('https://dummyjson.com/todos/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({...todo, userId: userId}),
      })
  
      if (res.ok) {
        const data = await res.json()
        list.value.push(data)
      } else {
        const errorData = await res.json()
        console.error('Failed to add todo:', errorData)
      }
    } catch (error) {
      console.error('Failed to add todo:', error)
    }
  }

  async function updateTodo(updatedTodo) {
    // As we are not writing tho the server, these function cause errors for user created todos
    // However I have included them to show how the function would work 
    
    // try {
    //   const res = await fetch(`https://dummyjson.com/todos/${updatedTodo.id}`, {
    //     method: 'PUT',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(updatedTodo),
    //   })
  
    //   if (res.ok) {
    //     const data = await res.json()
    //     list.value = list.value.map(item => 
    //        item.id === updatedTodo.id ? updatedTodo : item
    //     )
    //   } else {
    //     const errorData = await res.json()
    //     console.error('Failed to update todo:', errorData)
    //   }
    // } catch (error) {
    //   console.error('Failed to update todo:', error)
    // }
    list.value = list.value.map(item => 
      item.id === updatedTodo.id ? updatedTodo : item
    )
  }
  
  async function deleteTodo(todo) {
    // As we are not writing tho the server, these function cause errors for user created todos
    // However I have included them to show how the function would work 

    // try {
    //   const res = await fetch(`https://dummyjson.com/todos/${todo.id}`, {
    //     method: 'DELETE',
    //   })
  
    //   if (res.ok) {
    //     list.value = list.value.filter(item => item.id !== todo.id)
    //   } else {
    //     const errorData = await res.json()
    //     console.error('Failed to delete todo:', errorData)
    //   }
    // } catch (error) {
    //   console.error('Failed to delete todo:', error)
    // }
    list.value = list.value.filter(item => item.id !== todo.id)
  }

  return { list, getTodos, updateTodo, deleteTodo, addTodo}
})
