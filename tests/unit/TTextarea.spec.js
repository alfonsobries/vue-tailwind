import { shallowMount } from '@vue/test-utils';
import mapValues from 'lodash.mapvalues';
import TTextarea from '../../src/inputs/TTextarea';

describe('TTextarea', () => {
  it('it renders the input', () => {
    const wrapper = shallowMount(TTextarea);
    expect(wrapper.get('textarea')).toBeTruthy();
  });

  it('set the props.value into the input value', () => {
    const value = 'input value';
    const wrapper = shallowMount(TTextarea, {
      propsData: { value },
    });
    expect(wrapper.vm.$el.value).toBe(value);
  });

  it('updates the model value', async () => {
    const value = 'input value';
    const newValue = 'new value';
    const wrapper = shallowMount(TTextarea, {
      propsData: { value },
    });
    wrapper.setProps({ value: newValue });
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.$el.value).toBe(newValue);
  });

  it('disables the input', async () => {
    const wrapper = shallowMount(TTextarea, {
      propsData: { disabled: false },
    });
    expect(wrapper.vm.$el.disabled).toBe(false);

    wrapper.setProps({ disabled: true });
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.$el.disabled).toBe(true);
  });

  it('has common attributes', async () => {
    const wrapper = shallowMount(TTextarea);

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
      readonly: {
        keyName: 'readOnly',
        default: false,
        new: true,
      },
      required: {
        default: false,
        new: true,
      },
      value: {
        default: '',
        new: 'my value',
      },
    };

    // Check for the default values
    Object.keys(values).forEach((key) => {
      const elementValue = values[key];
      expect(wrapper.vm.$el[elementValue.keyName || key]).toBe(elementValue.default);
    });

    const newProps = mapValues(values, ({ new: newValue }, key) => newValue);

    wrapper.setProps(newProps);

    await wrapper.vm.$nextTick();

    // Check for the new values
    Object.keys(values).forEach((key) => {
      const elementValue = values[key];
      expect(wrapper.vm.$el[elementValue.keyName || key]).toBe(elementValue.new);
    });
  });

  it('has textarea attributes', async () => {
    const wrapper = shallowMount(TTextarea);

    const values = {
      maxlength: {
        keyName: 'maxLength',
        default: 0,
        new: 12,
      },
      placeholder: {
        default: '',
        new: 'new placeholder',
      },
      rows: {
        default: 2,
        new: 6,
      },
      wrap: {
        default: 'soft',
        new: 'hard',
      },
    };

    // Check for the default values
    Object.keys(values).forEach((key) => {
      const elementValue = values[key];
      expect(wrapper.vm.$el[elementValue.keyName || key]).toBe(elementValue.default);
    });

    const newProps = mapValues(values, ({ new: newValue }, key) => newValue);

    wrapper.setProps(newProps);

    await wrapper.vm.$nextTick();

    // Check for the new values
    Object.keys(values).forEach((key) => {
      const elementValue = values[key];
      expect(wrapper.vm.$el[elementValue.keyName || key]).toBe(elementValue.new);
    });
  });

  it('emits an input event with the input value', async () => {
    const wrapper = shallowMount(TTextarea, {
      propsData: { value: 'original' },
    });

    const inputValue = 'Hello World';

    wrapper.setProps({
      value: inputValue,
    });

    await wrapper.vm.$nextTick();

    expect(wrapper.emitted('input')).toBeTruthy();

    // assert event count
    expect(wrapper.emitted('input').length).toBe(1);

    // assert event payload
    expect(wrapper.emitted('input')[0]).toEqual([inputValue]);
  });

  it('emits an change event with the input value', async () => {
    const wrapper = shallowMount(TTextarea);
    const input = wrapper.vm.$el;

    const inputValue = 'Hello World';

    wrapper.setProps({
      value: inputValue,
    });

    await wrapper.vm.$nextTick();

    // The change event should be emitted when the input is blurred
    input.dispatchEvent(new Event('blur'));

    expect(wrapper.emitted('change')).toBeTruthy();

    // assert event count
    expect(wrapper.emitted('change').length).toBe(1);

    // assert event payload
    expect(wrapper.emitted('change')[0]).toEqual([inputValue]);
  });

  it('emits a blur event when the input is blurred', () => {
    const inputValue = 'input value';
    const wrapper = shallowMount(TTextarea, {
      propsData: { value: inputValue },
    });

    const input = wrapper.vm.$el;

    // The change event should be emitted when the input is blurred
    input.dispatchEvent(new Event('blur'));

    expect(wrapper.emitted('blur')).toBeTruthy();

    // assert event count
    expect(wrapper.emitted('blur').length).toBe(1);
  });

  it('emits a focus event when the input is focused', () => {
    const inputValue = 'input value';
    const wrapper = shallowMount(TTextarea, {
      propsData: { value: inputValue },
    });

    const input = wrapper.vm.$el;

    // The change event should be emitted when the input is focusred
    input.dispatchEvent(new Event('focus'));

    expect(wrapper.emitted('focus')).toBeTruthy();

    // assert event count
    expect(wrapper.emitted('focus').length).toBe(1);
  });

  it('emits a keyup event', () => {
    const wrapper = shallowMount(TTextarea);

    wrapper.trigger('keyup', { keyCode: 40 });

    expect(wrapper.emitted('keyup')).toBeTruthy();

    // assert event count
    expect(wrapper.emitted('keyup').length).toBe(1);
  });

  it('emits a keydown event', () => {
    const wrapper = shallowMount(TTextarea);

    wrapper.trigger('keydown', { keyCode: 40 });

    expect(wrapper.emitted('keydown')).toBeTruthy();

    // assert event count
    expect(wrapper.emitted('keydown').length).toBe(1);
  });

  it('has a focus and a blur method', () => {
    const wrapper = shallowMount(TTextarea);

    wrapper.vm.focus();

    expect(wrapper.emitted('focus')).toBeTruthy();

    expect(wrapper.emitted('focus').length).toBe(1);

    wrapper.vm.blur();

    expect(wrapper.emitted('blur')).toBeTruthy();

    expect(wrapper.emitted('blur').length).toBe(1);
  });

  it('has a click/select/setSelectionRange/setRangeText method', () => {
    const wrapper = shallowMount(TTextarea);

    const input = wrapper.vm.$el;

    // I didnt find a way to test the click but at lest I will test that the method exists
    expect(typeof input.click).toBe('function');
    expect(typeof input.select).toBe('function');
    expect(typeof input.setSelectionRange).toBe('function');
    expect(typeof input.setRangeText).toBe('function');
  });

  it('can trigger a custom event', async () => {
    const onCustom = jest.fn();

    const wrapper = shallowMount(TTextarea, {
      listeners: { custom: onCustom },
    });

    const input = wrapper.vm.$el;

    const evt = new CustomEvent('custom', { detail: 'my-custom-event' });
    input.dispatchEvent(evt);

    expect(onCustom).toHaveBeenCalled();
  });
});
