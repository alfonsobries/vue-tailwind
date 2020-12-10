import { shallowMount } from '@vue/test-utils';

import TModal from '../../src/components/TModal';
import configure from '../../src/configure';

configure(TModal);

describe('TModal', () => {
  it('it not renders the modal by default', () => {
    const wrapper = shallowMount(TModal);

    expect(wrapper.vm.$el.innerHTML).toBe('');
  });

  it('if the value is true it renders the modal', () => {
    const wrapper = shallowMount(TModal, {
      propsData: {
        value: true,
      },
    });

    expect(wrapper.get('div')).toBeTruthy();
  });

  it('if click the close button the modal is closed', async () => {
    const wrapper = shallowMount(TModal, {
      propsData: {
        value: true,
      },
    });

    wrapper.find('button').trigger('click');
    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.$el.innerHTML).toBe('');
  });

  it('closes the modal of user clicks the overlay', async () => {
    const wrapper = shallowMount(TModal, {
      propsData: {
        value: true,
      },
    });

    wrapper.vm.$refs.overlay.click();
    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.$el.innerHTML).toBe('');
  });

  it('not closes the modal of user clicks the overlay according to setting', async () => {
    const wrapper = shallowMount(TModal, {
      propsData: {
        value: true,
        clickToClose: false,
      },
    });

    wrapper.vm.$refs.overlay.click();
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.$el.innerHTML).toBeTruthy();
  });

  it('it emits the before-close & closed events when closed', async () => {
    const wrapper = shallowMount(TModal, {
      propsData: {
        value: true,
      },
    });

    wrapper.vm.hide();

    await wrapper.vm.$nextTick();

    expect(wrapper.emitted('before-close')).toBeTruthy();
    expect(wrapper.emitted('before-close').length).toBe(1);

    expect(wrapper.emitted('closed')).toBeFalsy();

    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted('closed')).toBeTruthy();
    expect(wrapper.emitted('closed').length).toBe(1);
  });

  it('it emits the before-open & opened events when show', async () => {
    const wrapper = shallowMount(TModal);

    wrapper.vm.show();

    await wrapper.vm.$nextTick();
    expect(wrapper.emitted('before-open')).toBeTruthy();
    expect(wrapper.emitted('before-open').length).toBe(1);

    expect(wrapper.emitted('opened')).toBeFalsy();
    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted('opened')).toBeTruthy();
    expect(wrapper.emitted('opened').length).toBe(1);
  });

  it('it renders the default slot content', () => {
    const wrapper = shallowMount(TModal, {
      propsData: {
        value: true,
      },
      slots: {
        default: 'lorem ipsum',
      },
    });

    expect(wrapper.vm.$refs.body.innerHTML).toContain('lorem ipsum');
  });

  it('it renders the footer slot content', () => {
    const wrapper = shallowMount(TModal, {
      propsData: {
        value: true,
      },
      slots: {
        footer: 'lorem ipsum',
      },
    });

    expect(wrapper.vm.$refs.footer.innerHTML).toContain('lorem ipsum');
  });

  it('it renders the header slot content', () => {
    const wrapper = shallowMount(TModal, {
      propsData: {
        value: true,
      },
      slots: {
        header: 'lorem ipsum',
      },
    });

    expect(wrapper.vm.$refs.header.innerHTML).toContain('lorem ipsum');
  });

  it('it renders the header using the prop', () => {
    const wrapper = shallowMount(TModal, {
      propsData: {
        value: true,
        header: 'lorem ipsum',
      },
    });

    expect(wrapper.vm.$refs.header.innerHTML).toContain('lorem ipsum');
  });

  it('show/hide close button according to hideCloseButton', async () => {
    const wrapper = shallowMount(TModal, {
      propsData: {
        value: true,
        hideCloseButton: true,
      },
    });

    expect(wrapper.vm.$refs.close).toBeFalsy();

    wrapper.setProps({ hideCloseButton: false });

    await wrapper.vm.$nextTick();

    expect(wrapper.vm.$refs.close).toBeTruthy();
  });

  it('the modal can be opened by name', async () => {
    const wrapper = shallowMount(TModal, {
      propsData: { name: 'modal-name' },
    });

    // called from the bus but can be called from every
    wrapper.vm.$modal.show('modal-name');

    await wrapper.vm.$nextTick();

    expect(wrapper.get('div')).toBeTruthy();
  });

  it('the modal can be closed by name', async () => {
    const wrapper = shallowMount(TModal, {
      propsData: { name: 'modal-name', initShow: true },
    });

    // called from the modal but can be called from everywhere
    wrapper.vm.$modal.hide('modal-name');
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.$el.innerHTML).toBe('');
  });

  it('the modal handles parameters in the before-open method', async () => {
    const wrapper = shallowMount(TModal, {
      propsData: { name: 'modal-name' },
    });

    const params = {
      user: { id: 1, name: 'Alfonso' },
      likeJest: 'sometimes',
    };

    // called from the bus but can be called from every
    wrapper.vm.$modal.show('modal-name', params);
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted('before-open')[0][0].params).toEqual(params);
  });
});
