import { shallowMount } from '@vue/test-utils'
import TTextField from '@/components/TTextField.vue'

describe('TTextField.vue', () => {
  it('it renders the input', () => {
    const wrapper = shallowMount(TTextField)
    expect(wrapper.contains('input')).toBe(true)
  })

  it('set the props.value into the input value', () => {
    const value = 'input value'
    const wrapper = shallowMount(TTextField, {
      propsData: { value }
    })
    expect(wrapper.vm.$el.value).toBe(value)
  })

  it('updates the model value', () => {
    const value = 'input value'
    const newValue = 'new value'
    const wrapper = shallowMount(TTextField, {
      propsData: { value }
    })
    wrapper.setProps({ value: newValue })
    expect(wrapper.vm.$el.value).toBe(newValue)
  })

  it('disables the input', () => {
    const wrapper = shallowMount(TTextField, {
      propsData: { disabled: false }
    })
    expect(wrapper.vm.$el.disabled).toBe(false)

    wrapper.setProps({ disabled: true })
    expect(wrapper.vm.$el.disabled).toBe(true)
  })

  it('set the input attributes', () => {
    const wrapper = shallowMount(TTextField)
    expect(wrapper.vm.$el.type).toBe('text')
    expect(wrapper.vm.$el.id).toBe('')
    expect(wrapper.vm.$el.name).toBe('')

    wrapper.setProps({
      type: 'email',
      id: 'my-id',
      name: 'my-name'
    })
    expect(wrapper.vm.$el.type).toBe('email')
    expect(wrapper.vm.$el.id).toBe('my-id')
    expect(wrapper.vm.$el.name).toBe('my-name')
  })
})
