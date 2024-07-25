import { mount } from '@vue/test-utils'
import { describe, it, expect, vi } from 'vitest'
import AddTodo from '@/components/AddTodo.vue'
import { useTodoStore } from '@/stores/todo'

vi.mock('@/stores/todo', () => ({
  useTodoStore: vi.fn(() => ({
    addTodo: vi.fn(),
  }))
}))

describe('AddTodo Component', () => {
  it('should render the component correctly', () => {
    const wrapper = mount(AddTodo)
    expect(wrapper.find('input').exists()).toBe(true)
    expect(wrapper.find('button').exists()).toBe(true)
  })

  it('should display an error message when input is empty and addTodo is clicked', async () => {
    const wrapper = mount(AddTodo)
    
    await wrapper.find('button').trigger('click')
    
    expect(wrapper.find('div[name="error"]').text()).toBe('Todo cannot be empty.')
    
    // Simulate timeout
    await new Promise(resolve => setTimeout(resolve, 3000))
    
    expect(wrapper.find('button[name="error"]').exists()).toBe(false)
  })

  it('should call addTodo method when input is not empty and addTodo is clicked', async () => {
    const mockAddTodo = vi.fn()
    useTodoStore.mockReturnValue({ addTodo: mockAddTodo })
    
    const wrapper = mount(AddTodo)
    
    await wrapper.find('input').setValue('New todo')
    await wrapper.find('button[name="add"]').trigger('click')
    
    expect(mockAddTodo).toHaveBeenCalledWith({
      todo: 'New todo',
      completed: false,
    })
  })
})
