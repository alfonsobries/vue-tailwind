import Vue, { CreateElement, VNode } from 'vue';

import TDatepickerViewsViewCalendarDays from './TDatepickerViewsViewCalendarDays';
import TDatepickerViewsViewCalendarHeaders from './TDatepickerViewsViewCalendarHeaders';

const TDatepickerViewsViewCalendar = Vue.extend({
  name: 'TDatepickerViewsViewCalendar',

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
    dateFormat: {
      type: String,
      required: true,
    },
    userFormat: {
      type: String,
      required: true,
    },
    monthsPerView: {
      type: Number,
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
    showDaysForOtherMonth: {
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

  watch: {
    activeDate(activeDate: Date) {
      this.localActiveDate = new Date(activeDate.valueOf());
    },
    activeMonth(activeMonth: Date) {
      this.localActiveMonth = new Date(activeMonth.valueOf());
    },
  },

  methods: {
    inputHandler(date: Date) {
      this.$emit('input', date);
    },
  },

  render(createElement: CreateElement): VNode {
    return createElement(
      'div',
      {
        class: this.getElementCssClass('calendarWrapper'),
      },
      [
        createElement(
          TDatepickerViewsViewCalendarHeaders,
          {
            props: {
              weekStart: this.weekStart,
              getElementCssClass: this.getElementCssClass,
              formatNative: this.formatNative,
            },
          },
        ),
        createElement(
          TDatepickerViewsViewCalendarDays,
          {
            ref: 'days',
            props: {
              value: this.value,
              activeDate: this.localActiveDate,
              activeMonth: this.localActiveMonth,
              weekStart: this.weekStart,
              getElementCssClass: this.getElementCssClass,
              parse: this.parse,
              format: this.format,
              formatNative: this.formatNative,
              userFormat: this.userFormat,
              dateFormat: this.dateFormat,
              showDaysForOtherMonth: this.monthsPerView > 1 ? false : this.showDaysForOtherMonth,
              showActiveDate: this.showActiveDate,
              disabledDates: this.disabledDates,
              highlightDates: this.highlightDates,
              minDate: this.minDate,
              maxDate: this.maxDate,
              range: this.range,
            },
            scopedSlots: this.$scopedSlots,
            on: {
              input: this.inputHandler,
            },
          },
        ),
      ],
    );
  },
});

export default TDatepickerViewsViewCalendar;
