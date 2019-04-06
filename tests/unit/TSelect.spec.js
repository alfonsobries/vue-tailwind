import { shallowMount } from '@vue/test-utils'
import TSelect from '@/components/TSelect.vue'
import { mapValues } from 'lodash'

describe('TSelect.vue', () => {
  it('it renders the select', () => {
    const wrapper = shallowMount(TSelect)
    expect(wrapper.contains('select')).toBe(true)
  })

  it('it renders the select options', () => {
  	const options = ['Option A', 'Option B', 'Option C']
    const wrapper = shallowMount(TSelect, {
		propsData: { options }
    })

    expect(wrapper.vm.$el.getElementsByTagName('option').length).toBe(3)
  })

  it('set the props.value into the select value', () => {
  	const options = ['Option A', 'Option B', 'Option C']
    const value = 'Option B'
    const wrapper = shallowMount(TSelect, {
      propsData: { options, value }
    })
    expect(wrapper.vm.$el.getElementsByTagName('select')[0].value).toBe(value)
  })

  it('select the multioption values', () => {
  	const options = ['Option A', 'Option B', 'Option C', 'Option D']
    const value = ['Option A', 'Option B', 'Option D']
    const wrapper = shallowMount(TSelect, {
      propsData: { options, value, multiple: true }
    })

    const selected = wrapper.vm.$el.querySelectorAll('option:checked');
	const values = Array.from(selected).map(el => el.value);
    expect(values).toEqual(value)
  })

  it('updates the model value', () => {
    const options = ['Option A', 'Option B', 'Option C']
    const value = 'Option B'
    const newValue = 'Option A'
    const wrapper = shallowMount(TSelect, {
      propsData: { options, value }
    })
    wrapper.setProps({ value: newValue })
    expect(wrapper.vm.$el.getElementsByTagName('select')[0].value).toBe(newValue)
  })

  it('updates the model in multiselect', () => {
    const options = ['Option A', 'Option B', 'Option C', 'Option D']
    const value = ['Option A', 'Option B', 'Option D']
    const newValue = ['Option A', 'Option C']
    const wrapper = shallowMount(TSelect, {
      propsData: { options, value, multiple: true }
    })
    wrapper.setProps({ value: newValue })

    const selected = wrapper.vm.$el.querySelectorAll('option:checked');
	const values = Array.from(selected).map(el => el.value);
    expect(values).toEqual(newValue)
  })

  it('disables the select', () => {
    const wrapper = shallowMount(TSelect, {
      propsData: { disabled: false }
    })
    expect(wrapper.vm.$el.getElementsByTagName('select')[0].disabled).toBe(false)

    wrapper.setProps({ disabled: true })
    expect(wrapper.vm.$el.getElementsByTagName('select')[0].disabled).toBe(true)
  })

  it('has common attributes', () => {
    const wrapper = shallowMount(TSelect)

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
    }

    const select = wrapper.vm.$el.getElementsByTagName('select')[0]

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

  it('has select attributes', () => {
    const wrapper = shallowMount(TSelect)

    const values = {
      multiple: {
        default: false,
        new: true
      },
      size: {
        default: 0,
        new: 8
      },
    }

    const select = wrapper.vm.$el.getElementsByTagName('select')[0]

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

  it('emits an input event with the select value', () => {
  	const options = ['A', 'B', 'C']
    const wrapper = shallowMount(TSelect, {
    	propsData: { options }
    })

    const inputValue = 'B'

    wrapper.setProps({
      value: inputValue
    })

    expect(wrapper.emitted('input')).toBeTruthy()

    // assert event count
    expect(wrapper.emitted('input').length).toBe(1)

    // assert event payload
    expect(wrapper.emitted('input')[0]).toEqual([inputValue])
  })

  it('emits an change event with the select value', () => {
  	const options = ['A', 'B', 'C']
    
    const wrapper = shallowMount(TSelect, {
    	propsData: { options }
    })

    const inputValue = 'B'

    wrapper.setProps({
      value: inputValue
    })

    expect(wrapper.emitted('change')).toBeTruthy()

    // assert event count
    expect(wrapper.emitted('change').length).toBe(1)

    // assert event payload
    expect(wrapper.emitted('change')[0]).toEqual([inputValue])
  })

  it('emits a blur event when the select is blurred', () => {
  	const options = ['A', 'B', 'C']
    const value = 'B'
    const wrapper = shallowMount(TSelect, {
    	propsData: { options, value }
    })

    const select = wrapper.vm.$el.getElementsByTagName('select')[0]

    // The change event should be emitted when the select is blurred
    select.dispatchEvent(new Event('blur'))

    expect(wrapper.emitted('blur')).toBeTruthy()

    // assert event count
    expect(wrapper.emitted('blur').length).toBe(1)
  })

  it('emits a focus event when the select is focused', () => {
    const options = ['A', 'B', 'C']
    const value = 'B'
    const wrapper = shallowMount(TSelect, {
    	propsData: { options, value }
    })

    const select = wrapper.vm.$el.getElementsByTagName('select')[0]

    // The change event should be emitted when the select is focusred
    select.dispatchEvent(new Event('focus'))

    expect(wrapper.emitted('focus')).toBeTruthy()

    // assert event count
    expect(wrapper.emitted('focus').length).toBe(1)
  })

  it('has a focus and a blur method', () => {
    const wrapper = shallowMount(TSelect)

    wrapper.vm.focus()

    expect(wrapper.emitted('focus')).toBeTruthy()

    expect(wrapper.emitted('focus').length).toBe(1)

    wrapper.vm.blur()

    expect(wrapper.emitted('blur')).toBeTruthy()

    expect(wrapper.emitted('blur').length).toBe(1)
  })
})
