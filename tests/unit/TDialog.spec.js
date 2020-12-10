
import Vue from 'vue';
import { shallowMount, mount } from '@vue/test-utils';
import configureDialogGlobals from '../../src/utils/configureDialogGlobals';
import TDialog from '../../src/components/TDialog';
import TDialogOverlayWrapperTransitionDialogContent from '../../src/components/TDialog/TDialogOverlayWrapperTransitionDialogContent';
import TDialogOverlayWrapperTransitionDialogContentInput from '../../src/components/TDialog/TDialogOverlayWrapperTransitionDialogContentInput';
import TDialogOverlayWrapperTransitionDialogButtons from '../../src/components/TDialog/TDialogOverlayWrapperTransitionDialogButtons';
import TDialogOverlayWrapperTransitionDialogClose from '../../src/components/TDialog/TDialogOverlayWrapperTransitionDialogClose';
import TDialogOverlayWrapperTransitionDialog from '../../src/components/TDialog/TDialogOverlayWrapperTransitionDialog';
import { DialogType } from '../../src/types/Dialog';

describe('configureDialogGlobals', () => {
  configureDialogGlobals(Vue, {});

  it('opens the the dialog with the global method', () => {
    jest.spyOn(document.body, 'appendChild');

    Vue.prototype.$dialog.alert();

    expect(document.body.appendChild).toBeCalled();
  });

  it('opens the the dialog with the alert method', () => {
    jest.spyOn(document.body, 'appendChild');

    Vue.prototype.$alert();

    expect(document.body.appendChild).toBeCalled();
  });

  it('opens the the dialog with the prompt method', () => {
    jest.spyOn(document.body, 'appendChild');

    Vue.prototype.$prompt();

    expect(document.body.appendChild).toBeCalled();
  });

  it('opens the the dialog with the confirm method', () => {
    jest.spyOn(document.body, 'appendChild');

    Vue.prototype.$confirm();

    expect(document.body.appendChild).toBeCalled();
  });
});

