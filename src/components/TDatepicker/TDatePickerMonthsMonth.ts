import Vue, { CreateElement, VNode } from 'vue';

import TDatePickerMonthsMonthDays from './TDatePickerMonthsMonthDays';
import TDatePickerMonthHeaders from './TDatePickerMonthsMonthHeaders';

const TDatePickerMonthsMonth = Vue.extend({
  name: 'TDatePickerMonthsMonth',

  props: {
    value: {
      type: Date,
      required: true,
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
  },

  data() {
    return {
      localActiveDate: new Date(this.activeDate.valueOf()),
    };
  },

  watch: {
    activeDate(activeDate: Date) {
      this.localActiveDate = new Date(activeDate.valueOf());
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
          TDatePickerMonthHeaders,
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
          TDatePickerMonthsMonthDays,
          {
            props: {
              value: this.value,
              activeDate: this.localActiveDate,
              weekStart: this.weekStart,
              locale: this.locale,
              getElementCssClass: this.getElementCssClass,
              dateFormatter: this.dateFormatter,
            },
            on: {
              input: (day: Date) => {
                this.$emit('input', day);
              },
            },
          },
        ),
      ],
    );
  },
});

export default TDatePickerMonthsMonth;
