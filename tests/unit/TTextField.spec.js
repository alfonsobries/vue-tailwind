import { shallowMount } from '@vue/test-utils'
import TTextField from '@/components/TTextField.vue'
import { mapValues } from 'lodash'

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

  it('has input attributes', () => {
    const wrapper = shallowMount(TTextField)

    const values = {
      id: {
        default: '',
        new: 'new-id'
      },
      autocomplete: {
        default: '',
        new: 'on'
      },
      autofocus: {
        default: false,
        new: true
      },
      disabled: {
        default: false,
        new: true
      },
      max: {
        default: '',
        new: '10'
      },
      min: {
        default: '',
        new: '3'
      },
      multiple: {
        default: false,
        new: true
      },
      name: {
        default: '',
        new: 'new-name'
      },
      pattern: {
        default: '',
        new: '[A-Za-z]{3}'
      },
      placeholder: {
        default: '',
        new: 'new placeholder'
      },
      readonly: {
        keyName: 'readOnly',
        default: false,
        new: true
      },
      required: {
        default: false,
        new: true
      },
      size: {
        default: NaN,
        new: 10
      },
      value: {
        default: '',
        new: 'my value'
      },
      type: {
        default: 'text',
        new: 'email'
      }
    }

    // Check for the default values
    Object.keys(values).forEach(key => {
      const elementValue = values[key]
      expect(wrapper.vm.$el[elementValue.keyName || key]).toBe(elementValue.default)
    })

    const newProps = mapValues(values, ({ new: newValue }, key) => {
      return newValue
    })

    wrapper.setProps(newProps)

    // Check for the new values
    Object.keys(values).forEach(key => {
      const elementValue = values[key]
      expect(wrapper.vm.$el[elementValue.keyName || key]).toBe(elementValue.new)
    })
  })

  it('emits an input event with the input value', () => {
    const wrapper = shallowMount(TTextField)

    const inputValue = 'Hello World'

    wrapper.setProps({
      value: inputValue
    })

    expect(wrapper.emitted('input')).toBeTruthy()

    // assert event count
    expect(wrapper.emitted('input').length).toBe(1)

    // assert event payload
    expect(wrapper.emitted('input')[0]).toEqual([inputValue])
  })

  it('emits an change event with the input value', () => {
    const wrapper = shallowMount(TTextField)
    const input = wrapper.vm.$el

    const inputValue = 'Hello World'

    wrapper.setProps({
      value: inputValue
    })

    // The change event should be emitted when the input is blurred
    input.dispatchEvent(new Event('blur'))

    expect(wrapper.emitted('change')).toBeTruthy()

    // assert event count
    expect(wrapper.emitted('change').length).toBe(1)

    // assert event payload
    expect(wrapper.emitted('change')[0]).toEqual([inputValue])
  })

  it('emits a blur event when the input is blurred', () => {
    const inputValue = 'input value'
    const wrapper = shallowMount(TTextField, {
      propsData: { value: inputValue }
    })

    const input = wrapper.vm.$el

    // The change event should be emitted when the input is blurred
    input.dispatchEvent(new Event('blur'))

    expect(wrapper.emitted('blur')).toBeTruthy()

    // assert event count
    expect(wrapper.emitted('blur').length).toBe(1)
  })

  it('emits a focus event when the input is focused', () => {
    const inputValue = 'input value'
    const wrapper = shallowMount(TTextField, {
      propsData: { value: inputValue }
    })

    const input = wrapper.vm.$el

    // The change event should be emitted when the input is focusred
    input.dispatchEvent(new Event('focus'))

    expect(wrapper.emitted('focus')).toBeTruthy()

    // assert event count
    expect(wrapper.emitted('focus').length).toBe(1)
  })
})
