import { mount, shallowMount } from '@vue/test-utils';
import TCheckboxGroup from '../../src/components/TCheckboxGroup';

describe('TCheckboxGroup', () => {
  it('it renders the checkbox options', () => {
    const options = ['Option A', 'Option B', 'Option C'];

    const wrapper = mount(TCheckboxGroup, {
      propsData: { options },
    });

    expect(wrapper.vm.$el.querySelectorAll('input[type=checkbox]').length).toBe(3);
  });

  it('selects the selected checkbox option', () => {
    const options = ['Option A', 'Option B', 'Option C'];

    const values = ['Option C', 'Option B'];

    const wrapper = mount(TCheckboxGroup, {
      propsData: { options, value: values },
    });

    expect(wrapper.vm.$el.querySelectorAll('input[type=checkbox]:checked')[0].value).toBe(values[1]);
  });

  it('selects the selected checkbox options', () => {
    const options = ['Option A', 'Option B', 'Option C'];

    const values = ['Option B', 'Option C'];

    const wrapper = mount(TCheckboxGroup, {
      propsData: { options, value: values },
    });

    expect(wrapper.vm.$el.querySelectorAll('input[type=checkbox]:checked')[0].value).toBe(values[0]);
    expect(wrapper.vm.$el.querySelectorAll('input[type=checkbox]:checked')[1].value).toBe(values[1]);
  });

  it('accept the options as array of strings', () => {
    // Accepts an array of strings
    const strings = ['Option A', 'Option B', 'Option C', 'Option D'];

    const expectedOptions = strings.map((str) => ({
      value: str,
      text: str,
      raw: str,
    }));

    const wrapper = shallowMount(TCheckboxGroup, {
      propsData: { options: strings },
    });

    expect(wrapper.vm.normalizedOptions).toEqual(expectedOptions);
  });

  it('accept the options as array of numbers', () => {
    const numbers = [1, 2, 3];

    const expectedOptions = numbers.map((str) => ({
      value: str,
      text: str,
      raw: str,
    }));

    const wrapper = shallowMount(TCheckboxGroup, {
      propsData: { options: numbers },
    });

    expect(wrapper.vm.normalizedOptions).toEqual(expectedOptions);
  });

  it('accept the options in default format', () => {
    // Accepts an array of objects with value
    const objectsWithValue = [
      { value: 'A', text: 'A' },
      { value: 'B', text: 'B' },
      { value: 'C', text: 'C' },
    ];

    const expectedOptions = objectsWithValue.map((option) => ({
      ...option,
      ...{
        raw: option,
      },
    }));

    const wrapper = shallowMount(TCheckboxGroup, {
      propsData: { options: objectsWithValue },
    });

    expect(wrapper.vm.normalizedOptions).toEqual(expectedOptions);
  });

  it('accept the options using id as value', () => {
    const objectsWithIds = [
      { id: 1, text: 'A' },
      { id: 2, text: 'B' },
      { id: 3, text: 'C' },
    ];

    const expectedOptions = objectsWithIds.map((option) => ({ value: option.id, text: option.text, raw: option }));

    const wrapper = shallowMount(TCheckboxGroup, {
      propsData: { options: objectsWithIds },
    });

    expect(wrapper.vm.normalizedOptions).toEqual(expectedOptions);
  });

  it('accept the options and use the label as text', () => {
    const objectsWithLabel = [
      { value: 'A', label: 'A' },
      { value: 'B', label: 'B' },
      { value: 'C', label: 'C' },
    ];

    const expectedOptions = objectsWithLabel.map((option) => ({ value: option.value, text: option.label, raw: option }));

    const wrapper = shallowMount(TCheckboxGroup, {
      propsData: { options: objectsWithLabel },
    });

    expect(wrapper.vm.normalizedOptions).toEqual(expectedOptions);
  });

  it('accept the options and pair value:text object', () => {
    const optionsObject = {
      A: 'Option A',
      B: 'Option B',
      C: 'Option C',
    };

    const expectedOptions = Object.keys(optionsObject).map((key) => ({
      value: key,
      text: optionsObject[key],
    }));

    const wrapper = shallowMount(TCheckboxGroup, {
      propsData: { options: optionsObject },
    });

    expect(wrapper.vm.normalizedOptions).toEqual(expectedOptions);
  });

  it('accept dynamic value/text attributes', () => {
    const objectsWithCustomAttribs = [
      { key: 'A', description: 'A' },
      { key: 'B', description: 'B' },
      { key: 'C', description: 'C' },
    ];

    const expectedOptions = objectsWithCustomAttribs.map((option) => ({ value: option.key, text: option.description, raw: option }));

    const wrapper = shallowMount(TCheckboxGroup, {
      propsData: {
        options: objectsWithCustomAttribs,
        valueAttribute: 'key',
        textAttribute: 'description',
      },
    });

    expect(wrapper.vm.normalizedOptions).toEqual(expectedOptions);
  });

  it('disables the checkbox inputs', async () => {
    const options = ['Option A', 'Option B', 'Option C'];
    const wrapper = mount(TCheckboxGroup, {
      propsData: { disabled: false, options },
    });

    expect(wrapper.vm.$el.querySelectorAll('input[type=checkbox]:not(:disabled)').length).toBe(3);

    wrapper.setProps({ disabled: true });

    await wrapper.vm.$nextTick();

    expect(wrapper.vm.$el.querySelectorAll('input[type=checkbox]:not(:disabled)').length).toBe(0);
    expect(wrapper.vm.$el.querySelectorAll('input[type=checkbox]:disabled').length).toBe(3);
  });

  it('emits an input event with the checkbox value', async () => {
    const options = ['A', 'B', 'C'];
    const wrapper = shallowMount(TCheckboxGroup, {
      propsData: { options },
    });

    const inputValue = 'B';

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

  it('emits an change event with the checkbox value', async () => {
    const options = ['A', 'B', 'C'];

    const wrapper = shallowMount(TCheckboxGroup, {
      propsData: { options },
    });

    const inputValue = ['B'];

    wrapper.setProps({
      value: inputValue,
    });

    await wrapper.vm.$nextTick();

    expect(wrapper.emitted('change')).toBeTruthy();

    // assert event count
    expect(wrapper.emitted('change').length).toBe(1);

    // assert event payload
    expect(wrapper.emitted('change')[0]).toEqual([inputValue]);
  });

  it('emits a blur event when any of the checkbox inputs are blurred', () => {
    const options = ['A', 'B', 'C'];
    const value = ['B'];
    const wrapper = mount(TCheckboxGroup, {
      propsData: { options, value },
    });

    const checkbox = wrapper.vm.$el.querySelectorAll('input[type=checkbox]')[0];

    // The change event should be emitted when the checkbox is blurred
    checkbox.dispatchEvent(new Event('blur'));

    expect(wrapper.emitted('blur')).toBeTruthy();

    // assert event count
    expect(wrapper.emitted('blur').length).toBe(1);
  });

  it('emits a focus event when the checkbox is focused', () => {
    const options = ['A', 'B', 'C'];
    const value = ['B'];
    const wrapper = mount(TCheckboxGroup, {
      propsData: { options, value },
    });

    const checkbox = wrapper.vm.$el.querySelectorAll('input[type=checkbox]')[0];

    // The change event should be emitted when the checkbox is focusred
    checkbox.dispatchEvent(new Event('focus'));

    expect(wrapper.emitted('focus')).toBeTruthy();

    // assert event count
    expect(wrapper.emitted('focus').length).toBe(1);
  });
});
