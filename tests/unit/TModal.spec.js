import { shallowMount } from '@vue/test-utils'

import TModal from '@/components/TModal.vue'

describe('TModal.vue', () => {
  it('it not renders the modal by default', () => {
    const wrapper = shallowMount(TModal)

    expect(wrapper.contains('div')).toBe(false)
  })

  it('if the value is true it renders the modal', () => {
    const wrapper = shallowMount(TModal, {
      propsData: {
        value: true
      }
    })

    expect(wrapper.contains('div')).toBe(true)
  })

  it('if click the close button the modal is closed', () => {
    const wrapper = shallowMount(TModal, {
      propsData: {
        value: true
      }
    })

    wrapper.find('button').trigger('click')
    expect(wrapper.contains('div')).toBe(false);
  })

  it('it emits the before-close & closed events when closed', async () => {
    const wrapper = shallowMount(TModal, {
      propsData: {
        value: true
      }
    })

    wrapper.vm.hide()
    
    expect(wrapper.emitted('before-close')).toBeTruthy()
    expect(wrapper.emitted('before-close').length).toBe(1)

    expect(wrapper.emitted('closed')).toBeFalsy()
    
    await wrapper.vm.$nextTick()
    expect(wrapper.emitted('closed')).toBeTruthy()
    expect(wrapper.emitted('closed').length).toBe(1)
  })

  it('it emits the before-open & opened events when show', async () => {
    const wrapper = shallowMount(TModal)

    wrapper.vm.show()
    
    expect(wrapper.emitted('before-open')).toBeTruthy()
    expect(wrapper.emitted('before-open').length).toBe(1)

    expect(wrapper.emitted('opened')).toBeFalsy()
    await wrapper.vm.$nextTick()
    expect(wrapper.emitted('opened')).toBeTruthy()
    expect(wrapper.emitted('opened').length).toBe(1)
  })

  it('it renders the default slot content', () => {
    const wrapper = shallowMount(TModal, {
      propsData:{
        value: true,
      },
      slots: {
        default: 'lorem ipsum'
      }
    })

    expect(wrapper.vm.$refs.body.innerHTML).toContain('lorem ipsum')
  })
  
  it('it renders the footer slot content', () => {
    const wrapper = shallowMount(TModal, {
      propsData:{
        value: true,
      },
      slots: {
        footer: 'lorem ipsum'
      }
    })

    expect(wrapper.vm.$refs.footer.innerHTML).toContain('lorem ipsum')
  })

  it('it renders the header slot content', () => {
    const wrapper = shallowMount(TModal, {
      propsData:{
        value: true,
      },
      slots: {
        header: 'lorem ipsum'
      }
    })

    expect(wrapper.vm.$refs.header.innerHTML).toContain('lorem ipsum')
  })

  it('it renders the header using the prop', () => {
    const wrapper = shallowMount(TModal, {
      propsData:{
        value: true,
        header: 'lorem ipsum'
      }
    })

    expect(wrapper.vm.$refs.header.innerHTML).toContain('lorem ipsum')
  })

  it('show/hide close button according to hideCloseButton', () => {
    const wrapper = shallowMount(TModal, {
      propsData:{
        value: true,
        hideCloseButton: true
      },
    })

    expect(wrapper.vm.$refs.close).toBeFalsy()

    wrapper.setProps({ hideCloseButton: false })

    expect(wrapper.vm.$refs.close).toBeTruthy()
  })
  
  it('accepts numeric widths', () => {
    const wrapper = shallowMount(TModal, {
      propsData:{
        width: '100'
      },
    })

    expect(wrapper.vm.normalizedWidth).toBe('100px')
  })

  it('accepts percents widths', () => {
    const wrapper = shallowMount(TModal, {
      propsData:{
        width: '100%'
      },
    })

    expect(wrapper.vm.normalizedWidth).toBe('100%')
  })
  it('accepts percents heights', () => {
    const wrapper = shallowMount(TModal, {
      propsData:{
        height: '100%'
      },
    })

    expect(wrapper.vm.normalizedHeight).toBe('100%')
  })  
})
