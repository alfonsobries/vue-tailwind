import Vue, { CreateElement, VNode } from 'vue';

import { addMonths } from '@/utils/dates';
import TDatePickerViewsView from './TDatePickerViewsView';
import { CalendarView } from './TDatepickerNavigator';

const TDatePickerViews = Vue.extend({
  name: 'TDatePickerViews',

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
    locale: {
      type: String,
      required: true,
    },
    getElementCssClass: {
      type: Function,
      required: true,
    },
    dateParser: {
      type: Function,
      required: true,
    },
    dateFormat: {
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
    disabledDates: {
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
        class: 'flex',
      },
      this.activeMonths.map((activeMonth: Date, index: number) => createElement(
        TDatePickerViewsView,
        {
          ref: 'view',
          props: {
            value: this.value,
            activeMonth,
            activeDate: this.localActiveDate,
            weekStart: this.weekStart,
            locale: this.locale,
            getElementCssClass: this.getElementCssClass,
            dateParser: this.dateParser,
            dateFormat: this.dateFormat,
            monthsPerView: this.monthsPerView,
            monthIndex: index,
            currentView: index === 0 ? this.currentView : this.initialView,
            yearsPerView: this.yearsPerView,
            showActiveDate: this.showActiveDate,
            disabledDates: this.disabledDates,
            minDate: this.minDate,
            maxDate: this.maxDate,
            range: this.range,
          },
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

export default TDatePickerViews;
