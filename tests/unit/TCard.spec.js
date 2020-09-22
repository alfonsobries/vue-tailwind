import { shallowMount, mount } from '@vue/test-utils';
import TCard from '../../src/components/TCard';

describe('TCard', () => {
  it('it renders the card', () => {
    const wrapper = shallowMount(TCard);

    expect(wrapper.get('div')).toBeTruthy();
  });

  it('it renders the default slot content', () => {
    const wrapper = shallowMount(TCard, {
      slots: {
        default: 'lorem ipsum',
      },
    });

    expect(wrapper.vm.$el.children[0].innerHTML).toBe('lorem ipsum');
  });

  it('it render the header', () => {
    const header = 'My header';
    const wrapper = mount(TCard, {
      propsData: {
        header,
      },
    });
    expect(wrapper.vm.$refs.header.innerHTML).toBe(header);
  });

  it('it render the header when using props', () => {
    const header = '<p>My header</p>';
    const wrapper = mount(TCard, {
      slots: {
        header,
      },
    });
    expect(wrapper.vm.$refs.header.innerHTML).toBe(header);
  });

  it('it render the footer', () => {
    const footer = 'My footer';
    const wrapper = mount(TCard, {
      propsData: {
        footer,
      },
    });
    expect(wrapper.vm.$refs.footer.innerHTML).toBe(footer);
  });

  it('it render the footer prop', () => {
    const footer = '<p>My footer</p>';
    const wrapper = mount(TCard, {
      slots: {
        footer,
      },
    });
    expect(wrapper.vm.$refs.footer.innerHTML).toBe(footer);
  });

  it('if no body only renders the wrapper', () => {
    const wrapper = mount(TCard, {
      propsData: {
        noBody: true,
      },
    });
    expect(wrapper.vm.$el.innerHTML).toBe('');
  });
});
