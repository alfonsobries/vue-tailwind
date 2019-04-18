import { shallowMount } from '@vue/test-utils'
import TRadio from '@/elements/TRadio.vue'
import { mapValues } from 'lodash'

describe('TRadio.vue', () => {
  it('it renders the input', () => {
    const wrapper = shallowMount(TRadio)
    expect(wrapper.contains('input[type=radio]')).toBe(true)
  })

  it('set the props.value into the input value', () => {
    const value = 'input value'
    
    const wrapper = shallowMount(TRadio, {
      propsData: { value }
    })

    const { input } = wrapper.vm.$refs

    expect(input.value).toBe(value)
  })

  it('updates the model value', () => {
    const value = 'input value'
    const newValue = 'new value'
    const wrapper = shallowMount(TRadio, {
      propsData: { value }
    })
    wrapper.setProps({ value: newValue })
    
    const { input } = wrapper.vm.$refs

    expect(input.value).toBe(newValue)
  })

  it('disables the input', () => {
    const wrapper = shallowMount(TRadio, {
      propsData: { disabled: false }
    })
    
    const { input } = wrapper.vm.$refs

    expect(input.disabled).toBe(false)

    wrapper.setProps({ disabled: true })
    
    expect(input.disabled).toBe(true)
  })

  it('has input attributes', () => {
    const wrapper = shallowMount(TRadio)

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
      required: {
        default: false,
        new: true
      },
      value: {
        default: 'on',
        new: 'my value'
      },
    }

    const { input } = wrapper.vm.$refs

    // Check for the default values
    Object.keys(values).forEach(key => {
      const elementValue = values[key]
      expect(input[elementValue.keyName || key]).toBe(elementValue.default)
    })

    const newProps = mapValues(values, ({ new: newValue }, key) => {
      return newValue
    })

    wrapper.setProps(newProps)

    // Check for the new values
    Object.keys(values).forEach(key => {
      const elementValue = values[key]
      expect(input[elementValue.keyName || key]).toBe(elementValue.new)
    })
  })

  it('emits an input event when the model change', () => {
    const wrapper = shallowMount(TRadio)

    const inputValue = 'Hello World'

    wrapper.setProps({
      model: inputValue
    })

    expect(wrapper.emitted('input')).toBeTruthy()

    // assert event count
    expect(wrapper.emitted('input').length).toBe(1)

    // assert event payload
    expect(wrapper.emitted('input')[0]).toEqual([inputValue])
  })

  it('emits an input event using the checked attribute', () => {
    const inputValue = 'A'
    
    const wrapper = shallowMount(TRadio, {
      propsData: {
        value: inputValue
      }
    })

    wrapper.setProps({
      checked: 'checked'
    })

    expect(wrapper.emitted('input')).toBeTruthy()

    // assert event count
    expect(wrapper.emitted('input').length).toBe(1)

    // assert event payload
    expect(wrapper.emitted('input')[0]).toEqual([inputValue])
  })

  it('emits an change event with the input value', () => {
    const wrapper = shallowMount(TRadio)

    const inputValue = 'Hello World'

    wrapper.setProps({
      model: inputValue
    })

    expect(wrapper.emitted('change')).toBeTruthy()

    // assert event count
    expect(wrapper.emitted('change').length).toBe(1)

    // assert event payload
    expect(wrapper.emitted('change')[0]).toEqual([inputValue])
  })

  it('emits an change event using the checked attribute', () => {
    const inputValue = 'A'
    
    const wrapper = shallowMount(TRadio, {
      propsData: {
        value: inputValue
      }
    })

    wrapper.setProps({
      checked: 'checked'
    })

    expect(wrapper.emitted('change')).toBeTruthy()

    // assert event count
    expect(wrapper.emitted('change').length).toBe(1)

    // assert event payload
    expect(wrapper.emitted('change')[0]).toEqual([inputValue])
  })

  it('emits a blur event when the input is blurred', () => {
    const inputValue = 'input value'
    const wrapper = shallowMount(TRadio, {
      propsData: { value: inputValue }
    })

    const { input } = wrapper.vm.$refs

    // The change event should be emitted when the input is blurred
    input.dispatchEvent(new Event('blur'))

    expect(wrapper.emitted('blur')).toBeTruthy()

    // assert event count
    expect(wrapper.emitted('blur').length).toBe(1)
  })

  it('emits a focus event when the input is focused', () => {
    const inputValue = 'input value'
    const wrapper = shallowMount(TRadio, {
      propsData: { value: inputValue }
    })

    const { input } = wrapper.vm.$refs

    // The change event should be emitted when the input is focusred
    input.dispatchEvent(new Event('focus'))

    expect(wrapper.emitted('focus')).toBeTruthy()

    // assert event count
    expect(wrapper.emitted('focus').length).toBe(1)
  })

  it('has a focus and a blur method', () => {
    const wrapper = shallowMount(TRadio)

    wrapper.vm.focus()

    expect(wrapper.emitted('focus')).toBeTruthy()

    expect(wrapper.emitted('focus').length).toBe(1)

    wrapper.vm.blur()

    expect(wrapper.emitted('blur')).toBeTruthy()

    expect(wrapper.emitted('blur').length).toBe(1)
  })
})
