import { shallowMount } from '@vue/test-utils'
import TButton from '@/components/TButton.vue'
import { mapValues } from 'lodash'

describe('TButton.vue', () => {
  it('it renders the button', () => {
    const wrapper = shallowMount(TButton)
    expect(wrapper.contains('button')).toBe(true)
  })

  it('disables the button', () => {
    const wrapper = shallowMount(TButton, {
      propsData: { disabled: false }
    })
    expect(wrapper.vm.$el.disabled).toBe(false)

    wrapper.setProps({ disabled: true })
    expect(wrapper.vm.$el.disabled).toBe(true)
  })

  it('has common attributes', () => {
    const wrapper = shallowMount(TButton)

    const values = {
      id: {
        default: '',
        new: 'new-id'
      },
      autofocus: {
        default: false,
        new: true
      },
      disabled: {
        default: false,
        new: true
      },
      name: {
        default: '',
        new: 'new-name'
      },
    }

    const select = wrapper.vm.$el

    // Check for the default values
    Object.keys(values).forEach(key => {
      const elementValue = values[key]
      expect(select[elementValue.keyName || key]).toBe(elementValue.default)
    })

    const newProps = mapValues(values, ({ new: newValue }, key) => {
      return newValue
    })

    wrapper.setProps(newProps)

    // Check for the new values
    Object.keys(values).forEach(key => {
      const elementValue = values[key]
      expect(select[elementValue.keyName || key]).toBe(elementValue.new)
    })
  })

  it('has button attributes', () => {
    const wrapper = shallowMount(TButton)

    const values = {
      type: {
        default: 'button',
        new: 'submit'
      },
    }

    const button = wrapper.vm.$el

    // Check for the default values
    Object.keys(values).forEach(key => {
      const elementValue = values[key]
      expect(button[elementValue.keyName || key]).toBe(elementValue.default)
    })

    const newProps = mapValues(values, ({ new: newValue }, key) => {
      return newValue
    })

    wrapper.setProps(newProps)

    // Check for the new values
    Object.keys(values).forEach(key => {
      const elementValue = values[key]
      expect(button[elementValue.keyName || key]).toBe(elementValue.new)
    })
  })

  it('emits a blur event when the button is blurred', () => {
  	const wrapper = shallowMount(TButton)

    const button = wrapper.vm.$el

    // The change event should be emitted when the button is blurred
    button.dispatchEvent(new Event('blur'))

    expect(wrapper.emitted('blur')).toBeTruthy()

    // assert event count
    expect(wrapper.emitted('blur').length).toBe(1)
  })

  it('emits a focus event when the select is focused', () => {
    const wrapper = shallowMount(TButton)

    const button = wrapper.vm.$el

    // The change event should be emitted when the button is focusred
    button.dispatchEvent(new Event('focus'))

    expect(wrapper.emitted('focus')).toBeTruthy()

    // assert event count
    expect(wrapper.emitted('focus').length).toBe(1)
  })

  it('has a focus and a blur method', () => {
    const wrapper = shallowMount(TButton)

    wrapper.vm.focus()

    expect(wrapper.emitted('focus')).toBeTruthy()

    expect(wrapper.emitted('focus').length).toBe(1)

    wrapper.vm.blur()

    expect(wrapper.emitted('blur')).toBeTruthy()

    expect(wrapper.emitted('blur').length).toBe(1)
  })
})
