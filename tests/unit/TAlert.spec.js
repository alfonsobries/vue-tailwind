import { shallowMount } from '@vue/test-utils'

import TAlert from '@/components/TAlert.vue'

describe('TAlert.vue', () => {
  it('it renders the alert', () => {
    const wrapper = shallowMount(TAlert, {
      propsData: {
        show: true
      }
    })

    expect(wrapper.contains('div')).toBe(true)
  })

  it('it no render the alert by default', () => {
    const wrapper = shallowMount(TAlert)

    expect(wrapper.vm.$el.innerHTML).toBe(undefined)
  })

  it('it renders the default slot content', () => {
    const wrapper = shallowMount(TAlert, {
      propsData:{
        show: true,
      },
      slots: {
        default: 'lorem ipsum'
      }
    })

    expect(wrapper.vm.$el.innerHTML).toContain('lorem ipsum')
  })

  it('show/hide close button according to dismissible', () => {
    const wrapper = shallowMount(TAlert, {
      propsData:{
        show: true,
        dismissible: true
      },
    })

    expect(wrapper.vm.$refs.close).toBeTruthy()

    wrapper.setProps({ dismissible: false })

    expect(wrapper.vm.$refs.close).toBeUndefined()
  })

  it('default wrapper tag to div', () => {
    const wrapper = shallowMount(TAlert, {
      propsData:{
        show: true,
      },
    })
    
    expect(wrapper.vm.$el.tagName).toBe('DIV')
  })

  it('accepts different wrapper tag', () => {
    const wrapper = shallowMount(TAlert, {
      propsData:{
        show: true,
        tagName: 'li'
      },
    })    
    expect(wrapper.vm.$el.tagName).toBe('LI')
  })

  it('it call the timeout method when timeout', () => {
    const initTimeoutStub = jest.fn()
    
    const wrapper = shallowMount(TAlert, {
      propsData: {
        timeout: 1,
        show: true,
      },
      methods: {
        initTimeout: initTimeoutStub
      }
    })

    expect(initTimeoutStub).toHaveBeenCalledTimes(1);
  })
})
