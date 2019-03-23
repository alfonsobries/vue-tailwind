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
})
