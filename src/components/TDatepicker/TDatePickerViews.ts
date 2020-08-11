import Vue, { CreateElement, VNode } from 'vue';

import TDatePickerViewsView from './TDatePickerViewsView';
import { CalendarView } from './TDatepickerNavigator';

const TDatePickerViews = Vue.extend({
  name: 'TDatePickerViews',

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
      default: CalendarView.Day,
      validator(value: CalendarView) {
        return [CalendarView.Day, CalendarView.Month, CalendarView.Year].includes(value);
      },
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
            // activeDate: activeMonth,
            activeDate: this.activeDate,
            weekStart: this.weekStart,
            locale: this.locale,
            getElementCssClass: this.getElementCssClass,
            dateFormatter: this.dateFormatter,
            monthsPerView: this.monthsPerView,
            monthIndex: index,
            initialView: this.initialView,
          },
          on: {
            input: (day: Date) => {
              this.$emit('input', day);
            },
          },
        },
      )),
    );
  },
});

export default TDatePickerViews;
