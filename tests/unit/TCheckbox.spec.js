import { shallowMount } from '@vue/test-utils';
import mapValues from 'lodash.mapvalues';
import TCheckbox from '../../src/inputs/TCheckbox';

describe('TCheckbox', () => {
  it('it renders the input', () => {
    const wrapper = shallowMount(TCheckbox);
    expect(wrapper.get('input[type=checkbox]')).toBeTruthy();
  });

  it('set the props.value into the input value', () => {
    const value = 'input value';

    const wrapper = shallowMount(TCheckbox, {
      propsData: { value },
    });

    const { input } = wrapper.vm.$refs;

    expect(input.value).toBe(value);
  });

  it('updates the model value', async () => {
    const value = 'input value';
    const newValue = 'new value';
    const wrapper = shallowMount(TCheckbox, {
      propsData: { value },
    });

    wrapper.setProps({ value: newValue });

    const { input } = wrapper.vm.$refs;

    await wrapper.vm.$nextTick();

    expect(input.value).toBe(newValue);
  });

  it('check/uncheck for array v-model', async () => {
    const wrapper = shallowMount(TCheckbox, {
      propsData: {
        value: 'A',
        model: [],
      },
    });

    const { input } = wrapper.vm.$refs;

    expect(input.checked).toBe(false);

    wrapper.setProps({ model: ['A'] });

    await wrapper.vm.$nextTick();

    expect(input.checked).toBe(true);

    wrapper.setProps({ model: ['B'] });

    await wrapper.vm.$nextTick();

    expect(input.checked).toBe(false);
  });

  it('check the input if checked attribute', async () => {
    const wrapper = shallowMount(TCheckbox, {
      propsData: {
        checked: true,
      },
    });

    const { input } = wrapper.vm.$refs;

    expect(input.checked).toBe(true);
  });

  it('disables the input', async () => {
    const wrapper = shallowMount(TCheckbox, {
      propsData: { disabled: false },
    });

    const { input } = wrapper.vm.$refs;

    expect(input.disabled).toBe(false);

    wrapper.setProps({ disabled: true });

    await wrapper.vm.$nextTick();

    expect(input.disabled).toBe(true);
  });

  it('has input attributes', async () => {
    const wrapper = shallowMount(TCheckbox);

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
      required: {
        default: false,
        new: true,
      },
      value: {
        default: 'true',
        new: 'my value',
      },
    };

    const { input } = wrapper.vm.$refs;

    // Check for the default values
    Object.keys(values).forEach((key) => {
      const elementValue = values[key];
      expect(input[elementValue.keyName || key]).toBe(elementValue.default);
    });

    const newProps = mapValues(values, ({ new: newValue }, key) => newValue);

    wrapper.setProps(newProps);

    await wrapper.vm.$nextTick();

    // Check for the new values
    Object.keys(values).forEach((key) => {
      const elementValue = values[key];
      expect(input[elementValue.keyName || key]).toBe(elementValue.new);
    });
  });

  it('emits a change & input event with the expected boolean values', async () => {
    const wrapper = shallowMount(TCheckbox);

    wrapper.vm.setChecked(true);
    wrapper.vm.setChecked(false);

    expect(wrapper.emitted('input')).toBeTruthy();
    expect(wrapper.emitted('change')).toBeTruthy();

    // assert event count
    expect(wrapper.emitted('input').length).toBe(2);
    expect(wrapper.emitted('change').length).toBe(2);

    // assert event payload
    expect(wrapper.emitted('input')[0]).toEqual([true]);
    expect(wrapper.emitted('input')[1]).toEqual([false]);
    expect(wrapper.emitted('change')[0]).toEqual([true]);
    expect(wrapper.emitted('change')[1]).toEqual([false]);
  });

  it('emits a change & input event with the according checked & unchecked value', () => {
    const wrapper = shallowMount(TCheckbox);

    const value = 'checked';
    const uncheckedValue = 'not_checked';

    wrapper.setProps({
      value,
      uncheckedValue,
    });

    wrapper.setChecked(true);
    wrapper.setChecked(false);

    expect(wrapper.emitted('input')).toBeTruthy();
    expect(wrapper.emitted('change')).toBeTruthy();

    // assert event count
    expect(wrapper.emitted('input').length).toBe(2);
    expect(wrapper.emitted('change').length).toBe(2);

    // assert event payload
    expect(wrapper.emitted('input')[0]).toEqual([value]);
    expect(wrapper.emitted('input')[1]).toEqual([uncheckedValue]);
    expect(wrapper.emitted('change')[0]).toEqual([value]);
    expect(wrapper.emitted('change')[1]).toEqual([uncheckedValue]);
  });

  it('emits a blur event when the checkbox is blurred', () => {
    const wrapper = shallowMount(TCheckbox);

    const { input } = wrapper.vm.$refs;

    // The change event should be emitted when the input is blurred
    input.dispatchEvent(new Event('blur'));

    expect(wrapper.emitted('blur')).toBeTruthy();

    // assert event count
    expect(wrapper.emitted('blur').length).toBe(1);
  });

  it('emits a focus event when the checkbox is focused', () => {
    const wrapper = shallowMount(TCheckbox);

    const { input } = wrapper.vm.$refs;

    // The change event should be emitted when the input is focusred
    input.dispatchEvent(new Event('focus'));

    expect(wrapper.emitted('focus')).toBeTruthy();

    // assert event count
    expect(wrapper.emitted('focus').length).toBe(1);
  });

  it('has a focus and a blur method', () => {
    const wrapper = shallowMount(TCheckbox);

    wrapper.vm.focus();

    expect(wrapper.emitted('focus')).toBeTruthy();

    expect(wrapper.emitted('focus').length).toBe(1);

    wrapper.vm.blur();

    expect(wrapper.emitted('blur')).toBeTruthy();

    expect(wrapper.emitted('blur').length).toBe(1);
  });

  it('can trigger a custom event', async () => {
    const onCustom = jest.fn();

    const wrapper = shallowMount(TCheckbox, {
      listeners: { custom: onCustom },
    });

    const input = wrapper.vm.$el;

    const evt = new CustomEvent('custom', { detail: 'my-custom-event' });
    input.dispatchEvent(evt);

    expect(onCustom).toHaveBeenCalled();
  });
});
