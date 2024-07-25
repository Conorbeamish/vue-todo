import { mount } from '@vue/test-utils'
import { describe, it, expect, vi } from 'vitest'
import TodoItemEdit from '@/components/TodoItemEdit.vue'

describe('TodoItemEdit Component', () => {
  const todo = { id: 1, todo: 'Test Todo', completed: false }

  it('should display the current todo value in the input field', () => {
    const wrapper = mount(TodoItemEdit, {
      props: { todo },
    })

    // Check if the input value matches the todo text
    expect(wrapper.find('input').element.value).toBe(todo.todo)
  })

  it('should show an error message when trying to save an empty todo', async () => {
    const wrapper = mount(TodoItemEdit, {
      props: { todo },
    })

    // Find input field and set it to empty value
    await wrapper.find('input').setValue('')

    // Trigger the save button click
    await wrapper.find('button[name="save"]').trigger('click')

    // Check if the error message is shown
    expect(wrapper.find('div[name="error"]').exists()).toBe(true)
    expect(wrapper.find('div[name="error"]').text()).toBe('Todo cannot be empty.')
  })

  it('should emit update event with the correct data when saveEdit is called', async () => {
    const wrapper = mount(TodoItemEdit, {
      props: { todo },
    })

    // Set a new value and save
    const newTodoValue = 'Updated Todo'
    await wrapper.find('input').setValue(newTodoValue)
    await wrapper.find('button[name="save"]').trigger('click')

    // Check if the `update` event is emitted with the updated todo
    expect(wrapper.emitted().update[0][0]).toEqual({ ...todo, todo: newTodoValue })
  })

  it('should emit cancel event when cancelEdit is called', async () => {
    const wrapper = mount(TodoItemEdit, {
      props: { todo },
    })

    await wrapper.find('button[name="cancel"]').trigger('click')

    // Check if the `cancel` event is emitted
    expect(wrapper.emitted().cancel).toBeTruthy()
  })

  it('should update input value when props.todo.todo changes', async () => {
    const wrapper = mount(TodoItemEdit, {
      props: { todo },
    })

    // Update the todo prop
    const newTodoValue = 'Updated Todo from Props'
    await wrapper.setProps({ todo: { ...todo, todo: newTodoValue } })

    // Check if the input value is updated
    expect(wrapper.find('input').element.value).toBe(newTodoValue)
  })
})
