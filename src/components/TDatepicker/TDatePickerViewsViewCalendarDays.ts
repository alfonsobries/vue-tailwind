import Vue, { CreateElement, VNode } from 'vue';

import TDatePickerViewsViewCalendarDaysDay from './TDatePickerViewsViewCalendarDaysDay';

const TDatePickerViewsViewCalendarDays = Vue.extend({
  name: 'TDatePickerViewsViewCalendarDays',

  props: {
    value: {
      type: Date,
      default: null,
    },
    activeDate: {
      type: Date,
      required: true,
    },
    weekStart: {
      type: Number,
      required: true,
    },
    locale: {
      type: String,
      required: true,
    },
    getElementCssClass: {
      type: Function,
      required: true,
    },
    dateFormatter: {
      type: Function,
      required: true,
    },
    showDaysForOtherMonth: {
      type: Boolean,
      required: true,
    },
  },

  data() {
    return {
      localActiveDate: new Date(this.activeDate.valueOf()),
    };
  },

  computed: {
    firstDayOfMonth(): Date {
      return new Date(this.localActiveDate.getFullYear(), this.localActiveDate.getMonth(), 1);
    },
    lastDayOfMonth(): Date {
      return new Date(this.localActiveDate.getFullYear(), this.localActiveDate.getMonth() + 1, 0);
    },
    firstDayOfPrevMonth(): Date {
      return new Date(this.localActiveDate.getFullYear(), this.localActiveDate.getMonth() - 1, 1);
    },
    lastDayOfPrevMonth(): Date {
      return new Date(this.localActiveDate.getFullYear(), this.localActiveDate.getMonth(), 0);
    },
    firstDayOfNextMonth(): Date {
      return new Date(this.localActiveDate.getFullYear(), this.localActiveDate.getMonth() + 1, 1);
    },
    monthDays(): Date[] {
      return Array
        .from({ length: this.lastDayOfMonth.getDate() }, (_x, i) => i + 1)
        .map((day) => this.getDay(this.localActiveDate, day));
    },
    prevMonthDays(): Date[] {
      const prevMonthTotalDays = this.firstDayOfMonth.getDay() - this.weekStart;
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
        class: 'grid gap-1 grid-cols-7 ',
      },
      this.days.map((day: Date) => createElement(
        TDatePickerViewsViewCalendarDaysDay,
        {
          props: {
            day,
            locale: this.locale,
            value: this.value,
            activeDate: this.localActiveDate,
            getElementCssClass: this.getElementCssClass,
            dateFormatter: this.dateFormatter,
            showDaysForOtherMonth: this.showDaysForOtherMonth,
          },
          on: {
            click: () => this.$emit('input', day),
          },
        },
      )),
    );
  },
});

export default TDatePickerViewsViewCalendarDays;
