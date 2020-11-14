import Vue, { CreateElement, VNode } from 'vue';

import TDatepickerViewsViewMonthsMonth from './TDatepickerViewsViewMonthsMonth';

const TDatepickerViewsViewMonths = Vue.extend({
  name: 'TDatepickerViewsViewMonths',

  props: {
    value: {
      type: [Date, Array],
      default: null,
    },
    activeDate: {
      type: Date,
      required: true,
    },
    getElementCssClass: {
      type: Function,
      required: true,
    },
    showActiveDate: {
      type: Boolean,
      required: true,
    },
    formatNative: {
      type: Function,
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
        class: this.getElementCssClass('monthWrapper'),
      },
      this.months.map((month: Date) => createElement(
        TDatepickerViewsViewMonthsMonth,
        {
          props: {
            month,
            value: this.value,
            activeDate: this.localActiveDate,
            getElementCssClass: this.getElementCssClass,
            showActiveDate: this.showActiveDate,
            formatNative: this.formatNative,
          },
          scopedSlots: this.$scopedSlots,
          on: {
            click: () => this.$emit('input', month),
          },
        },
      )),
    );
  },
});

export default TDatepickerViewsViewMonths;
