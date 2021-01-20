import { shallowMount } from '@vue/test-utils';
import mapValues from 'lodash.mapvalues';
import TButton from '../../src/inputs/TButton';

describe('TButton', () => {
  it('it renders the button', () => {
    const wrapper = shallowMount(TButton);
    expect(wrapper.get('button')).toBeTruthy();
  });

  it('disables the button', async () => {
    const wrapper = shallowMount(TButton, {
      propsData: { disabled: false },
    });

    expect(wrapper.vm.$el.disabled).toBe(false);

    wrapper.setProps({ disabled: true });

    await wrapper.vm.$nextTick();

    expect(wrapper.vm.$el.disabled).toBe(true);
  });

  it('default to button tag', () => {
    const wrapper = shallowMount(TButton);

    expect(wrapper.vm.$el.tagName).toBe('BUTTON');
  });

  it('accepts anchor tag', () => {
    const wrapper = shallowMount(TButton, {
      propsData: { tagName: 'a' },
    });

    expect(wrapper.vm.$el.tagName).toBe('A');
  });

  it('uses anchor tag when has href attribute', () => {
    const wrapper = shallowMount(TButton, {
      propsData: { href: 'https://www.vue-tailwind.com/' },
    });

    expect(wrapper.vm.$el.tagName).toBe('A');
  });

  it('get the default regular props in regular circustancies', () => {
    const wrapper = shallowMount(TButton);

    expect(Object.keys(wrapper.vm.getAttributes())).toEqual(['id', 'value', 'autofocus', 'disabled', 'name', 'href', 'type']);
  });

  it('uses router-link props when `to` prop is defined and the route link component is defined', () => {
    const wrapper = shallowMount(TButton, {
      propsData: { to: '/some-place' },
      computed: {
        isRouterLinkComponentAvailable() {
          return true;
        },
      },
    });

    expect(Object.keys(wrapper.vm.getAttributes())).toEqual(['to', 'replace', 'append', 'tag', 'activeClass', 'exact', 'event', 'exactActiveClass', 'id', 'value', 'autofocus', 'disabled', 'name', 'type']);
  });

  it('uses native button for inertia when tag name is not `a`', () => {
    const wrapper = shallowMount(TButton, {
      propsData: { tagName: 'button', href: '/test' },
      computed: {
        isInertiaLinkComponentAvailable() {
          return true;
        },
      },
    });

    expect(Object.keys(wrapper.vm.getAttributes())).toEqual(['id', 'value', 'autofocus', 'disabled', 'name', 'href', 'type']);
  });

  it('uses native button when native is set', () => {
    const wrapper = shallowMount(TButton, {
      propsData: { to: '/some-place', native: true },
      computed: {
        isRouterLinkComponentAvailable() {
          return true;
        },
      },
    });

    expect(Object.keys(wrapper.vm.getAttributes())).toEqual(['id', 'value', 'autofocus', 'disabled', 'name', 'href', 'type']);
  });

  it('has common attributes', async () => {
    const wrapper = shallowMount(TButton);

    const values = {
      id: {
        default: '',
        new: 'new-id',
      },
      autofocus: {
        default: false,
        new: true,
      },
      disabled: {
        default: false,
        new: true,
      },
      name: {
        default: '',
        new: 'new-name',
      },
    };

    const select = wrapper.vm.$el;

    // Check for the default values
    Object.keys(values).forEach((key) => {
      const elementValue = values[key];
      expect(select[elementValue.keyName || key]).toBe(elementValue.default);
    });

    const newProps = mapValues(values, ({ new: newValue }, key) => newValue);

    wrapper.setProps(newProps);

    await wrapper.vm.$nextTick();

    // Check for the new values
    Object.keys(values).forEach((key) => {
      const elementValue = values[key];
      expect(select[elementValue.keyName || key]).toBe(elementValue.new);
    });
  });

  it('has button attributes', async () => {
    const wrapper = shallowMount(TButton);

    const values = {
      type: {
        default: 'submit',
        new: 'button',
      },
    };

    const button = wrapper.vm.$el;

    // Check for the default values
    Object.keys(values).forEach((key) => {
      const elementValue = values[key];
      expect(button[elementValue.keyName || key]).toBe(elementValue.default);
    });

    const newProps = mapValues(values, ({ new: newValue }, key) => newValue);

    wrapper.setProps(newProps);

    await wrapper.vm.$nextTick();

    // Check for the new values
    Object.keys(values).forEach((key) => {
      const elementValue = values[key];
      expect(button[elementValue.keyName || key]).toBe(elementValue.new);
    });
  });

  it('emits a blur event when the button is blurred', () => {
  	const wrapper = shallowMount(TButton);

    const button = wrapper.vm.$el;

    // The change event should be emitted when the button is blurred
    button.dispatchEvent(new Event('blur'));

    expect(wrapper.emitted('blur')).toBeTruthy();

    // assert event count
    expect(wrapper.emitted('blur').length).toBe(1);
  });

  it('emits a focus event when the select is focused', () => {
    const wrapper = shallowMount(TButton);

    const button = wrapper.vm.$el;

    // The change event should be emitted when the button is focusred
    button.dispatchEvent(new Event('focus'));

    expect(wrapper.emitted('focus')).toBeTruthy();

    // assert event count
    expect(wrapper.emitted('focus').length).toBe(1);
  });

  it('has a focus and a blur method', () => {
    const wrapper = shallowMount(TButton);

    wrapper.vm.focus();

    expect(wrapper.emitted('focus')).toBeTruthy();

    expect(wrapper.emitted('focus').length).toBe(1);

    wrapper.vm.blur();

    expect(wrapper.emitted('blur')).toBeTruthy();

    expect(wrapper.emitted('blur').length).toBe(1);
  });

  it('has a click event', () => {
    const wrapper = shallowMount(TButton);

    // The click event should be emitted when the button is blurred
    wrapper.trigger('click');

    expect(wrapper.emitted('click')).toBeTruthy();

    // assert event count
    expect(wrapper.emitted('click').length).toBe(1);
  });


  it('can trigger a custom event', async () => {
    const onCustom = jest.fn();

    const wrapper = shallowMount(TButton, {
      listeners: { custom: onCustom },
    });

    const input = wrapper.vm.$el;

    const evt = new CustomEvent('custom', { detail: 'my-custom-event' });
    input.dispatchEvent(evt);

    expect(onCustom).toHaveBeenCalled();
  });
});
