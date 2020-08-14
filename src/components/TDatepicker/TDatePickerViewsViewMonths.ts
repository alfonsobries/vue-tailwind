import Vue, { CreateElement, VNode } from 'vue';

import TDatePickerViewsViewMonthsMonth from './TDatePickerViewsViewMonthsMonth';

const TDatePickerViewsViewMonths = Vue.extend({
  name: 'TDatePickerViewsViewMonths',

  props: {
    value: {
      type: Date,
      required: true,
    },
    activeDate: {
      type: Date,
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
    showActiveDate: {
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
    months(): Date[] {
      return Array
        .from({ length: 12 }, (_x, i) => i)
        .map((monthNumber) => this.getMonth(monthNumber));
    },
  },

  watch: {
    activeDate(activeDate: Date) {
      this.localActiveDate = new Date(activeDate.valueOf());
    },
  },

  methods: {
    getMonth(monthNumber: number) {
      let newDate = new Date(this.localActiveDate.valueOf());
      newDate.setMonth(monthNumber);

      // Means the current day has less days so the extra month is
      // in the following month
      if (newDate.getDate() !== this.localActiveDate.getDate()) {
        // Assign the last day of previous month
        newDate = new Date(newDate.getFullYear(), newDate.getMonth(), 0);
      }

      return newDate;
    },
  },

  render(createElement: CreateElement): VNode {
    return createElement(
      'div',
      {
        class: 'grid gap-1 grid-cols-4 ',
      },
      this.months.map((month: Date) => createElement(
        TDatePickerViewsViewMonthsMonth,
        {
          props: {
            month,
            locale: this.locale,
            value: this.value,
            activeDate: this.localActiveDate,
            getElementCssClass: this.getElementCssClass,
            dateFormatter: this.dateFormatter,
            showActiveDate: this.showActiveDate,
          },
          on: {
            click: () => this.$emit('input', month),
          },
        },
      )),
    );
  },
});

export default TDatePickerViewsViewMonths;
