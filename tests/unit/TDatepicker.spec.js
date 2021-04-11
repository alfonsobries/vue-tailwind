import { mount, shallowMount } from '@vue/test-utils';
import TDatepicker from '../../src/components/TDatepicker';
import TDatepickerViewsViewCalendarDays from '../../src/components/TDatepicker/TDatepickerViewsViewCalendarDays';
import TDatepickerViewsViewCalendarDaysDay from '../../src/components/TDatepicker/TDatepickerViewsViewCalendarDaysDay';
import TDatepickerNavigator from '../../src/components/TDatepicker/TDatepickerNavigator';
import {
  isSameDay, isSameMonth, parseDate, addMonths,
} from '../../src/utils/dates';

const getCalendarView = (wrapper) => wrapper.vm.$refs.views.$refs.view;
const getCalendarNavigator = (wrapper) => getCalendarView(wrapper).$refs.navigator;
const getCalendarViewCalendar = (wrapper) => getCalendarView(wrapper).$refs.calendar;
const getCalendarViewMonths = (wrapper) => getCalendarView(wrapper).$refs.months;
const getCalendarViewYears = (wrapper) => getCalendarView(wrapper).$refs.years;
const getCalendarViewDays = (wrapper) => getCalendarViewCalendar(wrapper).$refs.days;
const getCalendarViewDaysDay = (wrapper, day) => {
  const dayToSearch = typeof day === 'string' ? parseDate(day, 'Y-m-d') : day;

  return getCalendarViewDays(wrapper).$children.find((vm) => isSameDay(vm.day, dayToSearch));
};
const getCalendarViewMonthsMonth = (wrapper, day) => {
  const dayToSearch = typeof day === 'string' ? parseDate(day, 'Y-m-d') : day;
  return getCalendarViewMonths(wrapper).$children.find((vm) => isSameMonth(vm.month, dayToSearch));
};

