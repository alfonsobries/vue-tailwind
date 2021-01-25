import { shallowMount } from '@vue/test-utils';
import mapValues from 'lodash.mapvalues';
import TRichSelect from '../../src/components/TRichSelect';

describe('TRichSelect', () => {
  it('renders the select', () => {
    const wrapper = shallowMount(TRichSelect);
    expect(wrapper.vm.$refs.wrapper).toBeTruthy();
  });

  it('should accept an array value', () => {
    const value = [1, 2, 3];
    const wrapper = shallowMount(TRichSelect, {
      propsData: {
        value,
      },
    });

    expect(wrapper.vm.localValue).toEqual(value);
  });

  it('should accept an object value', () => {
    const value = { hello: 'world' };
    const wrapper = shallowMount(TRichSelect, {
      propsData: {
        value,
      },
    });
    expect(wrapper.vm.localValue).toEqual(value);
  });

  it('should accept a boolean value', () => {
    const value = false;
    const wrapper = shallowMount(TRichSelect, {
      propsData: {
        value,
      },
    });
    expect(wrapper.vm.localValue).toEqual(value);
  });

  it('renders the select button', () => {
    const wrapper = shallowMount(TRichSelect);
    expect(wrapper.vm.$refs.buttonWrapper).toBeTruthy();
  });

  it('hides the dropdown by default ', () => {
    const wrapper = shallowMount(TRichSelect);
    expect(wrapper.vm.$refs.dropdown).toBeFalsy();
  });

  it('opens the dropdown when the button is clicked', async () => {
    const wrapper = shallowMount(TRichSelect);
    wrapper.vm.$refs.selectButton.click();
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.$refs.dropdown.style.display).toBe('');
  });

  it('focus the search box when the button is clicked', async () => {
    const div = document.createElement('div');
    document.body.appendChild(div);

    const wrapper = shallowMount(TRichSelect, { attachTo: div });
    wrapper.vm.$refs.selectButton.click();
    // Wait for the dropdown to open
    await wrapper.vm.$nextTick();
    // Wait for the focus
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.$refs.searchBox).toBe(document.activeElement, 'The element was not focused');
  });

  it('closes the dropdown when the user press esc key', async () => {
    const div = document.createElement('div');
    document.body.appendChild(div);

    const wrapper = shallowMount(TRichSelect, { attachTo: div });
    wrapper.vm.$refs.selectButton.click();
    // Wait for the dropdown to open
    await wrapper.vm.$nextTick();
    // Wait for the focus
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.show).toBe(true);

    const event = new KeyboardEvent('keydown', { keyCode: 27 });
    wrapper.vm.$refs.searchBox.dispatchEvent(event);

    expect(wrapper.vm.show).toBe(false);
  });

  it('closes the dropdown when the search box lost the focus', async () => {
    const div = document.createElement('div');
    document.body.appendChild(div);

    const wrapper = shallowMount(TRichSelect, { attachTo: div });
    wrapper.vm.$refs.selectButton.click();
    // Wait for the dropdown to open
    await wrapper.vm.$nextTick();
    // Wait for the focus
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.show).toBe(true);
    wrapper.vm.$refs.searchBox.blur();
    expect(wrapper.vm.show).toBe(false);
  });

  it('opens the dropdown when the search button has focus', async () => {
    const wrapper = shallowMount(TRichSelect);
    wrapper.vm.$refs.selectButton.focus();
    expect(wrapper.vm.show).toBe(true);
  });

  it('opens the dropdown when the search button has focus and keep the focus if no searchbox', async () => {
    const div = document.createElement('div');
    document.body.appendChild(div);

    const wrapper = shallowMount(TRichSelect, {
      attachTo: div,
      propsData: {
        hideSearchBox: true,
      },
    });
    wrapper.vm.$refs.selectButton.click();
    // Wait for the dropdown to open
    await wrapper.vm.$nextTick();
    // Wait for the focus (in case of an error it will try to focus the searchbox)
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.$refs.selectButton).toBe(document.activeElement, 'The element was not focused');
    expect(wrapper.vm.$refs.searchBox).toBeFalsy();
  });

  it('show the search until minimum results for search', async () => {
    const wrapper = shallowMount(TRichSelect, {
      propsData: {
        options: [1, 2],
        minimumResultsForSearch: 3,
      },
    });

    expect(wrapper.vm.shouldShowSearchbox).toBe(false);
    wrapper.setProps({ options: [1, 2, 3] });
    expect(wrapper.vm.shouldShowSearchbox).toBe(true);
  });

  it('define a max height for the dropdown list from a number', async () => {
    const wrapper = shallowMount(TRichSelect, {
      propsData: {
        maxHeight: 100,
        options: ['A', 'B'],
      },
    });

    wrapper.vm.$refs.selectButton.click();
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.$refs.optionsList.style.maxHeight).toBe('100px');
  });

  it('define a max height for the dropdown list from a string', async () => {
    const wrapper = shallowMount(TRichSelect, {
      propsData: {
        maxHeight: '3em',
        options: ['A', 'B'],
      },
    });

    wrapper.vm.$refs.selectButton.click();
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.$refs.optionsList.style.maxHeight).toBe('3em');
  });

  it('renders the select options', async () => {
    const options = ['Option A', 'Option B', 'Option C'];
    const wrapper = shallowMount(TRichSelect, {
      propsData: { options },
    });

    wrapper.vm.$refs.selectButton.click();
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.$refs.optionsList.children.length).toBe(3);
  });

  it('show the selected option text when has value', () => {
    const options = [
      { value: 'value', text: 'The label' },
      { value: 'value1', text: 'The label 2' },
    ];

    const wrapper = shallowMount(TRichSelect, {
      propsData: { value: 'value1', options },
    });

    expect(wrapper.vm.$refs.selectButton.textContent).toBe('The label 2');
  });

  it('show a placeholder when the input has no value', () => {
    const options = ['Option A', 'Option B', 'Option C'];
    const wrapper = shallowMount(TRichSelect, {
      propsData: { placeholder: 'Select something!', options },
    });

    expect(wrapper.vm.$refs.selectButton.textContent).toBe('Select something!');
  });

  it('shows an empty space when doesnt have placeholder and has no value', () => {
    const options = ['Option A', 'Option B', 'Option C'];
    const wrapper = shallowMount(TRichSelect, {
      propsData: { options },
    });

    const placeholder = document.createElement('span');
    placeholder.innerHTML = '&nbsp;';
    expect(wrapper.vm.$refs.selectButton.textContent).toEqual(placeholder.textContent);
  });

  it('shows the option value when an option is selected', () => {
    const options = ['Option A', 'Option B', 'Option C'];
    const wrapper = shallowMount(TRichSelect, {
      propsData: { options, value: 'Option B' },
    });

    expect(wrapper.vm.$refs.selectButton.textContent).toBe('Option B');
  });

  it('shows the option value when an option changes', async () => {
    const options = ['Option A', 'Option B', 'Option C'];
    const wrapper = shallowMount(TRichSelect, {
      propsData: { options, value: 'Option B', name: 'test' },
    });

    wrapper.setProps({ value: 'Option A' });

    await wrapper.vm.$nextTick();

    expect(wrapper.vm.$refs.selectButton.textContent).toBe('Option A');
  });

  it('shows a button for clear the value when its clearable and has value', () => {
    const options = ['Option A', 'Option B', 'Option C'];
    const wrapper = shallowMount(TRichSelect, {
      propsData: { options, value: 'Option B', clearable: true },
    });

    expect(wrapper.vm.$refs.selectButtonClearButton).toBeTruthy();
  });

  it('not shows a button for clear the value when its clearable but not has value', () => {
    const options = ['Option A', 'Option B', 'Option C'];
    const wrapper = shallowMount(TRichSelect, {
      propsData: { options, clearable: true },
    });

    expect(wrapper.vm.$refs.selectButtonClearButton).toBeFalsy();
  });

  it('not shows a button for clear the value by default', () => {
    const options = ['Option A', 'Option B', 'Option C'];
    const wrapper = shallowMount(TRichSelect, {
      propsData: { options, value: 'Option B' },
    });

    expect(wrapper.vm.$refs.selectButtonClearButton).toBeFalsy();
  });

  it('the clear button clears the value', () => {
    const options = ['Option A', 'Option B', 'Option C'];
    const wrapper = shallowMount(TRichSelect, {
      propsData: { options, value: 'Option B', clearable: true },
    });

    expect(wrapper.vm.localValue).toBe('Option B');
    wrapper.vm.$refs.selectButtonClearButton.click();
    expect(wrapper.vm.localValue).toBe(null);
  });

  it('highlights the selected option', async () => {
    const options = ['Option A', 'Option B', 'Option C'];
    const wrapper = shallowMount(TRichSelect, {
      propsData: { options, value: 'Option B' },
    });

    wrapper.vm.$refs.selectButton.click();

    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.highlighted).toBe(1);
  });

  it('highlights the first option when no value', async () => {
    const options = ['Option A', 'Option B', 'Option C'];
    const wrapper = shallowMount(TRichSelect, {
      propsData: { options },
    });

    wrapper.vm.$refs.selectButton.click();

    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.highlighted).toBe(0);
  });

  it('select the value selected when renred', async () => {
    const options = ['Option A', 'Option B', 'Option C'];
    const value = 'Option A';
    const wrapper = shallowMount(TRichSelect, {
      propsData: { options, value },
    });

    expect(wrapper.vm.selectedOption).toEqual({
      value,
      text: value,
      raw: value,
    });
  });

  it('select the next item when down key', async () => {
    const options = ['Option A', 'Option B', 'Option C'];
    const wrapper = shallowMount(TRichSelect, {
      propsData: { options },
    });

    wrapper.vm.$refs.selectButton.click();

    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.highlighted).toBe(0);

    const event = new KeyboardEvent('keydown', { keyCode: 40 });
    wrapper.vm.$refs.searchBox.dispatchEvent(event);


    expect(wrapper.vm.highlighted).toBe(1);

    wrapper.vm.$refs.searchBox.dispatchEvent(event);
    wrapper.vm.$refs.searchBox.dispatchEvent(event);
    // Circular scroll
    expect(wrapper.vm.highlighted).toBe(0);
  });

  it('select the prev item when up key', async () => {
    const options = ['Option A', 'Option B', 'Option C'];
    const wrapper = shallowMount(TRichSelect, {
      propsData: { options },
    });

    wrapper.vm.$refs.selectButton.click();

    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.highlighted).toBe(0);

    const event = new KeyboardEvent('keydown', { keyCode: 38 });
    wrapper.vm.$refs.searchBox.dispatchEvent(event);

    // Because is circular
    expect(wrapper.vm.highlighted).toBe(2);

    wrapper.vm.$refs.searchBox.dispatchEvent(event);
    expect(wrapper.vm.highlighted).toBe(1);
  });

  it('render the select optgroups', async () => {
    const options = [
      { value: 'alone', text: 'no parent :(' },
      {
        text: 'Letters',
        children: [
          { value: 'A', text: 'A' },
          { value: 'B', text: 'B' },
          { value: 'C', text: 'C' },
        ],
      },
      {
        text: 'Numbers',
        children: [
          { value: 1, text: 1 },
          { value: 2, text: 2 },
        ],
      },
    ];

    const wrapper = shallowMount(TRichSelect, {
      propsData: { options },
    });

    wrapper.vm.$refs.selectButton.click();
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.$refs.optionsList.querySelectorAll('li[data-type=option]').length).toBe(6);

    expect(wrapper.vm.$refs.optionsList.querySelectorAll('li[data-type=optgroup]').length).toBe(2);

    expect(wrapper.vm.$refs.optionsList.querySelectorAll('li[data-type=optgroup]')[0].textContent).toBe('Letters');
    expect(wrapper.vm.$refs.optionsList.querySelectorAll('li[data-type=optgroup]')[1].textContent).toBe('Numbers');
  });

  it('set the props.value into the select value', () => {
    const options = ['Option A', 'Option B', 'Option C'];
    const value = 'Option B';
    const wrapper = shallowMount(TRichSelect, {
      propsData: { options, value },
    });
    expect(wrapper.vm.$refs.selectButton.value).toBe(value);
  });

  it('updates the model value', async () => {
    const options = ['Option A', 'Option B', 'Option C'];
    const value = 'Option B';
    const newValue = 'Option A';
    const wrapper = shallowMount(TRichSelect, {
      propsData: { options, value },
    });
    wrapper.setProps({ value: newValue });
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.$refs.selectButton.value).toBe(newValue);
  });

  it('accept the options as array of strings', () => {
    // Accepts an array of strings
    const strings = ['Option A', 'Option B', 'Option C', 'Option D'];

    const expectedOptions = strings.map((str) => ({
      value: str,
      text: str,
      raw: str,
    }));

    const wrapper = shallowMount(TRichSelect, {
      propsData: { options: strings },
    });

    expect(wrapper.vm.normalizedOptions).toEqual(expectedOptions);
  });

  it('accept the options as array of numbers', () => {
    const numbers = [1, 2, 3];

    const expectedOptions = numbers.map((num) => ({
      value: num,
      text: num,
      raw: num,
    }));

    const wrapper = shallowMount(TRichSelect, {
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

    const wrapper = shallowMount(TRichSelect, {
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

    const wrapper = shallowMount(TRichSelect, {
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

    const wrapper = shallowMount(TRichSelect, {
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

    const wrapper = shallowMount(TRichSelect, {
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

    const wrapper = shallowMount(TRichSelect, {
      propsData: {
        options: objectsWithCustomAttribs,
        valueAttribute: 'key',
        textAttribute: 'description',
      },
    });

    expect(wrapper.vm.normalizedOptions).toEqual(expectedOptions);
  });

  it('handle null values', () => {
    const options = [
      { value: null, text: 'Select an option' },
      { value: 'B', text: 'B' },
      { value: 'C', text: 'C' },
    ];

    const wrapper = shallowMount(TRichSelect, {
      propsData: { options },
    });

    const expectedOptions = options.map((option) => ({
      ...option,
      ...{
        raw: option,
      },
    }));

    expect(wrapper.vm.normalizedOptions).toEqual(expectedOptions);
  });

  it('disables the select', async () => {
    const wrapper = shallowMount(TRichSelect, {
      propsData: { disabled: false },
    });
    expect(wrapper.vm.$refs.selectButton.disabled).toBe(false);

    wrapper.setProps({ disabled: true });
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.$refs.selectButton.disabled).toBe(true);
  });

  it('has common attributes', async () => {
    const wrapper = shallowMount(TRichSelect);

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

    const { selectButton } = wrapper.vm.$refs;

    // Check for the default values
    Object.keys(values).forEach((key) => {
      const elementValue = values[key];
      expect(selectButton[elementValue.keyName || key]).toBe(elementValue.default);
    });

    const newProps = mapValues(values, ({ new: newValue }, key) => newValue);

    wrapper.setProps(newProps);

    await wrapper.vm.$nextTick();
    // Check for the new values
    Object.keys(values).forEach((key) => {
      const elementValue = values[key];
      expect(selectButton[elementValue.keyName || key]).toBe(elementValue.new);
    });
  });

  it('emits an input event with the select value', async () => {
    const options = ['K', 'B', 'C'];
    const wrapper = shallowMount(TRichSelect, {
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

  it('emits a change event with the select value', async () => {
    const options = ['A', 'B', 'C'];

    const wrapper = shallowMount(TRichSelect, {
      propsData: { options },
    });

    const inputValue = 'B';

    wrapper.setProps({
      value: inputValue,
    });

    await wrapper.vm.$nextTick();

    await wrapper.vm.$nextTick();

    expect(wrapper.emitted('change')).toBeTruthy();

    // assert event count
    expect(wrapper.emitted('change').length).toBe(1);

    // assert event payload
    expect(wrapper.emitted('change')[0]).toEqual([inputValue]);
  });

  it('emits a blur event when the select is blurred', () => {
    const options = ['A', 'B', 'C'];
    const value = 'B';
    const wrapper = shallowMount(TRichSelect, {
      propsData: { options, value, hideSearchBox: true },
    });

    const { selectButton } = wrapper.vm.$refs;

    // The change event should be emitted when the selectButton is blurred
    selectButton.dispatchEvent(new Event('blur'));

    expect(wrapper.emitted('blur')).toBeTruthy();

    // assert event count
    expect(wrapper.emitted('blur').length).toBe(1);
  });

  it('emits a focus event when the select is focused', () => {
    const options = ['A', 'B', 'C'];
    const value = 'B';
    const wrapper = shallowMount(TRichSelect, {
      propsData: { options, value },
    });

    const { selectButton } = wrapper.vm.$refs;

    // The change event should be emitted when the selectButton is focusred
    selectButton.dispatchEvent(new Event('focus'));

    expect(wrapper.emitted('focus')).toBeTruthy();

    // assert event count
    expect(wrapper.emitted('focus').length).toBe(1);
  });

  it('has a focus and a blur method', async () => {
    const wrapper = shallowMount(TRichSelect);

    wrapper.vm.focus();

    expect(wrapper.emitted('focus')).toBeTruthy();

    expect(wrapper.emitted('focus').length).toBe(1);

    // we need to wait for two nextick because how it works with the searchbox
    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();

    wrapper.vm.blur();

    expect(wrapper.emitted('blur')).toBeTruthy();

    expect(wrapper.emitted('blur').length).toBe(1);
  });

  it('filters the options when using the search box', async () => {
    const options = ['find me', 'im will not be found', 'what about me', 'hidden'];
    const wrapper = shallowMount(TRichSelect, {
      propsData: { options },
    });

    wrapper.vm.focus();
    await wrapper.vm.$nextTick();

    const { searchBox } = wrapper.vm.$refs;

    searchBox.value = 'me';
    searchBox.dispatchEvent(new Event('input'));

    await wrapper.vm.$nextTick();

    const expectedOptions = options
      .filter((option) => ['find me', 'what about me'].includes(option))
      .map((option) => ({
        value: option,
        text: option,
        raw: option,
      }));

    expect(wrapper.vm.filteredOptions.length).toBe(2);
    expect(wrapper.vm.filteredOptions).toEqual(expectedOptions);
  });
});
