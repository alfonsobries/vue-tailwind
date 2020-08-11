import Vue, { CreateElement, VNode } from 'vue';

import { isArguments } from 'lodash';
import TDatePickerViewsViewMonthsMonth from './TDatePickerViewsViewMonthsMonth';

const TDatePickerViewsViewMonths = Vue.extend({
  name: 'TDatePickerViewsViewMonths',

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
    dateFormatter: {
      type: Function,
      required: true,
    },
  },

  data() {
    return {
      localActiveDate: new Date(this.value.valueOf()),
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
    value(value: Date) {
      this.localActiveDate = new Date(value.valueOf());
    },
  },

  methods: {
    getMonth(monthNumber: number) {
      return new Date(this.localActiveDate.getFullYear(), monthNumber, 1);
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
            value: this.localActiveDate,
            getElementCssClass: this.getElementCssClass,
            dateFormatter: this.dateFormatter,
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
