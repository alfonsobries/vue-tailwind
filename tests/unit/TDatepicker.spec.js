import { mount, shallowMount } from '@vue/test-utils';
import TDatepicker from '@/components/TDatepicker';
import { isSameDay, isSameMonth, createDateParser } from '@/utils/dates';

const dateParser = createDateParser({});

const getCalendarView = (wrapper) => wrapper.vm.$refs.views.$refs.view;
const getCalendarNavigator = (wrapper) => getCalendarView(wrapper).$refs.navigator;
const getCalendarViewCalendar = (wrapper) => getCalendarView(wrapper).$refs.calendar;
const getCalendarViewMonths = (wrapper) => getCalendarView(wrapper).$refs.months;
const getCalendarViewYears = (wrapper) => getCalendarView(wrapper).$refs.years;
const getCalendarViewDays = (wrapper) => getCalendarViewCalendar(wrapper).$refs.days;
const getCalendarViewDaysDay = (wrapper, day) => {
  const dayToSearch = typeof day === 'string' ? dateParser(day, 'Y-m-d') : day;

  return getCalendarViewDays(wrapper).$children.find((vm) => isSameDay(vm.day, dayToSearch));
};
const getCalendarViewMonthsMonth = (wrapper, day) => {
  const dayToSearch = typeof day === 'string' ? dateParser(day, 'Y-m-d') : day;
  return getCalendarViewMonths(wrapper).$children.find((vm) => isSameMonth(vm.month, dayToSearch));
};


describe('TDatepicker', () => {
  it('renders the date picker text and hidden input', () => {
    const wrapper = mount(TDatepicker);
    expect(wrapper.get('input[type=text]')).toBeTruthy();
    expect(wrapper.get('input[type=hidden]')).toBeTruthy();
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
});
