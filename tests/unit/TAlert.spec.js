import { shallowMount } from '@vue/test-utils';

import TAlert from '../../src/components/TAlert';

describe('TAlert', () => {
  it('it renders the alert', () => {
    const wrapper = shallowMount(TAlert, {
      propsData: {
        show: true,
      },
    });

    expect(wrapper.get('div')).toBeTruthy();
  });

  it('it no render the alert by default', () => {
    const wrapper = shallowMount(TAlert);

    expect(wrapper.vm.$el.innerHTML).toBe(undefined);
  });

  it('it renders the default slot content', () => {
    const wrapper = shallowMount(TAlert, {
      propsData: {
        show: true,
      },
      slots: {
        default: 'lorem ipsum',
      },
    });

    expect(wrapper.vm.$el.innerHTML).toContain('lorem ipsum');
  });

  it('show/hide close button according to dismissible', async () => {
    const wrapper = shallowMount(TAlert, {
      propsData: {
        show: true,
        dismissible: true,
      },
    });

    expect(wrapper.vm.$refs.close).toBeTruthy();

    wrapper.setProps({ dismissible: false });

    await wrapper.vm.$nextTick();

    expect(wrapper.vm.$refs.close).toBeUndefined();
  });

  it('default wrapper tag to div', () => {
    const wrapper = shallowMount(TAlert, {
      propsData: {
        show: true,
      },
    });

    expect(wrapper.vm.$el.tagName).toBe('DIV');
  });

  it('accepts different wrapper tag', () => {
    const wrapper = shallowMount(TAlert, {
      propsData: {
        show: true,
        tagName: 'li',
      },
    });
    expect(wrapper.vm.$el.tagName).toBe('LI');
  });

  it('it call the timeout method when timeout', () => {
    const wrapper = shallowMount(TAlert, {
      propsData: {
        timeout: 1,
        show: true,
      },
    });

    expect(wrapper.vm.$refs.close).toBeTruthy();

    setTimeout(() => {
      expect(wrapper.vm.$refs.close).toBeUndefined();
    }, 2);
  });
});
