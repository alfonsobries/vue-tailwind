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

  it('emits a hide event when the dropdown is closed', () => {
    // document.createRange is going to be created below because of the following error
    // [Vue warn]: Error in nextTick: "TypeError: document.createRange is not a function"
    global.document.createRange = () => ({
      setStart: () => {},
      setEnd: () => {},
      commonAncestorContainer: {
        nodeName: 'BODY',
        ownerDocument: document,
      },
    });
    // component is mounted with a slot
    const htmlElement = '<ul><li><a id="is-link" href="#">Link</a></li></ul>'
    const wrapper = mount(TDropdown, {
      slots: {
        default: htmlElement
      }
    })
    // finds the button which is the dropdown opener
    const button = wrapper.find('button')
    // triggers the click to open the dropdown
    button.trigger('click')
    // the dropdown component is opened and the event is emitted
    expect(wrapper.emitted('click')).toBeTruthy()
    // it was clicked only one time
    expect(wrapper.emitted('click').length).toBe(1)
    // finds the link which is the slot inside the dropdown component
    const link = wrapper.find('#is-link')
    // triggers the click to select an option
    link.trigger('click')
    // the click event is emitted
    expect(wrapper.emitted('click')).toBeTruthy()
    // the dropdown is closed and the hide event is emitted
    expect(wrapper.emitted('hide')).toBeTruthy()
    // it was clicked only one time in the link
    expect(wrapper.emitted('click').length).toBe(1)
    // it was closed only one time
    expect(wrapper.emitted('hide').length).toBe(1)
  })
})
