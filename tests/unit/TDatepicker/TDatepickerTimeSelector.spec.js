import { shallowMount, mount } from '@vue/test-utils';

import TDatepicker from '../../../src/components/TDatepicker';
import TDatepickerTimeSelector from '../../../src/components/TDatepicker/TDatepickerTimeSelector';

describe('TDatepickerTimeSelector', () => {
  const datePicker = shallowMount(TDatepicker);

  const defaultProps = {
    parse: datePicker.vm.parse,
    format: datePicker.vm.format,
    amPm: datePicker.vm.amPm,
    showSeconds: datePicker.vm.showSeconds,
    activeDate: datePicker.vm.activeDate,
    locale: datePicker.vm.locale,
    getElementCssClass: datePicker.vm.getElementCssClass,
  };

  it('renders the component withouth errors', () => {
    const wrapper = shallowMount(TDatepickerTimeSelector, {
      propsData: defaultProps,
    });

    expect(wrapper.get('div')).toBeTruthy();
  });

  it('sets the initial data', () => {
    const initialDate = new Date(1987, 1, 18, 11, 22, 35);
    const wrapper = shallowMount(TDatepickerTimeSelector, {
      propsData: {
        ...defaultProps,
        // Wed Feb 18 1987 11:22:35
        activeDate: new Date(1987, 1, 18, 11, 22, 35),
      },
    });

    expect(wrapper.vm.localActiveDate).toEqual(initialDate);
    expect(wrapper.vm.alreadyTriedAnInvalidValue).toBe(false);
    expect(wrapper.vm.lastValidValue).toBe('');
    expect(wrapper.vm.timeInputKeys).toEqual([]);
  });

  it('has a minutes and hours inputs', () => {
    const wrapper = shallowMount(TDatepickerTimeSelector, {
      propsData: defaultProps,
    });

    expect(wrapper.vm.$refs.hours).toBeTruthy();
    expect(wrapper.vm.$refs.minutes).toBeTruthy();
  });

  it('has a wrapper div that is tabbable', () => {
    const wrapper = shallowMount(TDatepickerTimeSelector, {
      propsData: defaultProps,
    });

    const { timeInput } = wrapper.vm.$refs;
    expect(timeInput).toBeTruthy();
    expect(timeInput.tagName).toBe('DIV');
    expect(timeInput.getAttribute('tabindex')).toBe('0');
  });

  it('has two text input (hours/minutes) inside the timeInput wrapper ', () => {
    const wrapper = shallowMount(TDatepickerTimeSelector, {
      propsData: defaultProps,
    });

    const { timeInput } = wrapper.vm.$refs;
    expect(timeInput.getElementsByTagName('input').length).toBe(2);
  });

  it('fills the input when typing while the timeInput wrapper is focused', async () => {
    const wrapper = shallowMount(TDatepickerTimeSelector, {
      propsData: defaultProps,
    });

    const { minutes, hours } = wrapper.vm.$refs;

    const { timeInput } = wrapper.vm.$refs;

    await timeInput.dispatchEvent(new KeyboardEvent('keydown', { key: '1' }));
    expect(minutes.value).toBe('1');
    expect(hours.value).toBe('');

    await timeInput.dispatchEvent(new KeyboardEvent('keydown', { key: '2' }));
    expect(minutes.value).toBe('12');
    expect(hours.value).toBe('');

    await timeInput.dispatchEvent(new KeyboardEvent('keydown', { key: '3' }));
    expect(minutes.value).toBe('23');
    expect(hours.value).toBe('1');

    await timeInput.dispatchEvent(new KeyboardEvent('keydown', { key: '5' }));
    expect(minutes.value).toBe('35');
    expect(hours.value).toBe('12');

    await timeInput.dispatchEvent(new KeyboardEvent('keydown', { key: '2' }));
    expect(minutes.value).toBe('52');
    expect(hours.value).toBe('23');
  });

  it('will pass the focus from the timeInput wrapper to the submit button when has user input', async () => {
    const wrapper = shallowMount(TDatepickerTimeSelector, {
      propsData: defaultProps,
    });

    const { timeInput, okButton } = wrapper.vm.$refs;

    okButton.focus = jest.fn();

    await timeInput.focus();

    await timeInput.dispatchEvent(new KeyboardEvent('keydown', { key: '1' }));

    await timeInput.blur();

    expect(okButton.focus.mock.calls.length).toBe(1);
  });

  it('will not pass the focus from the timeInput wrapper to the submit button if no user input', async () => {
    const wrapper = shallowMount(TDatepickerTimeSelector, {
      propsData: defaultProps,
    });

    const { timeInput, okButton } = wrapper.vm.$refs;

    okButton.focus = jest.fn();

    await timeInput.focus();

    await timeInput.blur();

    expect(okButton.focus.mock.calls.length).toBe(0);
  });

  it('clears the last value when hit backspace on the time wrapper', async () => {
    const wrapper = shallowMount(TDatepickerTimeSelector, {
      propsData: defaultProps,
    });

    const { minutes, hours } = wrapper.vm.$refs;

    const { timeInput } = wrapper.vm.$refs;

    await timeInput.dispatchEvent(new KeyboardEvent('keydown', { key: '1' }));
    expect(hours.value).toBe('');
    expect(minutes.value).toBe('1');

    await timeInput.dispatchEvent(new KeyboardEvent('keydown', { key: 'Backspace' }));
    expect(hours.value).toBe('');
    expect(minutes.value).toBe('');

    await timeInput.dispatchEvent(new KeyboardEvent('keydown', { key: '1' }));
    await timeInput.dispatchEvent(new KeyboardEvent('keydown', { key: '2' }));
    await timeInput.dispatchEvent(new KeyboardEvent('keydown', { key: '3' }));
    await timeInput.dispatchEvent(new KeyboardEvent('keydown', { key: '5' }));
    expect(hours.value).toBe('12');
    expect(minutes.value).toBe('35');

    await timeInput.dispatchEvent(new KeyboardEvent('keydown', { key: 'Backspace' }));
    expect(hours.value).toBe('1');
    expect(minutes.value).toBe('23');
  });

  it('blur when pressed enter the time wrapper', async () => {
    const wrapper = shallowMount(TDatepickerTimeSelector, {
      propsData: defaultProps,
    });

    const { timeInput, okButton } = wrapper.vm.$refs;

    okButton.focus = jest.fn();

    await timeInput.focus();

    await timeInput.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));

    expect(okButton.focus.mock.calls.length).toBe(1);
  });

  describe('uses am/pm format', () => {
    const propsData = {
      ...defaultProps,
      amPm: true,
    };

    it('adds a am/pm toggler', () => {
      const wrapper = shallowMount(TDatepickerTimeSelector, {
        propsData,
      });

      expect(wrapper.vm.$refs.amPm).toBeTruthy();
    });


    it('will pass the focus from the timeInput wrapper to the am/pm toggle when has user input', async () => {
      const wrapper = shallowMount(TDatepickerTimeSelector, {
        propsData,
      });

      const { timeInput, amPm } = wrapper.vm.$refs;

      amPm.focus = jest.fn();

      await timeInput.focus();

      await timeInput.dispatchEvent(new KeyboardEvent('keydown', { key: '1' }));

      await timeInput.blur();

      expect(amPm.focus.mock.calls.length).toBe(1);
    });

    it('will pass the focus from the am/pm toggle to the submit button when enter pressed', async () => {
      const wrapper = shallowMount(TDatepickerTimeSelector, {
        propsData,
      });

      const { amPm, okButton } = wrapper.vm.$refs;

      okButton.focus = jest.fn();

      await amPm.$emit('keydown', new KeyboardEvent('keydown', { key: 'Enter' }));

      expect(okButton.focus.mock.calls.length).toBe(1);
    });

    it('will convert 24 hours date to am/pm if hours > 12 hours', async () => {
      const wrapper = mount(TDatepickerTimeSelector, {
        propsData: {
          ...propsData,
          activeDate: new Date(1987, 1, 18, 10, 0, 0),
        },
      });

      const {
        timeInput, hours, minutes, amPm,
      } = wrapper.vm.$refs;

      expect(amPm.currentValue).toBe('AM');

      await timeInput.dispatchEvent(new KeyboardEvent('keydown', { key: '1' }));
      await timeInput.dispatchEvent(new KeyboardEvent('keydown', { key: '3' }));
      await timeInput.dispatchEvent(new KeyboardEvent('keydown', { key: '0' }));
      await timeInput.dispatchEvent(new KeyboardEvent('keydown', { key: '5' }));

      expect(minutes.value).toBe('05');
      expect(hours.value).toBe('13');

      await timeInput.dispatchEvent(new FocusEvent('blur'));

      expect(minutes.value).toBe('05');
      expect(hours.value).toBe('01');
      expect(amPm.currentValue).toBe('PM');
    });

    it('will keep 12 hours if hours < 12 hours', async () => {
      const wrapper = mount(TDatepickerTimeSelector, {
        propsData: {
          ...propsData,
          activeDate: new Date(1987, 1, 18, 10, 0, 0),
        },
      });

      const {
        timeInput, hours, minutes, amPm,
      } = wrapper.vm.$refs;

      expect(amPm.currentValue).toBe('AM');

      await timeInput.dispatchEvent(new KeyboardEvent('keydown', { key: '1' }));
      await timeInput.dispatchEvent(new KeyboardEvent('keydown', { key: '1' }));
      await timeInput.dispatchEvent(new KeyboardEvent('keydown', { key: '0' }));
      await timeInput.dispatchEvent(new KeyboardEvent('keydown', { key: '5' }));

      expect(minutes.value).toBe('05');
      expect(hours.value).toBe('11');

      await timeInput.dispatchEvent(new FocusEvent('blur'));

      expect(minutes.value).toBe('05');
      expect(hours.value).toBe('11');
      expect(amPm.currentValue).toBe('AM');
    });
  });

  describe('uses 24 hours format', () => {
    const propsData = {
      ...defaultProps,
      amPm: false,
    };

    it('doest adds a am/pm toggler', () => {
      const wrapper = shallowMount(TDatepickerTimeSelector, {
        propsData,
      });

      expect(wrapper.vm.$refs.amPm).toBeFalsy();
    });

    it('will keep 24 hours format for hours > 12', async () => {
      const wrapper = mount(TDatepickerTimeSelector, {
        propsData: {
          ...propsData,
          activeDate: new Date(1987, 1, 18, 10, 0, 0),
        },
      });
      const {
        timeInput, hours, minutes,
      } = wrapper.vm.$refs;

      await timeInput.dispatchEvent(new KeyboardEvent('keydown', { key: '1' }));
      await timeInput.dispatchEvent(new KeyboardEvent('keydown', { key: '3' }));
      await timeInput.dispatchEvent(new KeyboardEvent('keydown', { key: '0' }));
      await timeInput.dispatchEvent(new KeyboardEvent('keydown', { key: '5' }));
      expect(minutes.value).toBe('05');
      expect(hours.value).toBe('13');

      await timeInput.dispatchEvent(new FocusEvent('blur'));

      expect(minutes.value).toBe('05');
      expect(hours.value).toBe('13');
    });

    it('will keep 24 hours format for hours < 12 hours', async () => {
      const wrapper = mount(TDatepickerTimeSelector, {
        propsData: {
          ...propsData,
          activeDate: new Date(1987, 1, 18, 10, 0, 0),
        },
      });

      const {
        timeInput, hours, minutes,
      } = wrapper.vm.$refs;

      await timeInput.dispatchEvent(new KeyboardEvent('keydown', { key: '1' }));
      await timeInput.dispatchEvent(new KeyboardEvent('keydown', { key: '1' }));
      await timeInput.dispatchEvent(new KeyboardEvent('keydown', { key: '0' }));
      await timeInput.dispatchEvent(new KeyboardEvent('keydown', { key: '5' }));

      expect(minutes.value).toBe('05');
      expect(hours.value).toBe('11');

      await timeInput.dispatchEvent(new FocusEvent('blur'));

      expect(minutes.value).toBe('05');
      expect(hours.value).toBe('11');
    });
  });

  describe('show seconds', () => {
    const propsData = {
      ...defaultProps,
      showSeconds: true,
    };

    it('has a seconds input', () => {
      const wrapper = shallowMount(TDatepickerTimeSelector, {
        propsData,
      });

      expect(wrapper.vm.$refs.seconds).toBeTruthy();
    });

    it('fills the input starting by seconds when typing while the timeInput wrapper is focused', async () => {
      const wrapper = shallowMount(TDatepickerTimeSelector, {
        propsData,
      });

      const { minutes, hours, seconds } = wrapper.vm.$refs;

      const { timeInput } = wrapper.vm.$refs;

      await timeInput.dispatchEvent(new KeyboardEvent('keydown', { key: '1' }));
      expect(seconds.value).toBe('1');
      expect(minutes.value).toBe('');

      expect(hours.value).toBe('');
      await timeInput.dispatchEvent(new KeyboardEvent('keydown', { key: '2' }));
      expect(seconds.value).toBe('12');
      expect(minutes.value).toBe('');
      expect(hours.value).toBe('');
      expect(hours.value).toBe('');

      await timeInput.dispatchEvent(new KeyboardEvent('keydown', { key: '3' }));
      expect(seconds.value).toBe('23');
      expect(minutes.value).toBe('1');
      expect(hours.value).toBe('');

      await timeInput.dispatchEvent(new KeyboardEvent('keydown', { key: '4' }));
      expect(seconds.value).toBe('34');
      expect(minutes.value).toBe('12');
      expect(hours.value).toBe('');

      await timeInput.dispatchEvent(new KeyboardEvent('keydown', { key: '5' }));
      expect(seconds.value).toBe('45');
      expect(minutes.value).toBe('23');
      expect(hours.value).toBe('1');

      await timeInput.dispatchEvent(new KeyboardEvent('keydown', { key: '6' }));
      expect(seconds.value).toBe('56');
      expect(minutes.value).toBe('34');
      expect(hours.value).toBe('12');

      await timeInput.dispatchEvent(new KeyboardEvent('keydown', { key: '0' }));
      expect(seconds.value).toBe('60');
      expect(minutes.value).toBe('45');
      expect(hours.value).toBe('23');
    });


    describe('uses am/pm format', () => {
      const propsData = {
        ...defaultProps,
        showSeconds: true,
        amPm: true,
      };

      it('will convert 24 hours date to am/pm if hours > 12 hours', async () => {
        const wrapper = mount(TDatepickerTimeSelector, {
          propsData: {
            ...propsData,
            activeDate: new Date(1987, 1, 18, 10, 0, 0),
          },
        });

        const {
          timeInput, hours, minutes, seconds, amPm,
        } = wrapper.vm.$refs;

        expect(amPm.currentValue).toBe('AM');

        await timeInput.dispatchEvent(new KeyboardEvent('keydown', { key: '1' }));
        await timeInput.dispatchEvent(new KeyboardEvent('keydown', { key: '3' }));
        await timeInput.dispatchEvent(new KeyboardEvent('keydown', { key: '0' }));
        await timeInput.dispatchEvent(new KeyboardEvent('keydown', { key: '5' }));
        await timeInput.dispatchEvent(new KeyboardEvent('keydown', { key: '1' }));
        await timeInput.dispatchEvent(new KeyboardEvent('keydown', { key: '2' }));

        expect(minutes.value).toBe('05');
        expect(hours.value).toBe('13');
        expect(seconds.value).toBe('12');

        await timeInput.dispatchEvent(new FocusEvent('blur'));

        expect(minutes.value).toBe('05');
        expect(hours.value).toBe('01');
        expect(seconds.value).toBe('12');
        expect(amPm.currentValue).toBe('PM');
      });

      it('will keep 12 hours if hours < 12 hours', async () => {
        const wrapper = mount(TDatepickerTimeSelector, {
          propsData: {
            ...propsData,
            activeDate: new Date(1987, 1, 18, 10, 0, 0),
          },
        });

        const {
          timeInput, hours, minutes, seconds, amPm,
        } = wrapper.vm.$refs;

        expect(amPm.currentValue).toBe('AM');

        await timeInput.dispatchEvent(new KeyboardEvent('keydown', { key: '1' }));
        await timeInput.dispatchEvent(new KeyboardEvent('keydown', { key: '1' }));
        await timeInput.dispatchEvent(new KeyboardEvent('keydown', { key: '0' }));
        await timeInput.dispatchEvent(new KeyboardEvent('keydown', { key: '5' }));
        await timeInput.dispatchEvent(new KeyboardEvent('keydown', { key: '1' }));
        await timeInput.dispatchEvent(new KeyboardEvent('keydown', { key: '2' }));

        expect(minutes.value).toBe('05');
        expect(hours.value).toBe('11');
        expect(seconds.value).toBe('12');

        await timeInput.dispatchEvent(new FocusEvent('blur'));

        expect(minutes.value).toBe('05');
        expect(hours.value).toBe('11');
        expect(seconds.value).toBe('12');
        expect(amPm.currentValue).toBe('AM');
      });
    });

    describe('uses 24 hours format', () => {
      const propsData = {
        ...defaultProps,
        showSeconds: true,
        amPm: false,
      };

      it('will keep 24 hours format for hours > 12', async () => {
        const wrapper = mount(TDatepickerTimeSelector, {
          propsData: {
            ...propsData,
            activeDate: new Date(1987, 1, 18, 10, 0, 0),
          },
        });
        const {
          timeInput, hours, minutes, seconds,
        } = wrapper.vm.$refs;

        await timeInput.dispatchEvent(new KeyboardEvent('keydown', { key: '1' }));
        await timeInput.dispatchEvent(new KeyboardEvent('keydown', { key: '3' }));
        await timeInput.dispatchEvent(new KeyboardEvent('keydown', { key: '0' }));
        await timeInput.dispatchEvent(new KeyboardEvent('keydown', { key: '5' }));
        await timeInput.dispatchEvent(new KeyboardEvent('keydown', { key: '0' }));
        await timeInput.dispatchEvent(new KeyboardEvent('keydown', { key: '8' }));
        expect(minutes.value).toBe('05');
        expect(hours.value).toBe('13');
        expect(seconds.value).toBe('08');

        await timeInput.dispatchEvent(new FocusEvent('blur'));

        expect(minutes.value).toBe('05');
        expect(hours.value).toBe('13');
        expect(seconds.value).toBe('08');
      });

      it('will keep 24 hours format for hours < 12 hours', async () => {
        const wrapper = mount(TDatepickerTimeSelector, {
          propsData: {
            ...propsData,
            activeDate: new Date(1987, 1, 18, 10, 0, 0),
          },
        });

        const {
          timeInput, hours, minutes, seconds,
        } = wrapper.vm.$refs;

        await timeInput.dispatchEvent(new KeyboardEvent('keydown', { key: '1' }));
        await timeInput.dispatchEvent(new KeyboardEvent('keydown', { key: '1' }));
        await timeInput.dispatchEvent(new KeyboardEvent('keydown', { key: '0' }));
        await timeInput.dispatchEvent(new KeyboardEvent('keydown', { key: '5' }));
        await timeInput.dispatchEvent(new KeyboardEvent('keydown', { key: '0' }));
        await timeInput.dispatchEvent(new KeyboardEvent('keydown', { key: '8' }));

        expect(minutes.value).toBe('05');
        expect(hours.value).toBe('11');
        expect(seconds.value).toBe('08');

        await timeInput.dispatchEvent(new FocusEvent('blur'));

        expect(minutes.value).toBe('05');
        expect(hours.value).toBe('11');
        expect(seconds.value).toBe('08');
      });
    });
  });
});