describe('TDatepicker', () => {
  it('renders the date picker text and hidden input', () => {
    const wrapper = mount(TDatepicker);
    expect(wrapper.get('input[type=text]')).toBeTruthy();
    expect(wrapper.get('input[type=hidden]')).toBeTruthy();
  });

  it('The initial active date is the current date', () => {
    const wrapper = shallowMount(TDatepicker);
    expect(isSameDay(wrapper.vm.activeDate, new Date())).toBe(true);
  });

  it('The initial active date is the date used as param', () => {
    const wrapper = shallowMount(TDatepicker, {
      propsData: {
        initialDate: new Date(1987, 1, 18),
      },
    });

    expect(isSameDay(wrapper.vm.activeDate, new Date(1987, 1, 18))).toBe(true);
  });

  it('The initial active date is the date used as param from string', () => {
    const wrapper = shallowMount(TDatepicker, {
      propsData: {
        initialDate: '1987-02-18',
      },
    });

    expect(isSameDay(wrapper.vm.activeDate, new Date(1987, 1, 18))).toBe(true);
  });

  it('accepts a date as string in the default format', () => {
    const date = '1987-02-18';
    const expectedDate = new Date(1987, 1, 18);

    const wrapper = shallowMount(TDatepicker, {
      propsData: {
        value: date,
      },
    });

    expect(wrapper.vm.localValue).toEqual(expectedDate);
    expect(wrapper.vm.formatedDate).toEqual(date);
  });

  it('accepts a date as date object', () => {
    const date = new Date(1987, 1, 18);
    const expectedDate = new Date(1987, 1, 18);
    const formatedDate = '1987-02-18';

    const wrapper = shallowMount(TDatepicker, {
      propsData: {
        value: date,
      },
    });

    expect(wrapper.vm.localValue).toEqual(expectedDate);
    expect(wrapper.vm.formatedDate).toEqual(formatedDate);
  });

  it('accepts a date with custom format', () => {
    const date = '02/18/1987';
    const expectedDate = new Date(1987, 1, 18);

    const wrapper = shallowMount(TDatepicker, {
      propsData: {
        value: date,
        dateFormat: 'm/d/Y',
      },
    });

    expect(wrapper.vm.localValue).toEqual(expectedDate);
    expect(wrapper.vm.formatedDate).toEqual(date);
  });

  it('fill the inputs with the user date and formatted date as expected', () => {
    const date = '02/18/1987';
    const userFormatedDate = 'Wed, 18 of February 1987';
    const expectedDate = new Date(1987, 1, 18);

    const wrapper = mount(TDatepicker, {
      propsData: {
        value: date,
        dateFormat: 'm/d/Y',
        userFormat: 'D, d of F Y',
      },
    });

    expect(wrapper.vm.localValue).toEqual(expectedDate);
    expect(wrapper.vm.formatedDate).toBe(date);
    expect(wrapper.vm.userFormatedDate).toBe(userFormatedDate);

    expect(wrapper.vm.$el.querySelector('input[type=text]').value).toBe(userFormatedDate);
    expect(wrapper.vm.$el.querySelector('input[type=hidden]').value).toBe(date);
  });

  it('opens the calendar picker when input is focus', () => {
    const wrapper = mount(TDatepicker);
    expect(wrapper.vm.$refs.dropdown.localShow).toBe(false);
    wrapper.vm.focus();
    expect(wrapper.vm.$refs.dropdown.localShow).toBe(true);
  });

  it('opens/close the calendar picker when input is focus/blur alt test', async () => {
    const wrapper = mount(TDatepicker);

    const input = wrapper.vm.$el.querySelector('input[type=text]');
    expect(wrapper.vm.$refs.dropdown.localShow).toBe(false);

    input.dispatchEvent(new Event('focus'));
    expect(wrapper.vm.$refs.dropdown.localShow).toBe(true);
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.shown).toBe(true);

    input.dispatchEvent(new Event('blur'));
    expect(wrapper.vm.$refs.dropdown.localShow).toBe(false);
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.shown).toBe(false);
  });

  it('shows the datepicker with the show method', () => {
    const wrapper = mount(TDatepicker);
    wrapper.vm.doShow();

    expect(wrapper.vm.$refs.dropdown.localShow).toBe(true);
  });

  it('shows the datepicker if according to the show prop', () => {
    const wrapper = mount(TDatepicker, {
      propsData: {
        show: true,
      },
    });

    expect(wrapper.vm.shown).toBe(true);
    expect(wrapper.vm.$refs.dropdown.localShow).toBe(true);
  });

  it('emits an input event with the input value', async () => {
    const value = '1987-02-18';
    const wrapper = shallowMount(TDatepicker, {
      propsData: { value },
    });

    const inputValue = '2019-12-04';

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
    const wrapper = shallowMount(TDatepicker);

    const inputValue = '1987-02-18';

    wrapper.setProps({
      value: inputValue,
    });

    await wrapper.vm.$nextTick();

    // The change event should be emitted when the input is blurred
    const input = wrapper.vm.$el;
    input.dispatchEvent(new Event('blur'));

    expect(wrapper.emitted('change')).toBeTruthy();

    // assert event count
    expect(wrapper.emitted('change').length).toBe(1);

    // assert event payload
    expect(wrapper.emitted('change')[0]).toEqual([inputValue]);
  });

  it('emits a blur event when the input is blurred', () => {
    const inputValue = '1987-02-18';
    const wrapper = mount(TDatepicker, {
      propsData: { value: inputValue },
    });

    const input = wrapper.vm.$el.querySelector('input[type=text]');

    // The change event should be emitted when the input is blurred
    input.dispatchEvent(new Event('blur'));

    expect(wrapper.emitted('blur')).toBeTruthy();

    // assert event count
    expect(wrapper.emitted('blur').length).toBe(1);
  });

  it('emits a focus event when the input is focused', () => {
    const inputValue = '1987-02-18';
    const wrapper = mount(TDatepicker, {
      propsData: { value: inputValue },
    });

    const input = wrapper.vm.$el.querySelector('input[type=text]');

    // The change event should be emitted when the input is focusred
    input.dispatchEvent(new Event('focus'));

    expect(wrapper.emitted('focus')).toBeTruthy();

    // assert event count
    expect(wrapper.emitted('focus').length).toBe(1);
  });

  it('disables the input', async () => {
    const wrapper = mount(TDatepicker);
    const input = wrapper.vm.$el.querySelector('input[type=text]');
    expect(input.disabled).toBe(false);

    wrapper.setProps({ disabled: true });
    await wrapper.vm.$nextTick();
    expect(input.disabled).toBe(true);
  });

  it('it renders of days of the month', async () => {
    const inputValue = '1987-02-18';
    const wrapper = mount(TDatepicker, {
      propsData: {
        value: inputValue,
        show: true,
      },
    });
    const { days } = getCalendarViewDays(wrapper);
    expect(days.length).toBe(28);
    expect(days[0]).toEqual(new Date(1987, 1, 1));
    expect(days[27]).toEqual(new Date(1987, 1, 28));
  });

  it('it renders of days of others months', async () => {
    const inputValue = '2019-10-16';
    const wrapper = mount(TDatepicker, {
      propsData: {
        value: inputValue,
        show: true,
      },
    });
    const { days } = getCalendarViewDays(wrapper);
    expect(days.length).toBe(35);
    // 2019-09-29
    expect(days[0]).toEqual(new Date(2019, 8, 29));
    // 2019-11-02
    expect(days[34]).toEqual(new Date(2019, 10, 2));
  });

  it('select a date when the user press the day', async () => {
    const inputValue = '2019-10-16';
    const dateToSearch = '2019-10-30';

    const wrapper = mount(TDatepicker, {
      propsData: {
        value: inputValue,
        show: true,
      },
    });

    const day = getCalendarViewDaysDay(wrapper, dateToSearch);
    day.$el.click();

    await wrapper.vm.$nextTick();

    expect(wrapper.emitted('input')).toBeTruthy();

    // assert event count
    expect(wrapper.emitted('input').length).toBe(1);

    // assert event payload
    expect(wrapper.emitted('input')[0]).toEqual([dateToSearch]);

    expect(wrapper.vm.localValue).toEqual(new Date(2019, 9, 30));
    expect(wrapper.vm.formatedDate).toEqual(dateToSearch);
  });

  it('selects multiple dates when the value is an array and press the day', async () => {
    const inputValue = ['2019-10-16'];
    const dateToSearch = '2019-10-30';
    const expectedFormattedDate = ['2019-10-16', '2019-10-30'];

    const wrapper = mount(TDatepicker, {
      propsData: {
        value: inputValue,
        show: true,
      },
    });

    const day = getCalendarViewDaysDay(wrapper, dateToSearch);
    day.$el.click();

    await wrapper.vm.$nextTick();

    expect(wrapper.emitted('input')).toBeTruthy();

    // assert event count
    expect(wrapper.emitted('input').length).toBe(1);

    // assert event payload
    expect(wrapper.emitted('input')[0]).toEqual([[inputValue[0], dateToSearch]]);

    expect(wrapper.vm.localValue[0]).toEqual(new Date(2019, 9, 16));
    expect(wrapper.vm.localValue[1]).toEqual(new Date(2019, 9, 30));
    expect(wrapper.vm.formatedDate).toEqual(expectedFormattedDate);

    day.$el.click();
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.localValue[0]).toEqual(new Date(2019, 9, 16));
    expect(wrapper.vm.localValue[1]).toBeUndefined();
    expect(wrapper.vm.formatedDate).toEqual([expectedFormattedDate[0]]);
  });

  it('format array values separated by the conjunction', () => {
    const inputValue = ['2019-10-16', '2019-10-30'];
    const conjunction = ':';

    const wrapper = mount(TDatepicker, {
      propsData: {
        userFormat: 'Ymd',
        conjunction,
        value: inputValue,
      },
    });

    expect(wrapper.vm.localValue.length).toBe(2);
    expect(wrapper.vm.localValue[0]).toEqual(new Date(2019, 9, 16));
    expect(wrapper.vm.localValue[1]).toEqual(new Date(2019, 9, 30));

    expect(wrapper.vm.$el.querySelector('input[type=hidden]').value).toBe(inputValue.join(conjunction));
    expect(wrapper.vm.$el.querySelector('input[type=text]').value).toBe('20191016:20191030');
  });

  it('creates multiple hidden inputs if multiple flat is set', () => {
    const inputValue = ['2019-10-16', '2019-10-30'];

    const wrapper = mount(TDatepicker, {
      propsData: {
        userFormat: 'Ymd',
        multiple: true,
        value: inputValue,
      },
    });

    expect(wrapper.vm.localValue.length).toBe(2);
    expect(wrapper.vm.localValue[0]).toEqual(new Date(2019, 9, 16));
    expect(wrapper.vm.localValue[1]).toEqual(new Date(2019, 9, 30));

    expect(wrapper.vm.$el.querySelectorAll('input[type=hidden]').length).toBe(2);
    expect(wrapper.vm.$el.querySelectorAll('input[type=hidden]')[0].value).toBe(inputValue[0]);
    expect(wrapper.vm.$el.querySelectorAll('input[type=hidden]')[1].value).toBe(inputValue[1]);
  });

  it('shows the month view when the setting is set', async () => {
    const wrapper = mount(TDatepicker, {
      propsData: {
        initialView: 'month',
        show: true,
      },
    });

    const calendarView = getCalendarViewCalendar(wrapper);
    expect(calendarView).toBeFalsy();

    const monthsView = getCalendarViewMonths(wrapper);
    expect(monthsView).toBeTruthy();
  });

  it('shows the years view when the setting is set', async () => {
    const wrapper = mount(TDatepicker, {
      propsData: {
        initialView: 'year',
        show: true,
      },
    });

    const calendarView = getCalendarViewCalendar(wrapper);
    expect(calendarView).toBeFalsy();

    const yearsView = getCalendarViewYears(wrapper);
    expect(yearsView).toBeTruthy();
  });

  it('changes to prev month when press prev button', async () => {
    const inputValue = new Date(2019, 9, 16);
    const expectedActiveDate = new Date(2019, 8, 16);

    const wrapper = mount(TDatepicker, {
      propsData: {
        value: inputValue,
        show: true,
      },
    });

    const prevButton = getCalendarNavigator(wrapper).$refs.prev;
    prevButton.click();

    await wrapper.vm.$nextTick();

    expect(wrapper.emitted('input')).toBeFalsy();

    expect(wrapper.vm.activeDate).toEqual(expectedActiveDate);
  });

  it('changes to next month when press next button', async () => {
    const inputValue = new Date(2019, 9, 16);
    const expectedActiveDate = new Date(2019, 10, 16);

    const wrapper = mount(TDatepicker, {
      propsData: {
        value: inputValue,
        show: true,
      },
    });

    const nextButton = getCalendarNavigator(wrapper).$refs.next;
    nextButton.click();

    await wrapper.vm.$nextTick();

    expect(wrapper.emitted('input')).toBeFalsy();

    expect(wrapper.vm.activeDate).toEqual(expectedActiveDate);
  });

  it('selects the last day of the next month if doesnt have equivalent last', async () => {
    // Mar 31
    const inputValue = new Date(1987, 2, 31);
    // Feb 28
    const expectedActiveDate = new Date(1987, 1, 28);

    const wrapper = mount(TDatepicker, {
      propsData: {
        value: inputValue,
        show: true,
      },
    });

    const prevButton = getCalendarNavigator(wrapper).$refs.prev;
    prevButton.click();

    await wrapper.vm.$nextTick();

    expect(wrapper.emitted('input')).toBeFalsy();

    expect(wrapper.vm.activeDate).toEqual(expectedActiveDate);
  });

  it('selects the last day of the prev month if doesnt have equivalent last', async () => {
    // Jan 31
    const inputValue = new Date(1987, 0, 31);
    // Feb 28
    const expectedActiveDate = new Date(1987, 1, 28);

    const wrapper = mount(TDatepicker, {
      propsData: {
        value: inputValue,
        show: true,
      },
    });

    const nextButton = getCalendarNavigator(wrapper).$refs.next;
    nextButton.click();

    await wrapper.vm.$nextTick();

    expect(wrapper.emitted('input')).toBeFalsy();

    expect(wrapper.vm.activeDate).toEqual(expectedActiveDate);
  });

  it('selects the last day of the prev year->month if doesnt have equivalent last', async () => {
    // Feb 29
    const inputValue = new Date(2020, 1, 29);
    // Feb 28
    const expectedActiveDate = new Date(2020 - 1, 1, 28);

    const wrapper = mount(TDatepicker, {
      propsData: {
        initialView: 'month',
        value: inputValue,
        show: true,
      },
    });

    const prevButton = getCalendarNavigator(wrapper).$refs.prev;
    prevButton.click();

    await wrapper.vm.$nextTick();

    expect(wrapper.emitted('input')).toBeFalsy();

    expect(wrapper.vm.activeDate).toEqual(expectedActiveDate);
  });

  it('selects the last day of the next year->month if doesnt have equivalent last', async () => {
    // Feb 29
    const inputValue = new Date(2020, 1, 29);
    // Feb 28
    const expectedActiveDate = new Date(2020 + 1, 1, 28);

    const wrapper = mount(TDatepicker, {
      propsData: {
        initialView: 'month',
        value: inputValue,
        show: true,
      },
    });

    const nextButton = getCalendarNavigator(wrapper).$refs.next;
    nextButton.click();

    await wrapper.vm.$nextTick();

    expect(wrapper.emitted('input')).toBeFalsy();

    expect(wrapper.vm.activeDate).toEqual(expectedActiveDate);
  });

  it('when select a month it changes to the date view', async () => {
    // Feb 18
    const inputValue = new Date(1098, 1, 18);

    const monthToLook = new Date(1098, 5, 18);

    const wrapper = mount(TDatepicker, {
      propsData: {
        initialView: 'month',
        value: inputValue,
        show: true,
      },
    });

    const month = getCalendarViewMonthsMonth(wrapper, monthToLook);
    month.$el.click();

    await wrapper.vm.$nextTick();

    expect(wrapper.emitted('input')).toBeFalsy();

    expect(wrapper.vm.activeDate).toEqual(monthToLook);
    expect(wrapper.vm.currentView).toBe('day');
  });


  it('select the last day for the active date when array values', async () => {
    const dates = [
      '2020-02-18',
      '2020-02-21',
    ];

    const wrapper = mount(TDatepicker, {
      propsData: {
        value: dates,
      },
    });

    wrapper.setProps({
      value: dates.concat(['2020-03-12']),
    });

    await wrapper.vm.$nextTick();

    expect(wrapper.vm.activeDate).toEqual(new Date(2020, 2, 12));
  });
});

