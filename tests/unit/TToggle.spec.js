import { shallowMount } from '@vue/test-utils';
import mapValues from 'lodash.mapvalues';
import TToggle from '../../src/components/TToggle';

describe('TToggle', () => {
  it('it renders the toggle with an input', () => {
    const wrapper = shallowMount(TToggle);
    expect(wrapper.vm.$el.tagName).toBe('SPAN');
    expect(wrapper.get('input[type=hidden]')).toBeTruthy();
  });

  it('set the props.value into the input value', () => {
    const value = 'input value';

    const wrapper = shallowMount(TToggle, {
      propsData: {
        value,
        model: value,
      },
    });

    const { input } = wrapper.vm.$refs;

    expect(input.value).toBe(value);
  });

  it('set the props.uncheckedValue into the input value', () => {
    const value = 'input value';
    const uncheckedValue = 'unchecked value';

    const wrapper = shallowMount(TToggle, {
      propsData: {
        value,
        uncheckedValue,
      },
    });

    const { input } = wrapper.vm.$refs;

    expect(input.value).toBe(uncheckedValue);
  });

  it('updates the model value', async () => {
    const value = 'input value';
    const newValue = 'new value';
    const wrapper = shallowMount(TToggle, {
      propsData: { value, model: value },
    });
    const { input } = wrapper.vm.$refs;

    expect(input.value).toBe(value);

    wrapper.setProps({ value: newValue, model: newValue });

    await wrapper.vm.$nextTick();

    expect(input.value).toBe(newValue);
  });

  it('updates the model value if unchecked value', async () => {
    const value = 'input value';
    const uncheckedValue = 'new value';
    const wrapper = shallowMount(TToggle, {
      propsData: { value, uncheckedValue, model: value },
    });
    const { input } = wrapper.vm.$refs;

    expect(input.value).toBe(value);

    wrapper.setProps({ model: uncheckedValue });

    await wrapper.vm.$nextTick();

    expect(input.value).toBe(uncheckedValue);
  });

  it('check/uncheck for array v-model', async () => {
    const wrapper = shallowMount(TToggle, {
      propsData: {
        value: 'A',
        model: [],
      },
    });

    const { input } = wrapper.vm.$refs;

    expect(input.value).toBe('');
    expect(wrapper.vm.isChecked).toBe(false);

    wrapper.setProps({ model: ['A'] });

    await wrapper.vm.$nextTick();

    expect(input.value).toBe('A');
    expect(wrapper.vm.isChecked).toBe(true);

    wrapper.setProps({ model: ['B'] });

    await wrapper.vm.$nextTick();

    expect(input.value).toBe('');
    expect(wrapper.vm.isChecked).toBe(false);
  });

  it('disables the toggle', async () => {
    const wrapper = shallowMount(TToggle, {
      propsData: { disabled: false },
    });

    const { input } = wrapper.vm.$refs;

    expect(input.disabled).toBe(false);

    wrapper.setProps({ disabled: true });

    await wrapper.vm.$nextTick();

    expect(input.disabled).toBe(true);
  });

  it('has input attributes', async () => {
    const wrapper = shallowMount(TToggle);

    const values = {
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
    const wrapper = shallowMount(TToggle);

    wrapper.vm.toggleValue();
    await wrapper.vm.$nextTick();
    wrapper.vm.toggleValue();
    await wrapper.vm.$nextTick();


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

  it('emits a change & input event with the according checked & unchecked value', async () => {
    const wrapper = shallowMount(TToggle);

    const value = 'checked';
    const uncheckedValue = 'not_checked';

    wrapper.setProps({
      value,
      uncheckedValue,
    });

    wrapper.vm.setChecked(true);
    await wrapper.vm.$nextTick();
    wrapper.vm.setChecked(false);
    await wrapper.vm.$nextTick();

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
    const wrapper = shallowMount(TToggle);

    const input = wrapper.vm.$el;

    // The change event should be emitted when the toggle is blurred
    input.dispatchEvent(new Event('blur'));

    expect(wrapper.emitted('blur')).toBeTruthy();

    // assert event count
    expect(wrapper.emitted('blur').length).toBe(1);
  });

  it('emits a focus event when the checkbox is focused', () => {
    const wrapper = shallowMount(TToggle);

    const input = wrapper.vm.$el;

    // The change event should be emitted when the toggle is focusred
    input.dispatchEvent(new Event('focus'));

    expect(wrapper.emitted('focus')).toBeTruthy();

    // assert event count
    expect(wrapper.emitted('focus').length).toBe(1);
  });

  it('has a focus and a blur method', () => {
    const wrapper = shallowMount(TToggle);

    wrapper.vm.focus();

    expect(wrapper.emitted('focus')).toBeTruthy();

    expect(wrapper.emitted('focus').length).toBe(1);

    wrapper.vm.blur();

    expect(wrapper.emitted('blur')).toBeTruthy();

    expect(wrapper.emitted('blur').length).toBe(1);
  });

  it('has a keydown event', async () => {
    const wrapper = shallowMount(TToggle);

    wrapper.vm.focus();

    await wrapper.vm.$el.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));

    expect(wrapper.emitted('keydown')).toBeTruthy();

    expect(wrapper.emitted('keydown').length).toBe(1);
  });
});
