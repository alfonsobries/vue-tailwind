import Vue, { CreateElement, VNode } from 'vue';

import TDatePickerMonthsMonthDays from './TDatePickerMonthsMonthDays';
import TDatePickerMonthHeaders from './TDatePickerMonthsMonthHeaders';
import TDatepickerNavigator from './TDatepickerNavigator';

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
    monthsPerView: {
      type: Number,
      required: true,
    },
    monthIndex: {
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
    isFirstMonth() {
      return this.monthIndex === 0;
    },
    isLastMonth() {
      return this.monthIndex === this.monthsPerView - 1;
    },
    showMonthName() {
      return this.monthsPerView > 1;
    },
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
    let subElements: VNode[] = [];

    subElements.push(createElement(
      TDatepickerNavigator,
      {
        props: {
          value: this.localActiveDate,
          dateFormatter: this.dateFormatter,
          getElementCssClass: this.getElementCssClass,
          showSelector: this.isFirstMonth,
        },
        on: {
          input: this.inputHandler,
        },
      },
    ));

    subElements = subElements.concat([
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
            showDaysForOtherMonth: this.showDaysForOtherMonth,
          },
          on: {
            input: this.inputHandler,
          },
        },
      ),
    ]);

    return createElement(
      'div',
      {
        class: 'w-64 p-2',
      },
      subElements,
    );
  },
});

export default TDatePickerMonthsMonth;
