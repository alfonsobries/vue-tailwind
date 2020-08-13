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
    monthsPerView: {
      type: Number,
      required: true,
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
            props: {
              value: this.value,
              activeDate: this.localActiveDate,
              weekStart: this.weekStart,
              locale: this.locale,
              getElementCssClass: this.getElementCssClass,
              dateFormatter: this.dateFormatter,
              showDaysForOtherMonth: this.showDaysForOtherMonth,
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
