import Vue, { CreateElement, VNode } from 'vue';

import TDatePickerViewsViewCalendar from './TDatePickerViewsViewCalendar';
import TDatepickerNavigator, { CalendarView } from './TDatepickerNavigator';
import TDatePickerViewsViewMonths from './TDatePickerViewsViewMonths';
import TDatePickerViewsViewYears from './TDatePickerViewsViewYears';

const TDatePickerViewsView = Vue.extend({
  name: 'TDatePickerViewsView',

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
    yearsPerView: {
      type: Number,
      required: true,
    },
    focus: {
      type: Function,
      required: true,
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

      this.resetView();
    },

    viewInputActiveDateHandler(date: Date) {
      this.inputActiveDateHandler(date);

      this.resetView();
    },

    inputActiveDateHandler(date: Date) {
      this.$emit('inputActiveDate', date);
    },

    resetView() {
      this.focus();
      if (this.currentView === CalendarView.Month) {
        this.currentView = CalendarView.Day;
      } else if (this.currentView === CalendarView.Year) {
        this.currentView = CalendarView.Month;
      } else {
        this.currentView = CalendarView.Day;
      }
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
          yearsPerView: this.yearsPerView,
          focus: this.focus,
        },
        on: {
          input: this.inputActiveDateHandler,
          setView: (newView: CalendarView) => {
            this.currentView = newView;
          },
        },
      },
    ));

    if (this.currentView === CalendarView.Day) {
      subElements.push(
        createElement(
          TDatePickerViewsViewCalendar,
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
      subElements.push(
        createElement(
          TDatePickerViewsViewMonths,
          {
            props: {
              value: this.value,
              activeDate: this.localActiveDate,
              locale: this.locale,
              getElementCssClass: this.getElementCssClass,
              dateFormatter: this.dateFormatter,
            },
            on: {
              input: this.viewInputActiveDateHandler,
            },
          },
        ),
      );
    } else if (this.currentView === CalendarView.Year) {
      subElements.push(
        createElement(
          TDatePickerViewsViewYears,
          {
            props: {
              value: this.value,
              activeDate: this.localActiveDate,
              locale: this.locale,
              getElementCssClass: this.getElementCssClass,
              dateFormatter: this.dateFormatter,
              yearsPerView: this.yearsPerView,
            },
            on: {
              input: this.viewInputActiveDateHandler,
            },
          },
        ),
      );
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
