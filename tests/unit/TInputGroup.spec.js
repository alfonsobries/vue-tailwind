import { shallowMount, mount } from '@vue/test-utils';

import TInputGroup from '../../src/components/TInputGroup';

describe('TInputGroup', () => {
  it('it renders the input group', () => {
    const wrapper = shallowMount(TInputGroup, {
      propsData: {
        show: true,
      },
    });

    expect(wrapper.get('div')).toBeTruthy();
  });

  it('it render the input group elements according to the order in the props', async () => {
    const slots = {
      label: 'the label',
      default: 'the default',
      feedback: 'the feedback',
      description: 'the description',
    };
    const wrapper = shallowMount(TInputGroup, {
      slots,
    });

    const defaultOrder = ['label', 'default', 'feedback', 'description'];
    defaultOrder.forEach((slotName, index) => {
      expect(wrapper.vm.$el.children[index].innerHTML).toBe(slots[slotName]);
    });

    const otherOrder = ['default', 'description', 'feedback', 'label'];
    wrapper.setProps({ sortedElements: otherOrder });
    await wrapper.vm.$nextTick();
    otherOrder.forEach((slotName, index) => {
      expect(wrapper.vm.$el.children[index].innerHTML).toBe(slots[slotName]);
    });
  });

  it('only render the input group elements with slots', () => {
    const slots = {
      label: 'the label',
      default: 'the default',
    };
    const wrapper = shallowMount(TInputGroup, {
      slots,
    });

    expect(wrapper.vm.$refs.label).toBeTruthy();
    expect(wrapper.vm.$refs.default).toBeTruthy();
    expect(wrapper.vm.$refs.feedback).toBeUndefined();
    expect(wrapper.vm.$refs.description).toBeUndefined();
  });

  it('Accept props instead of slots', () => {
    const propsData = {
      label: 'the label',
      feedback: 'the feedback',
      description: 'the description',
    };
    const wrapper = mount(TInputGroup, {
      propsData,
      slots: {
        default: 'the default',
      },
    });

    // false is the default slot that we are ignoring in this test
    const defaultOrder = ['label', false, 'feedback', 'description'];
    defaultOrder.forEach((slotName, index) => {
      if (slotName) {
        expect(wrapper.vm.$el.children[index].innerHTML.trim()).toBe(propsData[slotName]);
      }
    });
  });
});
