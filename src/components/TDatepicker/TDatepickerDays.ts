import Vue, { CreateElement, VNode } from 'vue';

import TDatepickerDaysDay from './TDatepickerDaysDay';

const TDatepickerDays = Vue.extend({
  name: 'TDatepickerDays',

  props: {
    value: {
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
  },

  computed: {
    currentDate(): Date {
      return new Date();
    },
    firstDayOfMonth(): Date {
      return new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), 1);
    },
    lastDayOfMonth(): Date {
      return new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 0);
    },
    firstDayOfPrevMonth(): Date {
      return new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() - 1, 1);
    },
    lastDayOfPrevMonth(): Date {
      return new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), 0);
    },
    firstDayOfNextMonth(): Date {
      return new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 1);
    },
    monthDays(): Date[] {
      return Array
        .from({ length: this.lastDayOfMonth.getDate() }, (_x, i) => i + 1)
        .map((day) => this.getDay(this.currentDate, day));
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
        TDatepickerDaysDay,
        {
          props: {
            day,
            locale: this.locale,
            value: this.value,
            getElementCssClass: this.getElementCssClass,
          },
        },
      )),
    );
  },
});

export default TDatepickerDays;