describe('TDialog', () => {
  it('show the dialog with his respective events', async () => {
    const wrapper = mount(TDialog);

    wrapper.vm.show();

    expect(wrapper.emitted()['before-open']).toBeTruthy();

    // assert event count
    expect(wrapper.emitted()['before-open'].length).toBe(1);

    // Show the overlay
    await wrapper.vm.$nextTick();

    expect(wrapper.emitted().input).toBeTruthy();

    // assert event count
    expect(wrapper.emitted().input.length).toBe(1);

    // Show the dialog
    await wrapper.vm.$nextTick();

    expect(wrapper.emitted().opened).toBeTruthy();

    // assert event count
    expect(wrapper.emitted().opened.length).toBe(1);
  });

  it('hides the dialog with his respective events', async () => {
    const wrapper = mount(TDialog);

    wrapper.vm.show();

    // Show the overlay
    await wrapper.vm.$nextTick();
    // Show the dialog
    await wrapper.vm.$nextTick();

    wrapper.vm.close();

    expect(wrapper.emitted()['before-close']).toBeTruthy();

    // assert event count
    expect(wrapper.emitted()['before-close'].length).toBe(1);


    expect(wrapper.emitted().input).toBeTruthy();

    // assert event count
    expect(wrapper.emitted().input.length).toBe(1);

    // hide the overlay & then the dialog
    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();

    expect(wrapper.emitted().closed).toBeTruthy();

    // assert event count
    expect(wrapper.emitted().closed.length).toBe(1);
  });

  it('the submit method set hideReason as ok', async () => {
    const wrapper = mount(TDialog);

    wrapper.vm.show();
    // Show the overlay
    await wrapper.vm.$nextTick();
    // Show the dialog
    await wrapper.vm.$nextTick();

    wrapper.vm.submit(new MouseEvent({}));

    expect(wrapper.vm.hideReason).toBe('ok');
  });
  it('the cancel method set hideReason as cancel', async () => {
    const wrapper = mount(TDialog);

    wrapper.vm.show();
    // Show the overlay
    await wrapper.vm.$nextTick();
    // Show the dialog
    await wrapper.vm.$nextTick();

    wrapper.vm.cancel(new MouseEvent({}));

    expect(wrapper.vm.hideReason).toBe('cancel');
  });
  it('the outsideClick method set hideReason as outside', async () => {
    const wrapper = mount(TDialog);

    wrapper.vm.show();
    // Show the overlay
    await wrapper.vm.$nextTick();
    // Show the dialog
    await wrapper.vm.$nextTick();

    wrapper.vm.outsideClick(new MouseEvent({}));

    expect(wrapper.vm.hideReason).toBe('outside');
  });

  it('the esc method set hideReason as esc', async () => {
    const wrapper = mount(TDialog);

    wrapper.vm.show();
    // Show the overlay
    await wrapper.vm.$nextTick();
    // Show the dialog
    await wrapper.vm.$nextTick();

    wrapper.vm.esc(new MouseEvent({}));

    expect(wrapper.vm.hideReason).toBe('esc');
  });

  it('the before close event includes the reason of closing', async () => {
    const wrapper = mount(TDialog);

    wrapper.vm.show();

    // Show the overlay
    await wrapper.vm.$nextTick();
    // Show the dialog
    await wrapper.vm.$nextTick();

    const event = new MouseEvent({});
    wrapper.vm.cancel(event);

    expect(wrapper.emitted()['before-close']).toBeTruthy();

    // assert event count
    expect(wrapper.emitted()['before-close'].length).toBe(1);

    expect(wrapper.emitted('before-close')[0]).toEqual([{
      cancel: wrapper.vm.closeCancel,
      event,
      reason: 'cancel',
    }]);
  });

  it('when closed method is called it resolve the promise', async () => {
    const wrapper = mount(TDialog);

    wrapper.vm.show();

    wrapper.vm.hideReason = 'close';

    const promise = new Promise((resolve) => {
      wrapper.vm.resolve = resolve;
    });

    promise.then((response) => {
      expect(response).toEqual({
        hideReason: 'close',
        isCancel: false,
        isDismissed: true,
        isOk: false,
      });
    });

    wrapper.vm.closed();
  });

  it('when closed and reason is ok is ok then is true', async () => {
    const wrapper = mount(TDialog);

    wrapper.vm.show();

    wrapper.vm.hideReason = 'ok';

    const promise = new Promise((resolve) => {
      wrapper.vm.resolve = resolve;
    });

    promise.then((response) => {
      expect(response).toEqual({
        hideReason: 'ok',
        isCancel: false,
        isDismissed: false,
        isOk: true,
      });
    });

    wrapper.vm.closed();
  });

  it('when closed and reason is cancel isCancel then is true', async () => {
    const wrapper = mount(TDialog);

    wrapper.vm.show();

    wrapper.vm.hideReason = 'cancel';

    const promise = new Promise((resolve) => {
      wrapper.vm.resolve = resolve;
    });

    promise.then((response) => {
      expect(response).toEqual({
        hideReason: 'cancel',
        isCancel: true,
        isDismissed: false,
        isOk: false,
      });
    });

    wrapper.vm.closed();
  });

  it('when a prompt is closed the input is in the response', async () => {
    const wrapper = mount(TDialog, {
      propsData: {
        type: 'prompt',
      },
    });

    wrapper.vm.show();

    wrapper.vm.hideReason = 'ok';

    wrapper.vm.input = 'Hey you!';

    const promise = new Promise((resolve, reject) => {
      wrapper.vm.resolve = resolve;
      wrapper.vm.reject = reject;
    });

    promise.then((response) => {
      expect(response).toEqual({
        hideReason: 'ok',
        isCancel: false,
        isDismissed: false,
        isOk: true,
        input: 'Hey you!',
      });
    });

    wrapper.vm.closed();
  });

  it('the dialog can be opened by name', async () => {
    const wrapper = mount(TDialog, {
      propsData: { name: 'dialog-name' },
    });

    // called from the bus but can be called from every
    wrapper.vm.$dialog.show('dialog-name');

    await wrapper.vm.$nextTick();

    expect(wrapper.get('div')).toBeTruthy();
  });

  it('the dialog can be closed by name', async () => {
    const wrapper = mount(TDialog, {
      propsData: { name: 'dialog-name', initShow: true },
    });

    wrapper.vm.$dialog.show('dialog-name');

    await wrapper.vm.$nextTick();

    // // called from the dialog but can be called from everywhere
    wrapper.vm.$dialog.hide('dialog-name');
    expect(wrapper.vm.dialogShow).toBe(false);
  });
});

