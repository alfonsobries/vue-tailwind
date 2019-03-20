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
})
