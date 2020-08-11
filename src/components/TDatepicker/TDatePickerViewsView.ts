import Vue, { CreateElement, VNode } from 'vue';

import TDatePickerMonthsMonthDays from './TDatePickerMonthsMonthDays';
import TDatePickerViewsViewMonth from './TDatePickerViewsViewMonth';
import TDatePickerMonthHeaders from './TDatePickerMonthsMonthHeaders';
import TDatepickerNavigator, { CalendarView } from './TDatepickerNavigator';

const TDatePickerViewsView = Vue.extend({
  name: 'TDatePickerViewsView',

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
    initialView: {
      type: String,
      default: CalendarView.Day,
      validator(value: CalendarView) {
        return [CalendarView.Day, CalendarView.Month, CalendarView.Year].includes(value);
      },
    },
  },

  data() {
    return {
      localActiveDate: new Date(this.activeDate.valueOf()),
      currentView: this.initialView as CalendarView,
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
    const subElements: VNode[] = [];

    subElements.push(createElement(
      TDatepickerNavigator,
      {
        props: {
          value: this.localActiveDate,
          dateFormatter: this.dateFormatter,
          getElementCssClass: this.getElementCssClass,
          showSelector: this.isFirstMonth,
          currentView: this.currentView,
        },
        on: {
          input: this.inputHandler,
          setView: (newView: CalendarView) => {
            this.currentView = newView;
          },
        },
      },
    ));

    if (this.currentView === CalendarView.Day) {
      subElements.push(
        createElement(
          TDatePickerViewsViewMonth,
          {
            props: {
              value: this.value,
              activeDate: this.localActiveDate,
              weekStart: this.weekStart,
              locale: this.locale,
              getElementCssClass: this.getElementCssClass,
              dateFormatter: this.dateFormatter,
              monthsPerView: this.monthsPerView,
            },
            on: {
              input: this.inputHandler,
            },
          },
        ),
      );
    } else if (this.currentView === CalendarView.Month) {
      // subElements.push(
      //   createElement(
      //     TDatePickerViewsViewMonth,
      //     {
      //       props: {
      //         value: this.value,
      //         activeDate: this.localActiveDate,
      //         weekStart: this.weekStart,
      //         locale: this.locale,
      //         getElementCssClass: this.getElementCssClass,
      //         dateFormatter: this.dateFormatter,
      //         monthsPerView: this.monthsPerView,
      //       },
      //       on: {
      //         input: this.inputHandler,
      //       },
      //     },
      //   ),
      // );
    }

    return createElement(
      'div',
      {
        class: 'w-64 p-2',
      },
      subElements,
    );
  },
});

export default TDatePickerViewsView;
