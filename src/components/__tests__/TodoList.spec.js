import { mount } from '@vue/test-utils'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import TodoList from '@/components/TodoList.vue'
import AddTodo from '@/components/AddTodo.vue'
import TodoItem from '@/components/TodoItem.vue'
import { createPinia, setActivePinia } from 'pinia'
import { useTodoStore } from '@/stores/todo'

describe('TodoList.vue', () => {
  let wrapper

  beforeEach(() => {
    setActivePinia(createPinia())
    wrapper = mount(TodoList, {
      global: {
        plugins: [createPinia()]
      }
    })
  })

  it('renders the component and filters todos correctly', async () => {
    // Mock the store
    const todoStore = useTodoStore()
    todoStore.list = [
      { id: 1, todo: 'Todo 1', completed: false },
      { id: 2, todo: 'Todo 2', completed: true },
      { id: 3, todo: 'Todo 3', completed: false }
    ]

    // Wait for the component to render
    await wrapper.vm.$nextTick()

    // Check if the todos are rendered
    expect(wrapper.findAllComponents(TodoItem)).toHaveLength(3)

    // Test the filter dropdown
    const filterSelect = wrapper.find('select')
    await filterSelect.setValue('incomplete')
    await wrapper.vm.$nextTick()

    // Check if the filtered todos are rendered correctly
    expect(wrapper.findAllComponents(TodoItem)).toHaveLength(2) // Incomplete todos

    await filterSelect.setValue('complete')
    await wrapper.vm.$nextTick()
    expect(wrapper.findAllComponents(TodoItem)).toHaveLength(1) // Complete todo

    await filterSelect.setValue('all')
    await wrapper.vm.$nextTick()
    expect(wrapper.findAllComponents(TodoItem)).toHaveLength(3) // All todos
  })

  it('calls delete and update functions', async () => {
    // Mock the store methods
    const todoStore = useTodoStore()
    const deleteTodoMock = vi.fn()
    const updateTodoMock = vi.fn()

    todoStore.deleteTodo = deleteTodoMock
    todoStore.updateTodo = updateTodoMock

    // Mock todos
    todoStore.list = [
      { id: 1, todo: 'Todo 1', completed: false }
    ]
    await wrapper.vm.$nextTick()

    const todoItem = wrapper.findComponent(TodoItem)
    await todoItem.vm.$emit('delete', todoStore.list[0])
    expect(deleteTodoMock).toHaveBeenCalledWith(todoStore.list[0])

    await todoItem.vm.$emit('update', { id: 1, todo: 'Updated Todo', completed: true })
    expect(updateTodoMock).toHaveBeenCalledWith({ id: 1, todo: 'Updated Todo', completed: true })
  })

  it('renders AddTodo component', () => {
    expect(wrapper.findComponent(AddTodo).exists()).toBe(true)
  })
})