describe('TDatepickerViewsViewCalendarDays', () => {
  const datePicker = shallowMount(TDatepicker);
  const currentDate = new Date(2020, 10, 9);

  const props = {
    value: currentDate,
    activeDate: currentDate,
    activeMonth: currentDate,
    weekStart: 0,
    getElementCssClass: datePicker.vm.getElementCssClass,
    parse: datePicker.vm.parse,
    format: datePicker.vm.format,
    userFormat: datePicker.vm.userFormat,
    formatNative: datePicker.vm.formatNative,
    dateFormat: datePicker.vm.dateFormat,
    showDaysForOtherMonth: false,
    showActiveDate: true,
    range: false,
    slots: datePicker.vm.$scopedSlots,
    timepicker: false,
  };


  it('calculates the prev month days when week start is greater that the current day', () => {
    const wrapper = shallowMount(TDatepickerViewsViewCalendarDays, {
      propsData: {
        ...props,
        weekStart: 1,
      },
    });

    // will be the last day on the calendar
    expect(wrapper.vm.prevMonthDays.length).toBe(6);

    // will be the first day on the calendar
    wrapper.setProps({
      weekStart: 0,
    });

    expect(wrapper.vm.prevMonthDays.length).toBe(0);
  });
});

describe('TDatepickerViewsViewCalendarDaysDay', () => {
  const datePicker = shallowMount(TDatepicker);
  const day = new Date(1987, 1, 18);
  const currentDate = new Date(1987, 1, 19);

  const dayProps = {
    day,
    locale: 'en',
    value: currentDate,
    activeDate: currentDate,
    activeMonth: currentDate,
    getElementCssClass: datePicker.vm.getElementCssClass,
    parse: datePicker.vm.parse,
    format: datePicker.vm.format,
    userFormat: datePicker.vm.userFormat,
    formatNative: datePicker.vm.formatNative,
    dateFormat: datePicker.vm.dateFormat,
    showDaysForOtherMonth: false,
    showActiveDate: true,
    range: false,
    slots: datePicker.vm.$scopedSlots,
  };

  it('usually not disables a date ', () => {
    const wrapper = shallowMount(TDatepickerViewsViewCalendarDaysDay, {
      propsData: dayProps,
    });

    expect(wrapper.vm.isDisabled).toBe(false);
  });

  it('disables a date by date object', () => {
    const wrapper = shallowMount(TDatepickerViewsViewCalendarDaysDay, {
      propsData: {
        ...dayProps,
        ...{
          disabledDates: day,
        },
      },
    });
    expect(wrapper.vm.isDisabled).toBe(true);
  });

  it('disables a date by string object', () => {
    const wrapper = shallowMount(TDatepickerViewsViewCalendarDaysDay, {
      propsData: {
        ...dayProps,
        ...{
          disabledDates: '1987-02-18',
        },
      },
    });


    expect(wrapper.vm.isDisabled).toBe(true);
  });

  it('disables a date by a function', () => {
    const disabledFunc = (date) => isSameDay(date, day);

    const wrapper = shallowMount(TDatepickerViewsViewCalendarDaysDay, {
      propsData: {
        ...dayProps,
        ...{
          disabledDates: disabledFunc,
        },
      },
    });

    expect(wrapper.vm.isDisabled).toBe(true);
  });

  it('disables a date by an array', async () => {
    const wrapper = shallowMount(TDatepickerViewsViewCalendarDaysDay, {
      propsData: {
        ...dayProps,
        ...{
          disabledDates: ['1987-02-18'],
        },
      },
    });

    expect(wrapper.vm.isDisabled).toBe(true);

    await wrapper.setProps({
      disabledDates: [],
    });

    expect(wrapper.vm.isDisabled).toBe(false);

    await wrapper.setProps({
      disabledDates: [day],
    });

    expect(wrapper.vm.isDisabled).toBe(true);

    await wrapper.setProps({
      disabledDates: [],
    });

    expect(wrapper.vm.isDisabled).toBe(false);

    const disabledFunc = (date) => isSameDay(date, day);

    await wrapper.setProps({
      disabledDates: [disabledFunc],
    });

    expect(wrapper.vm.isDisabled).toBe(true);
  });

  it('disables a date > maxDate', () => {
    const wrapper = shallowMount(TDatepickerViewsViewCalendarDaysDay, {
      propsData: {
        ...dayProps,
        ...{
          maxDate: new Date(1987, 1, 17),
        },
      },
    });

    expect(wrapper.vm.isDisabled).toBe(true);
  });

  it('not disables a date < maxDate', () => {
    const wrapper = shallowMount(TDatepickerViewsViewCalendarDaysDay, {
      propsData: {
        ...dayProps,
        ...{
          maxDate: new Date(1987, 1, 20),
        },
      },
    });

    expect(wrapper.vm.isDisabled).toBe(false);
  });

  it('disables a date < minDate', () => {
    const wrapper = shallowMount(TDatepickerViewsViewCalendarDaysDay, {
      propsData: {
        ...dayProps,
        ...{
          minDate: new Date(1987, 1, 19),
        },
      },
    });

    expect(wrapper.vm.isDisabled).toBe(true);
  });

  it('not disables a date > minDate', () => {
    const wrapper = shallowMount(TDatepickerViewsViewCalendarDaysDay, {
      propsData: {
        ...dayProps,
        ...{
          minDate: new Date(1987, 1, 17),
        },
      },
    });

    expect(wrapper.vm.isDisabled).toBe(false);
  });

  it('not disables a between min and max date', () => {
    const wrapper = shallowMount(TDatepickerViewsViewCalendarDaysDay, {
      propsData: {
        ...dayProps,
        ...{
          minDate: new Date(1987, 1, 17),
          maxDate: new Date(1987, 1, 19),
        },
      },
    });

    expect(wrapper.vm.isDisabled).toBe(false);
  });

  it('disables a date between min and max date', () => {
    const wrapper = shallowMount(TDatepickerViewsViewCalendarDaysDay, {
      propsData: {
        ...dayProps,
        ...{
          minDate: new Date(1987, 1, 19),
          maxDate: new Date(1987, 1, 20),
        },
      },
    });

    expect(wrapper.vm.isDisabled).toBe(true);
  });
});

