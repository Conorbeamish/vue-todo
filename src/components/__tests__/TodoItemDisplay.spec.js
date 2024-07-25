import { mount } from '@vue/test-utils'
import { describe, it, expect, vi } from 'vitest'
import TodoItemDisplay from '@/components/TodoItemDisplay.vue'

describe('TodoItemDisplay Component', () => {
  const todo = { id: 1, todo: 'Test Todo', completed: false }

  it('should render with correct todo data', () => {
    const wrapper = mount(TodoItemDisplay, {
      props: { todo },
    })

    // Check if the todo text is rendered
    expect(wrapper.find('span').text()).toBe(todo.todo)
    // Check if the button text for completion is correct
    expect(wrapper.find('button[name="complete"]').text()).toBe('Complete')
  })

  it('should toggle completion state when updateComplete is called', async () => {
    const wrapper = mount(TodoItemDisplay, {
      props: { todo },
    })

    await wrapper.find('button[name="complete"]').trigger('click')
    
    // Check if the `update` event is emitted with the updated todo
    expect(wrapper.emitted().update[0][0]).toEqual({ ...todo, completed: !todo.completed })
  })

  it('should emit delete event with todo when deleteTodoItem is called', async () => {
    const wrapper = mount(TodoItemDisplay, {
      props: { todo },
    })
    
    await wrapper.find('button[name="delete"]').trigger('click')
    
    // Check if the `delete` event is emitted with the correct todo
    expect(wrapper.emitted().delete[0][0]).toEqual(todo)
  })

  it('should emit toggleEdit event when toggleEdit is called', async () => {
    const wrapper = mount(TodoItemDisplay, {
      props: { todo },
    })
    
    await wrapper.find('button[name="edit"]').trigger('click')
    
    // Check if the `toggleEdit` event is emitted
    expect(wrapper.emitted().toggleEdit).toBeTruthy()
  })

  it('should apply line-through class when todo is completed', () => {
    const completedTodo = { ...todo, completed: true }
    const wrapper = mount(TodoItemDisplay, {
      props: { todo: completedTodo },
    })

    // Check if the line-through class is applied
    expect(wrapper.find('span').classes()).toContain('line-through')
  })
})
