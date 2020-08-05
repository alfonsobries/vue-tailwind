import Component from '@/base/Component';
import { CreateElement, VNode } from 'vue';
import TDatepickerDaysDay from './TDatepickerDaysDay';

const TDatepickerDays = Component.extend({
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
            value: this.value,
          },
        },
      )),
    );
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
    days(): Date[] {
      const prevMonthDays = this.getPrevMonthDays();
      const monthDays = this.getMonthDays();
      const nextMonthDays = this.getNextMonthDays();
      return prevMonthDays.concat(monthDays, nextMonthDays);
    },
  },

  methods: {
    getMonthDays(): Date[] {
      return Array
        .from({ length: this.lastDayOfMonth.getDate() }, (_x, i) => i + 1)
        .map((day) => this.getDay(this.currentDate, day));
    },
    getNextMonthDays(): Date[] {
      const nextMonthTotalDays = 6 - this.weekStart - this.lastDayOfMonth.getDay();
      return Array.from({ length: nextMonthTotalDays }, (_x, i) => i + 1)
        .map((day) => this.getDay(this.firstDayOfNextMonth, day));
    },
    getPrevMonthDays(): Date[] {
      const prevMonthTotalDays = this.firstDayOfMonth.getDay() - this.weekStart;
      return Array.from({ length: prevMonthTotalDays }, (_x, i) => this.lastDayOfPrevMonth.getDate() - i)
        .reverse()
        .map((day) => this.getDay(this.firstDayOfPrevMonth, day));
    },
    getDay(date: Date, day: number): Date {
      return new Date(date.getFullYear(), date.getMonth(), day);
    },
  },
});

export default TDatepickerDays;