describe('TDatepickerNavigator', () => {
  const datePicker = shallowMount(TDatepicker);
  const currentDate = new Date(1987, 1, 19);

  const navProps = {
    dateFormat: datePicker.vm.dateFormat,
    parse: datePicker.vm.parse,
    formatNative: datePicker.vm.formatNative,
    getElementCssClass: datePicker.vm.getElementCssClass,
    locale: datePicker.vm.currentLocale,
    value: currentDate,
    showSelector: true,
    currentView: 'day',
    yearsPerView: 12,
  };

  it('usually not disables next/prev buttons', () => {
    const wrapper = shallowMount(TDatepickerNavigator, {
      propsData: navProps,
    });

    expect(wrapper.vm.prevButtonIsDisabled).toBe(false);
    expect(wrapper.vm.nextButtonIsDisabled).toBe(false);
  });

  it('disables the next button if next date > maxDate', () => {
    const wrapper = shallowMount(TDatepickerNavigator, {
      propsData: {
        ...navProps,
        ...{
          maxDate: new Date(1987, 1, 24),
        },
      },
    });

    expect(wrapper.vm.prevButtonIsDisabled).toBe(false);
    expect(wrapper.vm.nextButtonIsDisabled).toBe(true);
  });

  it('disables the prev button if prev date < minDate', () => {
    const wrapper = shallowMount(TDatepickerNavigator, {
      propsData: {
        ...navProps,
        ...{
          minDate: new Date(1987, 1, 2),
        },
      },
    });

    expect(wrapper.vm.prevButtonIsDisabled).toBe(true);
    expect(wrapper.vm.nextButtonIsDisabled).toBe(false);
  });

  it('not disables the next button if next date < maxDate', () => {
    const wrapper = shallowMount(TDatepickerNavigator, {
      propsData: {
        ...navProps,
        ...{
          maxDate: new Date(1987, 2, 19),
        },
      },
    });

    expect(wrapper.vm.prevButtonIsDisabled).toBe(false);
    expect(wrapper.vm.nextButtonIsDisabled).toBe(false);
  });

  it('not disables the next button if next date is disabled but has another date in the next month', () => {
    const maxDate = new Date(1987, 2, 4);
    const wrapper = shallowMount(TDatepickerNavigator, {
      propsData: {
        ...navProps,
        ...{
          maxDate,
        },
      },
    });

    expect(wrapper.vm.prevButtonIsDisabled).toBe(false);
    expect(wrapper.vm.nextButtonIsDisabled).toBe(false);
    expect(wrapper.vm.getNextDate()).toEqual(maxDate);
  });
});
