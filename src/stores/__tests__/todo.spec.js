import { describe, it, expect, beforeEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useTodoStore } from '../todo.js'

//Note some of these test wont test API responses and error handling as we are using a dummy server 

describe('TodoStore', () => {
  let todoStore

  beforeEach(() => {
    setActivePinia(createPinia())
    todoStore = useTodoStore()
  })

  it('should fetch todos successfully', async () => {
    // Mock fetch for testing
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ todos: [{ id: 1, todo: 'Test Todo', completed: false }] }),
      })
    )

    await todoStore.getTodos()

    expect(todoStore.list).toEqual([{ id: 1, todo: 'Test Todo', completed: false }])
  })

  it('should handle fetch todos error', async () => {
    // Mock fetch to simulate an error
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve({ error: 'Error fetching todos' }),
      })
    )

    await todoStore.getTodos()

    expect(todoStore.list).toEqual([])  // Ensure the list remains empty on error
  })

  it('should add a new todo successfully', async () => {
    const newTodo = { id: 2, todo: 'New Todo', completed: false }

    // Mock fetch for adding a new todo
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(newTodo), 
      })
    )

    // Initial state (ensure the list is empty)
    todoStore.list = []

    await todoStore.addTodo(newTodo)

    // Ensure the todo is added correctly
    expect(todoStore.list).toContainEqual(newTodo)
  })

  it('should handle add todo error', async () => {
    const newTodo = { id: 2, todo: 'New Todo', completed: false }

    // Mock fetch to simulate an error
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve({ error: 'Error adding todo' }),
      })
    )

    await todoStore.addTodo(newTodo)

    expect(todoStore.list).not.toContain(newTodo)  
  })

  it('should update a todo successfully', async () => {
    const originalTodo = { id: 1, todo: 'Original Todo', completed: false }
    const updatedTodo = { id: 1, todo: 'Updated Todo', completed: true }

    // Mock fetch for updating a todo
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(updatedTodo),
      })
    )

    // Initialize with original todo
    todoStore.list = [originalTodo]

    await todoStore.updateTodo(updatedTodo)

    // Check if the updatedTodo is present in the list
    expect(todoStore.list).toContainEqual(updatedTodo)

    // Additional assertion to verify the exact match
    const updatedTodoInList = todoStore.list.find(todo => todo.id === updatedTodo.id)
    expect(updatedTodoInList).toEqual(updatedTodo)
  })

  it('should delete a todo successfully', async () => {
    const todoToDelete = { id: 1, todo: 'Test Todo', completed: false }

    // Initial state
    todoStore.list = [todoToDelete]

    // Mock fetch for deleting a todo
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
      })
    )

    await todoStore.deleteTodo(todoToDelete)

    expect(todoStore.list).not.toContain(todoToDelete)
  })
})
