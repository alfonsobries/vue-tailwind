import Vue, { CreateElement, VNode } from 'vue';
import { lastDayOfMonth } from '../../utils/dates';
import TDatepickerViewsViewCalendarDaysDay from './TDatepickerViewsViewCalendarDaysDay';

const TDatepickerViewsViewCalendarDays = Vue.extend({
  name: 'TDatepickerViewsViewCalendarDays',

  props: {
    value: {
      type: [Date, Array],
      default: null,
    },
    activeDate: {
      type: Date,
      required: true,
    },
    activeMonth: {
      type: Date,
      required: true,
    },
    weekStart: {
      type: Number,
      required: true,
    },
    getElementCssClass: {
      type: Function,
      required: true,
    },
    parse: {
      type: Function,
      required: true,
    },
    format: {
      type: Function,
      required: true,
    },
    formatNative: {
      type: Function,
      required: true,
    },
    userFormat: {
      type: String,
      required: true,
    },
    dateFormat: {
      type: String,
      required: true,
    },
    showDaysForOtherMonth: {
      type: Boolean,
      required: true,
    },
    showActiveDate: {
      type: Boolean,
      required: true,
    },
    disabledDates: {
      type: [Date, Array, Function, String],
      default: undefined,
    },
    highlightDates: {
      type: [Date, Array, Function, String],
      default: undefined,
    },
    maxDate: {
      type: [Date, String],
      default: undefined,
    },
    minDate: {
      type: [Date, String],
      default: undefined,
    },
    range: {
      type: Boolean,
      required: true,
    },
  },

  data() {
    return {
      localActiveDate: new Date(this.activeDate.valueOf()),
      localActiveMonth: new Date(this.activeMonth.valueOf()),
    };
  },

  computed: {
    firstDayOfMonth(): Date {
      return new Date(this.localActiveMonth.getFullYear(), this.localActiveMonth.getMonth(), 1);
    },
    lastDayOfMonth(): Date {
      return lastDayOfMonth(this.localActiveMonth);
    },
    firstDayOfPrevMonth(): Date {
      return new Date(this.localActiveMonth.getFullYear(), this.localActiveMonth.getMonth() - 1, 1);
    },
    lastDayOfPrevMonth(): Date {
      return new Date(this.localActiveMonth.getFullYear(), this.localActiveMonth.getMonth(), 0);
    },
    firstDayOfNextMonth(): Date {
      return new Date(this.localActiveMonth.getFullYear(), this.localActiveMonth.getMonth() + 1, 1);
    },
    monthDays(): Date[] {
      return Array
        .from({ length: this.lastDayOfMonth.getDate() }, (_x, i) => i + 1)
        .map((day) => this.getDay(this.localActiveMonth, day));
    },
    prevMonthDays(): Date[] {
      let prevMonthTotalDays = this.firstDayOfMonth.getDay() - this.weekStart;
      if (prevMonthTotalDays < 0) {
        prevMonthTotalDays = 7 + prevMonthTotalDays;
      }
      return Array.from({ length: prevMonthTotalDays }, (_x, i) => this.lastDayOfPrevMonth.getDate() - i)
        .reverse()
        .map((day) => this.getDay(this.firstDayOfPrevMonth, day));
    },
    nextMonthDays(): Date[] {
      const nextMonthTotalDays = 7 - (this.monthDays.concat(this.prevMonthDays).length % 7);
      if (nextMonthTotalDays === 7) {
        return [];
      }
      return Array.from({ length: nextMonthTotalDays }, (_x, i) => i + 1)
        .map((day) => this.getDay(this.firstDayOfNextMonth, day));
    },
    days(): Date[] {
      const { prevMonthDays } = this;
      const { monthDays } = this;
      const { nextMonthDays } = this;
      return prevMonthDays.concat(monthDays, nextMonthDays);
    },
  },

  watch: {
    activeDate(activeDate: Date) {
      this.localActiveDate = new Date(activeDate.valueOf());
    },
    activeMonth(activeMonth: Date) {
      this.localActiveMonth = new Date(activeMonth.valueOf());
    },
  },

  methods: {
    getDay(date: Date, day: number): Date {
      return new Date(date.getFullYear(), date.getMonth(), day);
    },
  },

  render(createElement: CreateElement): VNode {
    return createElement(
      'div',
      {
        class: this.getElementCssClass('calendarDaysWrapper'),
      },
      this.days.map((day: Date) => createElement(
        'span',
        {
          class: this.getElementCssClass('calendarDaysDayWrapper'),
        }, [
          createElement(
            TDatepickerViewsViewCalendarDaysDay,
            {
              props: {
                day,
                value: this.value,
                activeDate: this.localActiveDate,
                activeMonth: this.localActiveMonth,
                getElementCssClass: this.getElementCssClass,
                parse: this.parse,
                format: this.format,
                formatNative: this.formatNative,
                dateFormat: this.dateFormat,
                userFormat: this.userFormat,
                showDaysForOtherMonth: this.showDaysForOtherMonth,
                showActiveDate: this.showActiveDate,
                disabledDates: this.disabledDates,
                highlightDates: this.highlightDates,
                minDate: this.minDate,
                maxDate: this.maxDate,
                range: this.range,
              },
              scopedSlots: this.$scopedSlots,
              on: {
                click: () => this.$emit('input', day),
              },
            },
          )],
      )),
    );
  },
});

export default TDatepickerViewsViewCalendarDays;