describe('TDialogOverlayWrapperTransitionDialog', () => {
  const defaultProps = {
    getElementCssClass: () => '',
    dialogShow: true,
    titleTag: 'h3',
    textTag: 'p',
    type: DialogType.Alert,
    inputType: 'text',
    cancelButtonText: 'Cancel',
    okButtonText: 'Ok',
    showCloseButton: false,
  };

  it('creates the error message if has an input validator an is invalid', async () => {
    const inputValidator = (value) => {
      if (value === 'invalid value') {
        return 'invalid!';
      }
    };

    const wrapper = shallowMount(TDialogOverlayWrapperTransitionDialog, {
      propsData: {
        ...defaultProps,
        inputValidator,
      },
    });

    wrapper.vm.inputHandler('invalid value');

    await wrapper.vm.submitHandler(new MouseEvent({}));

    expect(wrapper.vm.errorMessage).toBe('invalid!');

    // assert event has been emitted
    expect(wrapper.emitted().submit).toBeFalsy();
  });


  it('if has an input validator an the value is valid it emits the submit event', async () => {
    const inputValidator = (value) => {
      if (value !== 'valid value') {
        return 'invalid!';
      }
    };

    const wrapper = shallowMount(TDialogOverlayWrapperTransitionDialog, {
      propsData: {
        ...defaultProps,
        inputValidator,
      },
    });

    wrapper.vm.inputHandler('valid value');

    await wrapper.vm.submitHandler(new MouseEvent({}));

    expect(wrapper.vm.errorMessage).toBe('');

    // assert event has been emitted
    expect(wrapper.emitted().submit).toBeTruthy();
  });

  it('clears the error message on input', () => {
    const inputValidator = (value) => {
      if (value === 'invalid value') {
        return 'invalid!';
      }
    };

    const wrapper = shallowMount(TDialogOverlayWrapperTransitionDialog, {
      propsData: {
        ...defaultProps,
        inputValidator,
      },
    });

    wrapper.vm.errorMessage = 'invalid!';

    wrapper.vm.inputHandler('wharever');

    expect(wrapper.vm.errorMessage).toBe('');
  });

  it('handle input validator that returns a rejected promise', async () => {
    const inputValidator = () => new Promise((_resolve, reject) => {
      reject('invalid!');
    });

    const wrapper = shallowMount(TDialogOverlayWrapperTransitionDialog, {
      propsData: {
        ...defaultProps,
        inputValidator,
      },
    });

    await wrapper.vm.submitHandler(new MouseEvent({}));

    expect(wrapper.vm.errorMessage).toBe('invalid!');

    // assert event has been emitted
    expect(wrapper.emitted().submit).toBeFalsy();
  });

  it('handle input validator that returns a resolved promise with an string', async () => {
    const inputValidator = () => new Promise((resolve) => {
      resolve('invalid!');
    });

    const wrapper = shallowMount(TDialogOverlayWrapperTransitionDialog, {
      propsData: {
        ...defaultProps,
        inputValidator,
      },
    });

    await wrapper.vm.submitHandler(new MouseEvent({}));

    expect(wrapper.vm.errorMessage).toBe('invalid!');

    // assert event has been emitted
    expect(wrapper.emitted().submit).toBeFalsy();
  });

  it('handle input validator that returns a resolved promise', async () => {
    const inputValidator = (value) => new Promise((resolve, reject) => {
      if (value === 'invalid value') {
        reject('invalid!');
      }

      resolve();
    });

    const wrapper = shallowMount(TDialogOverlayWrapperTransitionDialog, {
      propsData: {
        ...defaultProps,
        inputValidator,
      },
    });

    wrapper.vm.inputHandler('valid value');

    await wrapper.vm.submitHandler(new MouseEvent({}));

    expect(wrapper.vm.errorMessage).toBe('');

    // assert event has been emitted
    expect(wrapper.emitted().submit).toBeTruthy();
  });

  it('just emits the submit event if no input validator', async () => {
    const wrapper = shallowMount(TDialogOverlayWrapperTransitionDialog, {
      propsData: defaultProps,
    });

    wrapper.vm.inputHandler('xs value');

    await wrapper.vm.submitHandler(new MouseEvent({}));

    expect(wrapper.vm.errorMessage).toBe('');

    // assert event has been emitted
    expect(wrapper.emitted().submit).toBeTruthy();
  });

  it('handle preconfirm function before submit', async () => {
    const preConfirm = () => new Promise((resolve) => {
      resolve();
    });

    const wrapper = shallowMount(TDialogOverlayWrapperTransitionDialog, {
      propsData: {
        ...defaultProps,
        preConfirm,
      },
    });

    await wrapper.vm.submitHandler(new MouseEvent({}));

    expect(wrapper.vm.errorMessage).toBe('');

    // assert event has been emitted
    expect(wrapper.emitted().submit).toBeTruthy();
  });

  it('handle a rejected promise in preconfirm', async () => {
    const error = new Error('Something goes wrong!');
    const preConfirm = () => new Promise((resolve, reject) => {
      reject(error);
    });

    const wrapper = shallowMount(TDialogOverlayWrapperTransitionDialog, {
      propsData: {
        ...defaultProps,
        preConfirm,
      },
    });

    try {
      await wrapper.vm.submitHandler(new MouseEvent({}));
    } catch (e) {
      expect(e).toEqual(error);
    }

    // assert event has been emitted
    expect(wrapper.emitted().submit).toBeFalsy();
  });


  it('handle a resolved promise data in preconfirm', async () => {
    const preConfirm = () => new Promise((resolve) => {
      resolve({
        data: ['a', 'b', 'c'],
      });
    });

    const wrapper = shallowMount(TDialogOverlayWrapperTransitionDialog, {
      propsData: {
        ...defaultProps,
        preConfirm,
      },
    });

    await wrapper.vm.submitHandler(new MouseEvent({}));

    expect(wrapper.vm.errorMessage).toBe('');

    // assert event has been emitted
    expect(wrapper.emitted().submit).toBeTruthy();

    expect(wrapper.emitted().submit[0][2]).toEqual({
      data: ['a', 'b', 'c'],
    });
  });
});


