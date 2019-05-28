import { shallowMount, mount } from '@vue/test-utils'
import TDropdown from '@/components/TDropdown.vue'

describe('TDropdown.vue', () => {
  it('renders the dropdown', () => {
    const wrapper = shallowMount(TDropdown)
    expect(wrapper.vm.$refs.dropdown).toBeDefined()
    expect(wrapper.vm.$refs.button).toBeDefined()
  })

  it('disables the dropdown', () => {
    const wrapper = mount(TDropdown, {
      propsData: { disabled: false }
    })

    const { button } = wrapper.vm.$refs
    expect(button.$el.disabled).toBe(false)

    wrapper.setProps({ disabled: true })
    expect(button.$el.disabled).toBe(true)
  })

  it('default wrapper tag to div', () => {
    const wrapper = mount(TDropdown)
    
    expect(wrapper.vm.$el.tagName).toBe('DIV')
  })

  it('accepts different wrapper tag', () => {
    const wrapper = mount(TDropdown, {
      propsData: { tagName: 'li' }
    })
    
    expect(wrapper.vm.$el.tagName).toBe('LI')
  })

  it('default button to button tag', () => {
    const wrapper = mount(TDropdown)

    const { button } = wrapper.vm.$refs

    expect(button.$el.tagName).toBe('BUTTON')
  })

  it('accepts button anchor tag', () => {
    const wrapper = mount(TDropdown, {
      propsData: { buttonTagName: 'a' }
    })

    const { button } = wrapper.vm.$refs

    expect(button.$el.tagName).toBe('A')
  })

  it('accepts child button props', () => {
    const buttonProps = {
      id: 'my-id',
      name: 'button-name',
      successClass: 'bg-green-100',
    }
    
    const wrapper = mount(TDropdown, {
      propsData: { buttonProps }
    })

    const { button } = wrapper.vm.$refs

    expect(button.$el.id).toBe('my-id')
    expect(button.$el.name).toBe('button-name')
    expect(button.successClass).toBe('bg-green-100')
  })


  it('emits a blur event when the button is blurred', () => {
   const wrapper = mount(TDropdown)

    const button = wrapper.vm.$refs.button.$el

    // The change event should be emitted when the button is blurred
    button.dispatchEvent(new Event('blur'))

    expect(wrapper.emitted('blur')).toBeTruthy()

    // assert event count
    expect(wrapper.emitted('blur').length).toBe(1)
  })

  it('emits a focus event when the button is focused', () => {
    const wrapper = mount(TDropdown)

    const button = wrapper.vm.$refs.button.$el

    // The change event should be emitted when the button is focusred
    button.dispatchEvent(new Event('focus'))

    expect(wrapper.emitted('focus')).toBeTruthy()

    // assert event count
    expect(wrapper.emitted('focus').length).toBe(1)
  })
})
