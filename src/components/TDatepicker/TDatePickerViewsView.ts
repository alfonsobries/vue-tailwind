import Vue, { CreateElement, VNode } from 'vue';

import TDatepickerViewsViewCalendar from './TDatepickerViewsViewCalendar';
import TDatepickerNavigator, { CalendarView } from './TDatepickerNavigator';
import TDatepickerViewsViewMonths from './TDatepickerViewsViewMonths';
import TDatepickerViewsViewYears from './TDatepickerViewsViewYears';

const TDatepickerViewsView = Vue.extend({
  name: 'TDatepickerViewsView',

  props: {
    value: {
      type: [Date, Array],
      default: null,
    },
    activeMonth: {
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
    lang: {
      type: String,
      required: true,
    },
    getElementCssClass: {
      type: Function,
      required: true,
    },
    formatNative: {
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
    userFormat: {
      type: String,
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
    monthIndex: {
      type: Number,
      required: true,
    },
    currentView: {
      type: String,
      required: true,
    },
    yearsPerView: {
      type: Number,
      required: true,
    },
    showActiveDate: {
      type: Boolean,
      required: true,
    },
    showDaysForOtherMonth: {
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
    locale: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      localActiveDate: new Date(this.activeDate.valueOf()),
      localActiveMonth: new Date(this.activeMonth.valueOf()),
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
      this.resetView();

      this.$emit('input', date);
    },

    viewInputActiveDateHandler(date: Date) {
      this.resetView();

      this.inputActiveDateHandler(date);
    },

    inputActiveDateHandler(date: Date) {
      this.$emit('inputActiveDate', date);
    },

    resetView() {
      this.$emit('resetView');
    },
  },

  render(createElement: CreateElement): VNode {
    const subElements: VNode[] = [];

    subElements.push(createElement(
      TDatepickerNavigator,
      {
        ref: 'navigator',
        props: {
          value: this.localActiveMonth,
          getElementCssClass: this.getElementCssClass,
          showSelector: this.isFirstMonth,
          currentView: this.currentView,
          parse: this.parse,
          formatNative: this.formatNative,
          dateFormat: this.dateFormat,
          yearsPerView: this.yearsPerView,
          minDate: this.minDate,
          maxDate: this.maxDate,
          locale: this.locale,
        },
        on: {
          input: this.inputActiveDateHandler,
          updateView: (newView: CalendarView) => {
            this.$emit('updateView', newView);
          },
        },
      },
    ));

    if (this.currentView === CalendarView.Day) {
      subElements.push(
        createElement(
          TDatepickerViewsViewCalendar,
          {
            ref: 'calendar',
            props: {
              value: this.value,
              activeMonth: this.localActiveMonth,
              activeDate: this.localActiveDate,
              weekStart: this.weekStart,
              getElementCssClass: this.getElementCssClass,
              showDaysForOtherMonth: this.showDaysForOtherMonth,
              parse: this.parse,
              format: this.format,
              formatNative: this.formatNative,
              dateFormat: this.dateFormat,
              userFormat: this.userFormat,
              monthsPerView: this.monthsPerView,
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
      );
    } else if (this.currentView === CalendarView.Month) {
      subElements.push(
        createElement(
          TDatepickerViewsViewMonths,
          {
            ref: 'months',
            props: {
              value: this.value,
              activeDate: this.localActiveDate,
              getElementCssClass: this.getElementCssClass,
              showActiveDate: this.showActiveDate,
              formatNative: this.formatNative,
            },
            scopedSlots: this.$scopedSlots,
            on: {
              input: this.viewInputActiveDateHandler,
            },
          },
        ),
      );
    } else if (this.currentView === CalendarView.Year) {
      subElements.push(
        createElement(
          TDatepickerViewsViewYears,
          {
            ref: 'years',
            props: {
              value: this.value,
              activeDate: this.localActiveDate,
              getElementCssClass: this.getElementCssClass,
              yearsPerView: this.yearsPerView,
              showActiveDate: this.showActiveDate,
              formatNative: this.formatNative,
            },
            scopedSlots: this.$scopedSlots,
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
        class: this.getElementCssClass('view'),
      },
      subElements,
    );
  },
});

export default TDatepickerViewsView;
