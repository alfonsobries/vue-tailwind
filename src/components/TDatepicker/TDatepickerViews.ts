import Vue, { CreateElement, VNode } from 'vue';

import { addMonths } from '../../utils/dates';
import TDatepickerViewsView from './TDatepickerViewsView';
import { CalendarView } from './TDatepickerNavigator';

const TDatepickerViews = Vue.extend({
  name: 'TDatepickerViews',

  props: {
    value: {
      type: [Date, Array],
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
    monthsPerView: {
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
    parse: {
      type: Function,
      required: true,
    },
    format: {
      type: Function,
      required: true,
    },
    formatNative: {
      type: Function,
      required: true,
    },
    dateFormat: {
      type: String,
      required: true,
    },
    userFormat: {
      type: String,
      required: true,
    },
    initialView: {
      type: String,
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
    };
  },

  computed: {
    activeMonths(): Date[] {
      return Array
        .from({ length: this.monthsPerView }, (_x, i) => i)
        .map((i) => addMonths(this.localActiveDate, i));
    },
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
        class: this.getElementCssClass('viewGroup'),
      },
      this.activeMonths.map((activeMonth: Date, index: number) => createElement(
        TDatepickerViewsView,
        {
          ref: 'view',
          props: {
            value: this.value,
            activeMonth,
            activeDate: this.localActiveDate,
            weekStart: this.weekStart,
            lang: this.lang,
            getElementCssClass: this.getElementCssClass,
            parse: this.parse,
            format: this.format,
            dateFormat: this.dateFormat,
            userFormat: this.userFormat,
            formatNative: this.formatNative,
            monthsPerView: this.monthsPerView,
            monthIndex: index,
            currentView: index === 0 ? this.currentView : this.initialView,
            yearsPerView: this.yearsPerView,
            showActiveDate: this.showActiveDate,
            disabledDates: this.disabledDates,
            highlightDates: this.highlightDates,
            minDate: this.minDate,
            maxDate: this.maxDate,
            range: this.range,
            showDaysForOtherMonth: this.showDaysForOtherMonth,
            locale: this.locale,
          },
          scopedSlots: this.$scopedSlots,
          on: {
            input: (date: Date) => {
              this.$emit('input', date);
            },
            inputActiveDate: (date: Date) => {
              this.$emit('inputActiveDate', date);
            },
            updateView: (newView: CalendarView) => {
              this.$emit('updateView', newView);
            },
            resetView: () => {
              this.$emit('resetView');
            },
          },
        },
      )),
    );
  },
});

export default TDatepickerViews;
