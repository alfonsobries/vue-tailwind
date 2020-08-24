import Vue, { CreateElement, VNode } from 'vue';

import TDatePickerViewsViewCalendarDays from './TDatePickerViewsViewCalendarDays';
import TDatePickerViewsViewCalendarHeaders from './TDatePickerViewsViewCalendarHeaders';

const TDatePickerViewsViewCalendar = Vue.extend({
  name: 'TDatePickerViewsViewCalendar',

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
    dateParser: {
      type: Function,
      required: true,
    },
    dateFormat: {
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
    maxDate: {
      type: [Date, String],
      default: undefined,
    },
    minDate: {
      type: [Date, String],
      default: undefined,
    },
  },

  data() {
    return {
      localActiveDate: new Date(this.activeDate.valueOf()),
    };
  },

  computed: {
    showDaysForOtherMonth() {
      return this.monthsPerView === 1;
    },
  },

  watch: {
    activeDate(activeDate: Date) {
      this.localActiveDate = new Date(activeDate.valueOf());
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
        class: '',
      },
      [
        createElement(
          TDatePickerViewsViewCalendarHeaders,
          {
            props: {
              dateFormatter: this.dateFormatter,
              weekStart: this.weekStart,
              locale: this.locale,
              getElementCssClass: this.getElementCssClass,
            },
          },
        ),
        createElement(
          TDatePickerViewsViewCalendarDays,
          {
            ref: 'days',
            props: {
              value: this.value,
              activeDate: this.localActiveDate,
              weekStart: this.weekStart,
              locale: this.locale,
              getElementCssClass: this.getElementCssClass,
              dateFormatter: this.dateFormatter,
              dateParser: this.dateParser,
              dateFormat: this.dateFormat,
              showDaysForOtherMonth: this.showDaysForOtherMonth,
              showActiveDate: this.showActiveDate,
              disabledDates: this.disabledDates,
              minDate: this.minDate,
              maxDate: this.maxDate,
            },
            on: {
              input: this.inputHandler,
            },
          },
        ),
      ],
    );
  },
});

export default TDatePickerViewsViewCalendar;
