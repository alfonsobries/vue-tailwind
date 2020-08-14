import Vue, { CreateElement, VNode } from 'vue';

import TDatePickerViewsView from './TDatePickerViewsView';
import { CalendarView } from './TDatepickerNavigator';

const TDatePickerViews = Vue.extend({
  name: 'TDatePickerViews',

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
    dateFormatter: {
      type: Function,
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
        .map((i) => {
          const activeMonth = new Date(this.localActiveDate.valueOf());
          activeMonth.setMonth(activeMonth.getMonth() + i);
          return activeMonth;
        });
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
          props: {
            value: this.value,
            activeDate: activeMonth,
            weekStart: this.weekStart,
            locale: this.locale,
            getElementCssClass: this.getElementCssClass,
            dateFormatter: this.dateFormatter,
            monthsPerView: this.monthsPerView,
            monthIndex: index,
            currentView: index === 0 ? this.currentView : this.initialView,
            yearsPerView: this.yearsPerView,
            showActiveDate: this.showActiveDate,
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
          },
        },
      )),
    );
  },
});

export default TDatePickerViews;
