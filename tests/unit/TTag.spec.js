
import { shallowMount } from '@vue/test-utils';

import TTag from '../../src/components/TTag';

describe('TTag', () => {
  it('renders the tag', () => {
    const wrapper = shallowMount(TTag);

    expect(wrapper.get('div')).toBeTruthy();
  });

  it('renders with a custom tag', () => {
    const wrapper = shallowMount(TTag, {
      propsData: {
        tagName: 'span',
      },
    });

    expect(wrapper.get('span')).toBeTruthy();
  });

  it('render the default slot', () => {
    const wrapper = shallowMount(TTag, {
      slots: {
        default: 'hello',
      },
    });

    expect(wrapper.vm.$el.innerHTML).toBe('hello');
  });

  it('render the text used as param', () => {
    const wrapper = shallowMount(TTag, {
      propsData: {
        text: 'hello',
      },
    });

    expect(wrapper.vm.$el.innerHTML).toBe('hello');
  });
});
