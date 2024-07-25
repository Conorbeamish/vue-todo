import { mount } from '@vue/test-utils'
import { describe, it, expect, vi } from 'vitest'
import TodoItem from '@/components/TodoItem.vue'
import TodoItemDisplay from '@/components/TodoItemDisplay.vue'
import TodoItemEdit from '@/components/TodoItemEdit.vue'

describe('TodoItem Component', () => {
  const todo = { id: 1, todo: 'Test Todo', completed: false }

  it('should render TodoItemDisplay when not in editing mode', async () => {
    const wrapper = mount(TodoItem, {
      props: { todo },
    })

    expect(wrapper.findComponent(TodoItemDisplay).exists()).toBe(true)
    expect(wrapper.findComponent(TodoItemEdit).exists()).toBe(false)
  })

  it('should render TodoItemEdit when in editing mode', async () => {
    const wrapper = mount(TodoItem, {
      props: { todo },
    })

    await wrapper.findComponent(TodoItemDisplay).vm.$emit('toggleEdit')
    await wrapper.vm.$nextTick()

    expect(wrapper.findComponent(TodoItemDisplay).exists()).toBe(false)
    expect(wrapper.findComponent(TodoItemEdit).exists()).toBe(true)
  })

  it('should emit update event with updatedTodo when handleEdit is called', async () => {
    const wrapper = mount(TodoItem, {
      props: { todo },
    })

    await wrapper.findComponent(TodoItemDisplay).vm.$emit('toggleEdit')
    await wrapper.vm.$nextTick()
    
    const updatedTodo = { ...todo, todo: 'Updated Todo' }
    await wrapper.findComponent(TodoItemEdit).vm.$emit('update', updatedTodo)
    await wrapper.vm.$nextTick()
    
    expect(wrapper.emitted().update[0][0]).toEqual(updatedTodo)
  })

  it('should emit delete event with todo when deleteTodoItem is called', async () => {
    const wrapper = mount(TodoItem, {
      props: { todo },
    })
    
    await wrapper.findComponent(TodoItemDisplay).vm.$emit('delete')
    await wrapper.vm.$nextTick()
    
    expect(wrapper.emitted().delete[0][0]).toEqual(todo)
  })

  it('should toggle edit mode when toggleEdit is called', async () => {
    const wrapper = mount(TodoItem, {
      props: { todo },
    })

    expect(wrapper.vm.isEditing).toBe(false)
    await wrapper.vm.toggleEdit()
    expect(wrapper.vm.isEditing).toBe(true)
    await wrapper.vm.toggleEdit()
    expect(wrapper.vm.isEditing).toBe(false)
  })
})