describe('TDialogOverlayWrapperTransitionDialogButtons', () => {
  const defaultProps = {
    getElementCssClass: () => '',
    cancelButtonText: 'Cancel',
    okButtonText: 'Ok',
    type: 'alert',
  };

  it('for the alert dialog only shows the ok button', async () => {
    const wrapper = shallowMount(TDialogOverlayWrapperTransitionDialogButtons, {
      propsData: defaultProps,
    });

    const buttons = wrapper.findAll('button');
    expect(buttons.length).toBe(1);
    expect(buttons.at(0).text()).toBe('Ok');
  });

  it('for the confirm dialog only shows the ok and cancel button', async () => {
    const wrapper = shallowMount(TDialogOverlayWrapperTransitionDialogButtons, {
      propsData: {
        ...defaultProps,
        type: 'confirm',
      },
    });

    const buttons = wrapper.findAll('button');
    expect(buttons.length).toBe(2);
    expect(buttons.at(0).text()).toBe('Cancel');
    expect(buttons.at(1).text()).toBe('Ok');
  });

  it('for the prompt dialog only shows the ok and cancel button', async () => {
    const wrapper = shallowMount(TDialogOverlayWrapperTransitionDialogButtons, {
      propsData: {
        ...defaultProps,
        type: 'confirm',
      },
    });

    const buttons = wrapper.findAll('button');
    expect(buttons.length).toBe(2);
    expect(buttons.at(0).text()).toBe('Cancel');
    expect(buttons.at(1).text()).toBe('Ok');
  });

  it('the ok button creates a submit event ', async () => {
    const wrapper = shallowMount(TDialogOverlayWrapperTransitionDialogButtons, {
      propsData: {
        ...defaultProps,
        type: 'alert',
      },
    });

    const button = wrapper.find('button');
    button.trigger('click');

    expect(wrapper.emitted().submit).toBeTruthy();

    // assert event count
    expect(wrapper.emitted().submit.length).toBe(1);
  });

  it('the ok button creates a submit event ', async () => {
    const wrapper = shallowMount(TDialogOverlayWrapperTransitionDialogButtons, {
      propsData: {
        ...defaultProps,
        type: 'confirm',
      },
    });

    const button = wrapper.find('button');
    button.trigger('click');

    expect(wrapper.emitted().cancel).toBeTruthy();

    // assert event count
    expect(wrapper.emitted().cancel.length).toBe(1);
  });
});

describe('TDialogOverlayWrapperTransitionDialogClose', () => {
  const defaultProps = {
    getElementCssClass: () => '',
    showCloseButton: true,
  };

  it('shows the close button if showCloseButton set', async () => {
    const wrapper = shallowMount(TDialogOverlayWrapperTransitionDialogClose, {
      propsData: {
        ...defaultProps,
        showCloseButton: true,
      },
    });

    const button = wrapper.find('button');
    expect(button.exists()).toBe(true);
  });

  it('doesnt shows the close button if showCloseButton set', async () => {
    const wrapper = shallowMount(TDialogOverlayWrapperTransitionDialogClose, {
      propsData: {
        ...defaultProps,
        showCloseButton: false,
      },
    });

    const button = wrapper.find('button');
    expect(button.exists()).toBe(false);
  });

  it('the close button emits a dismiss event', async () => {
    const wrapper = shallowMount(TDialogOverlayWrapperTransitionDialogClose, {
      propsData: {
        ...defaultProps,
        showCloseButton: true,
      },
    });

    const button = wrapper.find('button');

    button.trigger('click');

    expect(wrapper.emitted().dismiss).toBeTruthy();

    // assert event count
    expect(wrapper.emitted().dismiss.length).toBe(1);
  });
});

describe('TDialogOverlayWrapperTransitionDialogContent', () => {
  const defaultProps = {
    getElementCssClass: () => '',
    titleTag: 'h3',
    textTag: 'p',
    type: 'prompt',
    inputType: 'text',
    errorMessage: '',
  };

  it('renders without errors', () => {
    const wrapper = shallowMount(TDialogOverlayWrapperTransitionDialogContent, {
      propsData: defaultProps,
    });

    expect(wrapper.html()).toBeTruthy();
  });

  it('shows an error message if has error message', () => {
    const wrapper = shallowMount(TDialogOverlayWrapperTransitionDialogContent, {
      propsData: {
        ...defaultProps,
        errorMessage: 'Something goes wrong!',
      },
    });

    expect(wrapper.html()).toContain('Something goes wrong!');
  });
});

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
