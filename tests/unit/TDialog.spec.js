
import { shallowMount } from '@vue/test-utils';

import TDialogOverlayWrapperTransitionDialogContentInput from '../../src/components/TDialog/TDialogOverlayWrapperTransitionDialogContentInput';

describe('TDialogOverlayWrapperTransitionDialogContentInput', () => {
  const defaultProps = {
    getElementCssClass: () => '',
    inputType: 'text',
  };

  it('render a text input by default', () => {
    const wrapper = shallowMount(TDialogOverlayWrapperTransitionDialogContentInput, {
      propsData: defaultProps,
    });

    const input = wrapper.find('input');
    expect(input.exists()).toBe(true);
    expect(input.element.value).toBe('');
  });

  it('set the default value of the input from the props', () => {
    const wrapper = shallowMount(TDialogOverlayWrapperTransitionDialogContentInput, {
      propsData: {
        ...defaultProps,
        inputValue: 'Hello world',
      },
    });

    const input = wrapper.find('input');
    expect(input.exists()).toBe(true);
    expect(input.element.value).toBe('Hello world');
  });

  it('emits an input value with the value of the input', () => {
    const wrapper = shallowMount(TDialogOverlayWrapperTransitionDialogContentInput, {
      propsData: {
        ...defaultProps,
      },
    });

    // assert event has been emitted
    expect(wrapper.emitted().input).toBeTruthy();

    // assert event count
    expect(wrapper.emitted().input.length).toBe(1);

    // assert event payload
    expect(wrapper.emitted().input[0]).toEqual(['']);
  });

  it('emits an input value with the initial value of the input', () => {
    const wrapper = shallowMount(TDialogOverlayWrapperTransitionDialogContentInput, {
      propsData: {
        ...defaultProps,
        inputValue: 'Hello world',
      },
    });

    // assert event has been emitted
    expect(wrapper.emitted().input).toBeTruthy();

    // assert event count
    expect(wrapper.emitted().input.length).toBe(1);

    // assert event payload
    expect(wrapper.emitted().input[0]).toEqual(['Hello world']);
  });

  it('emits an input events every when the user changes the text input value', async () => {
    const wrapper = shallowMount(TDialogOverlayWrapperTransitionDialogContentInput, {
      propsData: defaultProps,
    });

    const textInput = wrapper.find('input[type="text"]');

    await textInput.setValue('some value');

    // assert event has been emitted
    expect(wrapper.emitted().input).toBeTruthy();

    // assert event count
    expect(wrapper.emitted().input.length).toBe(2);

    // assert event payload
    expect(wrapper.emitted().input[1]).toEqual(['some value']);
  });

  it('render a select input of the type is select', () => {
    const wrapper = shallowMount(TDialogOverlayWrapperTransitionDialogContentInput, {
      propsData: {
        ...defaultProps,
        inputType: 'select',
      },
    });

    const input = wrapper.find('select');
    expect(input.exists()).toBe(true);
    expect(input.element.value).toBe('');
  });


  it('render a select input with options and the first option is selected', () => {
    const wrapper = shallowMount(TDialogOverlayWrapperTransitionDialogContentInput, {
      propsData: {
        ...defaultProps,
        inputType: 'select',
        inputOptions: ['A', 'B', 'C'],
      },
    });

    const input = wrapper.find('select');
    expect(input.exists()).toBe(true);
    expect(input.element.value).toBe('A');
    expect(input.findAll('option').length).toBe(3);
    expect(input.findAll('option').at(0).element.value).toBe('A');
    expect(input.findAll('option').at(1).element.value).toBe('B');
    expect(input.findAll('option').at(2).element.value).toBe('C');
  });

  it('selects the input value for a select component', () => {
    const wrapper = shallowMount(TDialogOverlayWrapperTransitionDialogContentInput, {
      propsData: {
        ...defaultProps,
        inputType: 'select',
        inputOptions: ['A', 'B', 'C'],
        inputValue: 'B',
      },
    });

    const input = wrapper.find('select');
    expect(input.exists()).toBe(true);
    expect(input.element.value).toBe('B');
  });

  it('selects the input value for a select component', () => {
    const wrapper = shallowMount(TDialogOverlayWrapperTransitionDialogContentInput, {
      propsData: {
        ...defaultProps,
        inputType: 'select',
        inputOptions: ['A', 'B', 'C'],
        inputValue: 'B',
      },
    });

    const input = wrapper.find('select');
    expect(input.exists()).toBe(true);
    expect(input.element.value).toBe('B');
  });

  it('emits an input value with the default value of the select', () => {
    const wrapper = shallowMount(TDialogOverlayWrapperTransitionDialogContentInput, {
      propsData: {
        ...defaultProps,
        inputType: 'select',
        inputOptions: ['A', 'B', 'C'],
      },
    });

    // assert event has been emitted
    expect(wrapper.emitted().input).toBeTruthy();

    // assert event count
    expect(wrapper.emitted().input.length).toBe(1);

    // assert event payload
    expect(wrapper.emitted().input[0]).toEqual(['A']);
  });

  it('emits an input value with the initial value of the select', () => {
    const wrapper = shallowMount(TDialogOverlayWrapperTransitionDialogContentInput, {
      propsData: {
        ...defaultProps,
        inputType: 'select',
        inputOptions: ['A', 'B', 'C'],
        inputValue: 'B',
      },
    });

    // assert event has been emitted
    expect(wrapper.emitted().input).toBeTruthy();

    // assert event count
    expect(wrapper.emitted().input.length).toBe(1);

    // assert event payload
    expect(wrapper.emitted().input[0]).toEqual(['B']);
  });

  it('emits an input events every when the user changes the select value', async () => {
    const wrapper = shallowMount(TDialogOverlayWrapperTransitionDialogContentInput, {
      propsData: {
        ...defaultProps,
        inputType: 'select',
        inputOptions: ['A', 'B', 'C'],
      },
    });

    const select = wrapper.find('select');

    await select.setValue('B');

    // assert event has been emitted
    expect(wrapper.emitted().input).toBeTruthy();

    // assert event count
    expect(wrapper.emitted().input.length).toBe(2);

    // assert event payload
    expect(wrapper.emitted().input[1]).toEqual(['B']);
  });

  it('render radio inputs if the type is radio', () => {
    const wrapper = shallowMount(TDialogOverlayWrapperTransitionDialogContentInput, {
      propsData: {
        ...defaultProps,
        inputType: 'radio',
        inputOptions: ['A', 'B', 'C'],
      },
    });

    const radios = wrapper.findAll('input[type="radio"]');
    expect(radios.length).toBe(3);
    expect(radios.at(0).element.value).toBe('A');
    expect(radios.at(1).element.value).toBe('B');
    expect(radios.at(2).element.value).toBe('C');
  });

  it('emits an input value with the default value of the radio', () => {
    const wrapper = shallowMount(TDialogOverlayWrapperTransitionDialogContentInput, {
      propsData: {
        ...defaultProps,
        inputType: 'radio',
        inputOptions: ['A', 'B', 'C'],
      },
    });

    // assert event has been emitted
    expect(wrapper.emitted().input).toBeTruthy();

    // assert event count
    expect(wrapper.emitted().input.length).toBe(1);

    // assert event payload
    expect(wrapper.emitted().input[0]).toEqual([null]);
  });

  it('emits an input value with the initial value of the radio', () => {
    const wrapper = shallowMount(TDialogOverlayWrapperTransitionDialogContentInput, {
      propsData: {
        ...defaultProps,
        inputType: 'radio',
        inputOptions: ['A', 'B', 'C'],
        inputValue: 'B',
      },
    });

    // assert event has been emitted
    expect(wrapper.emitted().input).toBeTruthy();

    // assert event count
    expect(wrapper.emitted().input.length).toBe(1);

    // assert event payload
    expect(wrapper.emitted().input[0]).toEqual(['B']);
  });

  it('emits an input events every when the user changes the radio value', async () => {
    const wrapper = shallowMount(TDialogOverlayWrapperTransitionDialogContentInput, {
      propsData: {
        ...defaultProps,
        inputType: 'radio',
        inputOptions: ['A', 'B', 'C'],
      },
    });

    const radios = wrapper.findAll('input[type="radio"]');

    const b = radios.at(1);

    b.element.checked = true;
    b.trigger('click');
    b.trigger('change');

    expect(b.element.checked).toBeTruthy();

    // assert event has been emitted
    expect(wrapper.emitted().input).toBeTruthy();

    // assert event count
    expect(wrapper.emitted().input.length).toBe(2);

    // assert event payload
    expect(wrapper.emitted().input[1]).toEqual(['B']);
  });

  it('render a single checkbox inputs if the type is checkbox', () => {
    const wrapper = shallowMount(TDialogOverlayWrapperTransitionDialogContentInput, {
      propsData: {
        ...defaultProps,
        inputType: 'checkbox',
        inputPlaceholder: 'Accept terms and conditions',
      },
    });

    const input = wrapper.find('input[type="checkbox"]');
    const label = wrapper.find('label');
    expect(input.element.name).toBe('input');
    expect(input.element.value).toBe('on');
    expect(label.text()).toBe('Accept terms and conditions');
  });

  it('emits an input value with the initial value of the checkbox', () => {
    const wrapper = shallowMount(TDialogOverlayWrapperTransitionDialogContentInput, {
      propsData: {
        ...defaultProps,
        inputType: 'checkbox',
        inputValue: 'A',
      },
    });

    // assert event has been emitted
    expect(wrapper.emitted().input).toBeTruthy();

    // assert event count
    expect(wrapper.emitted().input.length).toBe(1);

    // assert event payload
    expect(wrapper.emitted().input[0]).toEqual([null]);
  });

  it('emits an input value with the checkbox value when is chexkec', () => {
    const wrapper = shallowMount(TDialogOverlayWrapperTransitionDialogContentInput, {
      propsData: {
        ...defaultProps,
        inputType: 'checkbox',
        inputValue: 'A',
      },
    });

    const input = wrapper.find('input[type="checkbox"]');

    input.setChecked();

    // assert event has been emitted
    expect(wrapper.emitted().input).toBeTruthy();

    // assert event count
    expect(wrapper.emitted().input.length).toBe(2);

    // assert event payload
    expect(wrapper.emitted().input[1]).toEqual(['A']);
  });


  it('render multiple checkbox inputs if the type is checkbox and has options', () => {
    const wrapper = shallowMount(TDialogOverlayWrapperTransitionDialogContentInput, {
      propsData: {
        ...defaultProps,
        inputType: 'checkbox',
        inputOptions: ['A', 'B', 'C'],
      },
    });

    const chexkboxes = wrapper.findAll('input[type="checkbox"]');
    expect(chexkboxes.length).toBe(3);
    expect(chexkboxes.at(0).element.value).toBe('A');
    expect(chexkboxes.at(1).element.value).toBe('B');
    expect(chexkboxes.at(2).element.value).toBe('C');
  });

  it('emits an input value with the initial value of the multiple checkboxs', () => {
    const wrapper = shallowMount(TDialogOverlayWrapperTransitionDialogContentInput, {
      propsData: {
        ...defaultProps,
        inputType: 'checkbox',
        inputOptions: ['A', 'B', 'C'],
      },
    });

    // assert event has been emitted
    expect(wrapper.emitted().input).toBeTruthy();

    // assert event count
    expect(wrapper.emitted().input.length).toBe(1);

    // assert event payload
    expect(wrapper.emitted().input[0]).toEqual([[]]);
  });

  it('emits an input value with the all the selected checkboxes', async () => {
    const wrapper = shallowMount(TDialogOverlayWrapperTransitionDialogContentInput, {
      propsData: {
        ...defaultProps,
        inputType: 'checkbox',
        inputOptions: ['A', 'B', 'C'],
      },
    });

    const checkboxes = wrapper.findAll('input[type="checkbox"]');

    const a = checkboxes.at(0);
    a.setChecked();

    const b = checkboxes.at(2);
    b.setChecked();

    // await checkboxes.at(2).setChecked();

    // assert event has been emitted
    expect(wrapper.emitted().input).toBeTruthy();

    // assert event count
    expect(wrapper.emitted().input.length).toBe(3);

    // assert event payload
    expect(wrapper.emitted().input[1]).toEqual([['A']]);
    expect(wrapper.emitted().input[2]).toEqual([['A', 'C']]);
  });

  it('select the checboxes according to the input value', async () => {
    const wrapper = shallowMount(TDialogOverlayWrapperTransitionDialogContentInput, {
      propsData: {
        ...defaultProps,
        inputType: 'checkbox',
        inputOptions: ['A', 'B', 'C'],
        inputValue: ['B', 'C'],
      },
    });

    const checkboxes = wrapper.findAll('input[type="checkbox"]');

    expect(checkboxes.length).toBe(3);
    expect(checkboxes.at(0).element.value).toBe('A');
    expect(checkboxes.at(0).element.checked).toBe(false);
    expect(checkboxes.at(1).element.value).toBe('B');
    expect(checkboxes.at(1).element.checked).toBe(true);
    expect(checkboxes.at(2).element.value).toBe('C');
    expect(checkboxes.at(2).element.checked).toBe(true);
  });
});
