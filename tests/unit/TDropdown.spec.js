import { shallowMount } from '@vue/test-utils';
import TDropdown from '../../src/components/TDropdown';

describe('TDropdown', () => {
  it('renders the dropdown button', () => {
    const wrapper = shallowMount(TDropdown);
    expect(wrapper.get('button')).toBeTruthy();
  });

  it('renders the dropdown wrapper using the tagName', () => {
    const wrapper = shallowMount(TDropdown, {
      propsData: {
        tagName: 'ul',
      },
    });

    expect(wrapper.vm.$el.tagName).toBe('UL');
  });

  it('shows the dropdown according to show prop', async () => {
    const wrapper = shallowMount(TDropdown, {
      propsData: {
        show: true,
      },
    });

    expect(wrapper.vm.localShow).toBe(true);

    wrapper.setProps({ show: false });

    await wrapper.vm.$nextTick();

    expect(wrapper.vm.localShow).toBe(false);
  });

  it('shows the dropdown when focus', () => {
    const wrapper = shallowMount(TDropdown, {
      propsData: {
        toggleOnFocus: true,
      },
    });

    const { button } = wrapper.vm.$refs;

    // The change event should be emitted when the button is focused
    button.dispatchEvent(new Event('focus'));

    expect(wrapper.vm.localShow).toBe(true);
  });

  it('hides the dropdown when blur', () => {
    const wrapper = shallowMount(TDropdown);

    const { button } = wrapper.vm.$refs;

    // The change event should be emitted when the button is focused
    button.dispatchEvent(new Event('focus'));
    button.dispatchEvent(new Event('blur'));

    expect(wrapper.vm.localShow).toBe(false);
  });

  it('doesnt show the dropdown when focus according to setting', () => {
    const wrapper = shallowMount(TDropdown, {
      propsData: {
        toggleOnFocus: false,
      },
    });

    const { button } = wrapper.vm.$refs;

    // The change event should be emitted when the button is focused
    button.dispatchEvent(new Event('focus'));


    expect(wrapper.vm.localShow).toBe(false);
  });

  it('doesnt hide the dropdown when blur according to setting', () => {
    const wrapper = shallowMount(TDropdown, {
      propsData: {
        show: true,
        toggleOnFocus: false,
        toggleOnClick: false,
      },
    });

    const { button } = wrapper.vm.$refs;

    // The change event should be emitted when the button is focused
    button.dispatchEvent(new Event('focus'));
    button.dispatchEvent(new Event('blur'));

    expect(wrapper.vm.localShow).toBe(true);
  });

  it('shows the dropdown when click enter to button', () => {
    const wrapper = shallowMount(TDropdown);

    const { button } = wrapper.vm.$refs;


    const enter = new KeyboardEvent('keydown', {
      bubbles: true, cancelable: true, keyCode: 13,
    });

    button.dispatchEvent(enter);

    expect(wrapper.vm.localShow).toBe(true);
  });

  it('hides the dropdown when click enter to button', () => {
    const wrapper = shallowMount(TDropdown, {
      propsData: {
        show: true,
      },
    });

    const { button } = wrapper.vm.$refs;


    const enter = new KeyboardEvent('keydown', {
      bubbles: true, cancelable: true, keyCode: 13,
    });

    button.dispatchEvent(enter);

    expect(wrapper.vm.localShow).toBe(false);
  });

  it('shows the dropdown when click space to button', () => {
    const wrapper = shallowMount(TDropdown);

    const { button } = wrapper.vm.$refs;


    const space = new KeyboardEvent('keydown', {
      bubbles: true, cancelable: true, keyCode: 32,
    });

    button.dispatchEvent(space);

    expect(wrapper.vm.localShow).toBe(true);
  });

  it('hides the dropdown when click space to button', () => {
    const wrapper = shallowMount(TDropdown, {
      propsData: {
        show: true,
      },
    });

    const { button } = wrapper.vm.$refs;


    const space = new KeyboardEvent('keydown', {
      bubbles: true, cancelable: true, keyCode: 32,
    });

    button.dispatchEvent(space);

    expect(wrapper.vm.localShow).toBe(false);
  });

  it('doesnt show the dropdown when click enter to button according to settings', () => {
    const wrapper = shallowMount(TDropdown, {
      propsData: {
        toggleOnClick: false,
      },
    });

    const { button } = wrapper.vm.$refs;


    const enter = new KeyboardEvent('keydown', {
      bubbles: true, cancelable: true, keyCode: 13,
    });

    button.dispatchEvent(enter);

    expect(wrapper.vm.localShow).toBe(false);
  });

  it('doesnt hide the dropdown when click enter to button according to settings', () => {
    const wrapper = shallowMount(TDropdown, {
      propsData: {
        toggleOnClick: false,
        show: true,
      },
    });

    const { button } = wrapper.vm.$refs;


    const enter = new KeyboardEvent('keydown', {
      bubbles: true, cancelable: true, keyCode: 13,
    });

    button.dispatchEvent(enter);

    expect(wrapper.vm.localShow).toBe(true);
  });

  it('doesnt show the dropdown when click space to button according to settings', () => {
    const wrapper = shallowMount(TDropdown, {
      propsData: {
        toggleOnClick: false,
      },
    });

    const { button } = wrapper.vm.$refs;


    const space = new KeyboardEvent('keydown', {
      bubbles: true, cancelable: true, keyCode: 32,
    });

    button.dispatchEvent(space);

    expect(wrapper.vm.localShow).toBe(false);
  });

  it('doesnt hide the dropdown when click space to button according to settings', () => {
    const wrapper = shallowMount(TDropdown, {
      propsData: {
        toggleOnClick: false,
        show: true,
      },
    });

    const { button } = wrapper.vm.$refs;


    const space = new KeyboardEvent('keydown', {
      bubbles: true, cancelable: true, keyCode: 32,
    });

    button.dispatchEvent(space);

    expect(wrapper.vm.localShow).toBe(true);
  });

  it('toggles the dropdown when mouse over/leave if setting set', () => {
    const wrapper = shallowMount(TDropdown, {
      propsData: {
        toggleOnHover: true,
        hideOnLeaveTimeout: 0,
      },
    });

    const wrapperEl = wrapper.vm.$refs.wrapper;

    // The change event should be emitted when the button is focused
    wrapperEl.dispatchEvent(new Event('mouseover'));

    expect(wrapper.vm.localShow).toBe(true);

    wrapperEl.dispatchEvent(new Event('mouseleave'));

    expect(wrapper.vm.localShow).toBe(false);
  });

  it('doesnt toggle the dropdown when mouse over/leave if no setting set', () => {
    const wrapper = shallowMount(TDropdown, {
      propsData: {
        toggleOnHover: false,
        hideOnLeaveTimeout: 0,
      },
    });

    const wrapperEl = wrapper.vm.$refs.wrapper;

    // The change event should be emitted when the button is focused
    wrapperEl.dispatchEvent(new Event('mouseover'));

    expect(wrapper.vm.localShow).toBe(false);

    wrapperEl.dispatchEvent(new Event('mouseleave'));

    expect(wrapper.vm.localShow).toBe(false);
  });

  it('emits a focus event when the input is focused', () => {
    const wrapper = shallowMount(TDropdown);

    const { button } = wrapper.vm.$refs;

    // The change event should be emitted when the button is focused
    button.dispatchEvent(new Event('focus'));

    expect(wrapper.emitted('focus')).toBeTruthy();

    // assert event count
    expect(wrapper.emitted('focus').length).toBe(1);
  });

  it('emits a blur event when the button is blurred', () => {
    const wrapper = shallowMount(TDropdown);

    const { button } = wrapper.vm.$refs;

    button.dispatchEvent(new Event('focus'));

    // The change event should be emitted when the button is blurred
    button.dispatchEvent(new Event('blur'));

    expect(wrapper.emitted('blur')).toBeTruthy();

    // assert event count
    expect(wrapper.emitted('blur').length).toBe(1);
  });

  it('has a focus and a blur method', () => {
    const wrapper = shallowMount(TDropdown);

    wrapper.vm.focus();

    expect(wrapper.emitted('focus')).toBeTruthy();

    expect(wrapper.emitted('focus').length).toBe(1);

    wrapper.vm.blur();

    expect(wrapper.emitted('blur')).toBeTruthy();

    expect(wrapper.emitted('blur').length).toBe(1);
  });
});
